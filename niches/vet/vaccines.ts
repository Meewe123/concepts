import { pluralRu } from '@/core/text'
import type { L10n, Locale, Pet } from '@/core/types'

/**
 * Ориентировочная схема первичной вакцинации — без названий препаратов.
 * Подпись на странице: «ориентир, схему назначает врач». TODO: показать ветврачу при продакшне.
 */
interface Dose {
  atWeeks: number
  title: L10n
  note?: L10n
}

const SCHEDULE: Record<Pet, Dose[]> = {
  dog: [
    {
      atWeeks: 8,
      title: { ru: 'Комплексная прививка, первая', uz: 'Kompleks emlash, birinchi' },
      note: { ru: 'чума, парвовироз, аденовироз, парагрипп', uz: 'oʻlat, parvovirus, adenovirus, paragripp' },
    },
    { atWeeks: 12, title: { ru: 'Комплексная, вторая + бешенство', uz: 'Kompleks, ikkinchi + quturish' } },
    { atWeeks: 16, title: { ru: 'Комплексная, третья — если назначит врач', uz: 'Kompleks, uchinchi — shifokor tayinlasa' } },
    { atWeeks: 52, title: { ru: 'Ревакцинация: комплексная + бешенство', uz: 'Qayta emlash: kompleks + quturish' } },
  ],
  cat: [
    {
      atWeeks: 8,
      title: { ru: 'Комплексная прививка, первая', uz: 'Kompleks emlash, birinchi' },
      note: { ru: 'панлейкопения, калицивироз, ринотрахеит', uz: 'panleykopeniya, kalitsivirus, rinotraxeit' },
    },
    { atWeeks: 12, title: { ru: 'Комплексная, вторая + бешенство', uz: 'Kompleks, ikkinchi + quturish' } },
    { atWeeks: 16, title: { ru: 'Комплексная, третья — если назначит врач', uz: 'Kompleks, uchinchi — shifokor tayinlasa' } },
    { atWeeks: 52, title: { ru: 'Ревакцинация: комплексная + бешенство', uz: 'Qayta emlash: kompleks + quturish' } },
  ],
}

export const MAX_AGE = 13

export interface PlanRow {
  state: 'past' | 'next' | 'later'
  when: string
  title: string
  note?: string
  /** Через сколько недель — островок подставит дату */
  inWeeks?: number
}

const weeksRu = (n: number) => `${n} ${pluralRu(n, ['неделю', 'недели', 'недель'])}`

export function ageLabel(months: number, locale: Locale): string {
  if (months >= MAX_AGE) return locale === 'ru' ? '1 год и старше' : '1 yosh va katta'
  return locale === 'ru' ? `${months} ${pluralRu(months, ['месяц', 'месяца', 'месяцев'])}` : `${months} oylik`
}

function inText(weeks: number, locale: Locale): string {
  if (weeks <= 1) return locale === 'ru' ? 'сейчас' : 'hozir'
  if (weeks > 8) {
    const months = Math.round(weeks / 4.345)
    return locale === 'ru' ? `через ${months} ${pluralRu(months, ['месяц', 'месяца', 'месяцев'])}` : `${months} oydan keyin`
  }
  return locale === 'ru' ? `через ${weeksRu(weeks)}` : `${weeks} haftadan keyin`
}

/** График от возраста: что уже должно было быть, что следующее, что потом. */
export function vaccinePlan(pet: Pet, months: number, locale: Locale): PlanRow[] {
  const t = (v: L10n) => v[locale]
  if (months >= MAX_AGE) {
    return [
      {
        state: 'next',
        when: locale === 'ru' ? 'раз в год' : 'yiliga bir marta',
        title: t({ ru: 'Ревакцинация: комплексная + бешенство', uz: 'Qayta emlash: kompleks + quturish' }),
        note: t({
          ru: 'если прошлую прививку делали больше года назад — пора',
          uz: 'oxirgi emlashdan bir yildan koʻp vaqt oʻtgan boʻlsa — vaqti keldi',
        }),
      },
      {
        state: 'later',
        when: locale === 'ru' ? 'за 10–14 дней' : '10–14 kun oldin',
        title: t({ ru: 'Обработка от глистов перед прививкой', uz: 'Emlashdan oldin gijjaga qarshi ishlov' }),
      },
    ]
  }
  const ageWeeks = Math.round(months * 4.345)
  const rows: PlanRow[] = []
  let nextFound = false
  let prev = 0
  for (const dose of SCHEDULE[pet]) {
    const diff = dose.atWeeks - ageWeeks
    if (diff < -1) {
      rows.push({
        state: 'past',
        when: locale === 'ru' ? `в ${dose.atWeeks} недель` : `${dose.atWeeks} haftaligida`,
        title: t(dose.title),
        note: t({ ru: 'по графику уже прошло — покажите ветпаспорт врачу', uz: 'jadval boʻyicha oʻtib ketgan — pasportni shifokorga koʻrsating' }),
      })
      continue
    }
    // перед первой прививкой — обработка от глистов за 10–14 дней, поэтому раньше чем через 2 недели не получится
    // между дозами — не меньше 3 недель
    const weeks = nextFound ? Math.max(diff, prev + 3) : Math.max(diff, 2)
    prev = weeks
    if (!nextFound) {
      rows.push({
        state: 'later',
        when: inText(Math.max(weeks - 2, 0), locale),
        title: t({ ru: 'Обработка от глистов', uz: 'Gijjaga qarshi ishlov' }),
        note: t({ ru: 'за 10–14 дней до прививки', uz: 'emlashdan 10–14 kun oldin' }),
        inWeeks: Math.max(weeks - 2, 0),
      })
    }
    rows.push({
      state: nextFound ? 'later' : 'next',
      when: inText(weeks, locale),
      title: t(dose.title),
      note: dose.note ? t(dose.note) : undefined,
      inWeeks: weeks,
    })
    nextFound = true
  }
  rows.push({
    state: 'later',
    when: locale === 'ru' ? 'дальше' : 'keyin',
    title: t({ ru: 'Раз в год — ревакцинация', uz: 'Yiliga bir marta — qayta emlash' }),
  })
  return rows
}
