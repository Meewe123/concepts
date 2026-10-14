import type { L10n } from '@/core/types'

/**
 * Тексты страницы студии `/` и `/uz`. Цены — ориентир, их подтверждает заказчик.
 * Реальных компаний здесь нет: только витрины с вымышленными брендами (Lead.showcase).
 * TODO: проверить носителем — узбекские строки.
 */
export const studio = {
  tag: { ru: 'Студия сайтов · Ташкент', uz: 'Saytlar studiyasi · Toshkent' },
  title: {
    ru: 'Сайты, онлайн-запись и Telegram-боты для бизнеса в Ташкенте',
    uz: 'Toshkentdagi biznes uchun saytlar, onlayn yozilish va Telegram-botlar',
  },
  lead: {
    ru: 'На русском и узбекском. Рабочий сайт — за семь дней: «yetti kun» по-узбекски и значит «семь дней».',
    uz: 'Rus va oʻzbek tillarida. Ishlaydigan sayt — yetti kunda: nomimiz ham shundan.',
  },
  ctaTg: { ru: 'Написать в Telegram', uz: 'Telegramga yozish' },
  ctaSee: { ru: 'Посмотреть концепты', uz: 'Konseptlarni koʻrish' },
  tgSoon: { ru: 'Telegram скоро появится', uz: 'Telegram tez orada paydo boʻladi' },

  week: {
    label: { ru: 'Неделя до запуска', uz: 'Ishga tushirishgacha bir hafta' },
    days: { ru: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'], uz: ['du', 'se', 'ch', 'pa', 'ju', 'sh', 'ya'] },
    steps: [
      { day: { ru: 'День 1', uz: '1-kun' }, text: { ru: 'Концепт: оформление и главная функция', uz: 'Konsept: dizayn va asosiy funksiya' } },
      { day: { ru: 'Дни 2–5', uz: '2–5-kunlar' }, text: { ru: 'Ваши цены, услуги и фото, тексты на двух языках', uz: 'Narxlar, xizmatlar va suratlaringiz, ikki tildagi matnlar' } },
      { day: { ru: 'День 6', uz: '6-kun' }, text: { ru: 'Заявки — в Telegram, проверка на телефонах', uz: 'Arizalar — Telegramga, telefonlarda tekshiruv' } },
      { day: { ru: 'День 7', uz: '7-kun' }, text: { ru: 'Сайт работает', uz: 'Sayt ishlayapti' } },
    ],
  },

  why: {
    title: { ru: 'Если вы здесь по ссылке из моего сообщения', uz: 'Agar bu yerga xabarimdagi havola orqali kelgan boʻlsangiz' },
    text: {
      ru: 'Я заранее делаю концепт сайта под конкретный бизнес — бесплатно и без обязательств. Это не шаблон: у каждого концепта своё оформление и своя главная функция — запись, бронь, подбор или расчёт цены. Цены и данные в концепте примерные — внизу каждой страницы так и написано.',
      uz: 'Men muayyan biznes uchun sayt konseptini oldindan tayyorlayman — bepul va hech qanday majburiyatsiz. Bu shablon emas: har bir konseptning oʻz dizayni va oʻz asosiy funksiyasi bor — yozilish, band qilish, tanlash yoki narxni hisoblash. Konseptdagi narx va maʼlumotlar taxminiy — har bir sahifaning pastida shunday yozilgan.',
    },
    facts: [
      { big: { ru: '0 сум', uz: '0 soʻm' }, small: { ru: 'концепт — бесплатно', uz: 'konsept — bepul' } },
      { big: { ru: '7 дней', uz: '7 kun' }, small: { ru: 'до рабочего сайта', uz: 'ishlaydigan saytgacha' } },
      { big: { ru: 'RU + UZ', uz: 'RU + UZ' }, small: { ru: 'два языка с переключателем', uz: 'ikki til, almashtirgich bilan' } },
    ],
  },

  showcases: {
    title: { ru: 'Три концепта для вымышленных брендов', uz: 'Toʻqima brendlar uchun uchta konsept' },
    lead: {
      ru: 'Названия придуманы, но всё работает: нажимайте, выбирайте, записывайтесь — заявка в концепте никуда не уходит. Лучше смотреть с телефона.',
      uz: 'Nomlar oʻylab topilgan, lekin hammasi ishlaydi: bosing, tanlang, yoziling — konseptdagi ariza hech qayerga ketmaydi. Telefondan koʻrgan maʼqul.',
    },
    badge: { ru: 'концепт', uz: 'konsept' },
    open: { ru: 'Открыть концепт', uz: 'Konseptni ochish' },
    items: [
      {
        slug: 'sariq-sabzi-q7wm',
        niche: { ru: 'Плов-центр', uz: 'Osh markazi' },
        text: { ru: 'Сколько плова осталось в казане — видно на сайте; топчан бронируется в два касания.', uz: 'Qozonda qancha osh qolgani saytda koʻrinadi; soʻri ikki bosishda band qilinadi.' },
      },
      {
        slug: 'ustara-m4hx',
        niche: { ru: 'Барбершоп', uz: 'Barbershop' },
        text: { ru: 'Мастер, услуга и свободное окно — запись за полминуты, без звонка.', uz: 'Usta, xizmat va boʻsh vaqt — qoʻngʻiroqsiz, yarim daqiqada yozilish.' },
      },
      {
        slug: 'chinni-r8tk',
        niche: { ru: 'Стоматология', uz: 'Stomatologiya' },
        text: { ru: 'Шкала оттенков, ориентир цены, число визитов и срок — ещё до консультации.', uz: 'Rang shkalasi, taxminiy narx, tashriflar soni va muddat — konsultatsiyadan oldin.' },
      },
    ],
  },

  how: {
    title: { ru: 'Как я работаю', uz: 'Qanday ishlayman' },
    steps: [
      {
        title: { ru: 'Концепт — бесплатно', uz: 'Konsept — bepul' },
        text: {
          ru: 'Смотрю, как к вам сейчас записываются и что спрашивают клиенты, и делаю концепт с главной функцией под ваш бизнес. Вы открываете его с телефона.',
          uz: 'Hozir sizga qanday yozilishlari va mijozlar nimani soʻrashini koʻraman va biznesingizga mos asosiy funksiyali konsept tayyorlayman. Siz uni telefondan ochasiz.',
        },
      },
      {
        title: { ru: 'Неделя до запуска', uz: 'Ishga tushirishgacha bir hafta' },
        text: {
          ru: 'Нравится — заменяю примерные данные вашими: цены, услуги, фото, тексты на русском и узбекском. Заявки с сайта приходят вам в Telegram.',
          uz: 'Yoqsa — taxminiy maʼlumotlarni sizniki bilan almashtiraman: narxlar, xizmatlar, suratlar, rus va oʻzbek tilidagi matnlar. Saytdan arizalar sizga Telegramga keladi.',
        },
      },
      {
        title: { ru: 'Запуск и правки', uz: 'Ishga tushirish va tahrirlar' },
        text: {
          ru: 'Подключаю домен и проверяю на разных телефонах. Дальше — правки цен и текстов по сообщению в Telegram.',
          uz: 'Domenni ulayman va turli telefonlarda tekshiraman. Keyin — narx va matnlarni Telegramdagi xabar boʻyicha tahrirlayman.',
        },
      },
    ],
  },

  prices: {
    title: { ru: 'Ориентиры цен', uz: 'Taxminiy narxlar' },
    items: [
      {
        name: { ru: 'Сайт с онлайн-записью, бронью или подбором', uz: 'Onlayn yozilish, band qilish yoki tanlash funksiyali sayt' },
        price: 3_500_000,
        per: null as L10n | null,
        note: { ru: 'Русский и узбекский, адаптив под телефон, заявки в Telegram', uz: 'Rus va oʻzbek tillari, telefonga moslashgan, arizalar Telegramga' },
      },
      {
        name: { ru: 'Telegram-бот для заявок и записи', uz: 'Arizalar va yozilish uchun Telegram-bot' },
        price: 2_500_000,
        per: null as L10n | null,
        note: { ru: 'Клиент записывается прямо в Telegram, администратор получает заявку', uz: 'Mijoz toʻgʻridan-toʻgʻri Telegramda yoziladi, administrator arizani oladi' },
      },
      {
        name: { ru: 'Поддержка', uz: 'Qoʻllab-quvvatlash' },
        price: 300_000,
        per: { ru: 'в месяц', uz: 'oyiga' } as L10n | null,
        note: { ru: 'Хостинг, правки цен и текстов, мелкие доработки', uz: 'Xosting, narx va matnlarni tahrirlash, mayda yaxshilashlar' },
      },
    ],
    from: { ru: 'от', uz: 'dan' },
    tag: { ru: 'ориентир', uz: 'taxminiy' },
    foot: {
      ru: 'Точную цену называю до начала работы — после того как вы посмотрите концепт.',
      uz: 'Aniq narxni ish boshlanishidan oldin aytaman — konseptni koʻrganingizdan keyin.',
    },
  },

  faq: {
    title: { ru: 'Частые вопросы', uz: 'Koʻp beriladigan savollar' },
    items: [
      {
        q: { ru: 'Сколько стоит концепт?', uz: 'Konsept qancha turadi?' },
        a: { ru: 'Нисколько. Концепт — способ показать идею до разговора о деньгах.', uz: 'Hech narsa. Konsept — pul haqida gaplashishdan oldin gʻoyani koʻrsatish usuli.' },
      },
      {
        q: { ru: 'Нет хороших фото — это проблема?', uz: 'Yaxshi suratlar yoʻq — bu muammomi?' },
        a: { ru: 'Нет. В концептах вместо фото — графика; ваши фото можно добавить позже.', uz: 'Yoʻq. Konseptlarda surat oʻrniga grafika; suratlaringizni keyinroq qoʻshish mumkin.' },
      },
      {
        q: { ru: 'Нужно что-то устанавливать?', uz: 'Biror narsa oʻrnatish kerakmi?' },
        a: { ru: 'Нет. Сайт открывается по ссылке, а заявки приходят в Telegram, который у вас уже есть.', uz: 'Yoʻq. Sayt havola orqali ochiladi, arizalar esa sizda bor Telegramga keladi.' },
      },
      {
        q: { ru: 'На каком языке будет сайт?', uz: 'Sayt qaysi tilda boʻladi?' },
        a: { ru: 'На русском и узбекском (латиница) — с переключателем языка.', uz: 'Rus va oʻzbek (lotin) tillarida — til almashtirgichi bilan.' },
      },
    ],
  },

  contact: {
    title: { ru: 'Напишите в Telegram', uz: 'Telegramga yozing' },
    text: {
      ru: 'Расскажите, чем занимаетесь, — сделаю концепт для вашего бизнеса. Отвечаю сам.',
      uz: 'Nima bilan shugʻullanishingizni aytib bering — biznesingiz uchun konsept tayyorlayman. Oʻzim javob beraman.',
    },
  },

  foot: {
    ru: 'Концепты на этой странице сделаны для вымышленных брендов: названия, цены, адреса и телефоны придуманы.',
    uz: 'Bu sahifadagi konseptlar toʻqima brendlar uchun qilingan: nomlar, narxlar, manzillar va telefonlar oʻylab topilgan.',
  },
}

export function studioMeta(locale: 'ru' | 'uz') {
  return locale === 'ru'
    ? { title: 'Yetti kun — сайты, онлайн-запись и Telegram-боты в Ташкенте', description: 'Сайты для бизнеса на русском и узбекском за семь дней. Концепт — бесплатно.' }
    : { title: 'Yetti kun — Toshkentda saytlar, onlayn yozilish va Telegram-botlar', description: 'Biznes uchun rus va oʻzbek tillarida sayt — yetti kunda. Konsept — bepul.' }
}
