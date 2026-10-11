/**
 * Карточки организаций в Яндекс Картах — ссылки от заказчика (октябрь 2026).
 * Лиды берут mapsUrl отсюда; когда лид появится в leads/, ссылка уже готова.
 */
const ORG = 'https://yandex.uz/maps/org/'

const orgs: Record<string, string> = {
  'osiyo-grand-sq4y': 'osiyo_grand/120468512829/',
  'billur-wgah': 'billur/163081899955/',
  'royal-rose-yz34': 'royal_rose/146726530783/',
  'bahor-2utu': 'bahor/40237624367/',
  'versal-kftc': 'versal_milliy_uyg_ur_taomlari/178096015422/',
  'doctor-animals-htt4': 'doctor_animals/53563848095/',
  'darel-fakf': 'darel/135040367321/',
  'zoocenter-nm5u': 'zootsentr/10373306834/',
  'vet-master-amh9': 'vet_master/85212019705/',
  'gordons-gc3t': 'mr_gordon_s_english_academy/132744384603/',
  'riks-yxk6': 'riks_training_center/106882667196/',
  'denta-fukb': 'stomatologiya_denta/5867957547/',
  'nasimova-ebck': 'stomatologiya_klinikasi/153698515279/',
  'chilanzar-dental-g52b': 'stomatologiya/42631368780/',
  'iroda-vxww': 'iroda_oilaviy_stomatologiya/235489300996/',
  'expert-beauty-f8cb': 'expert_beauty/88153477870/',
  'konfetti-7hgp': 'konfetti/148395193804/',
  'women-secret-ek2b': 'women_secret/75767442657/',
  'brookland-4857': 'brookland/116112604844/',
  'urus-premium-wkr6': 'urus_premium/111312041787/',
  'petrovic-xd9v': 'restoran_petrovic/77563822246/',
  'artha-c6ba': 'artha/206216702729/',
  'bukafit-kpqu': 'bukafit/128863792796/',
}

export function mapsUrlFor(slug: string): string {
  const path = orgs[slug]
  if (!path) throw new Error(`Нет ссылки на карточку Яндекс Карт для ${slug} — добавьте в leads/maps.ts`)
  return ORG + path
}
