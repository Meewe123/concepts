import type { Lead } from '@/core/types'
import bahor from './bahor-2utu'
import billur from './billur-wgah'
import brookland from './brookland-4857'
import chilanzar from './chilanzar-dental-g52b'
import doctorAnimals from './doctor-animals-htt4'
import expertBeauty from './expert-beauty-f8cb'
import darel from './darel-fakf'
import denta from './denta-fukb'
import gordons from './gordons-gc3t'
import iroda from './iroda-vxww'
import konfetti from './konfetti-7hgp'
import nasimov from './nasimova-ebck'
import riks from './riks-yxk6'
import royalRose from './royal-rose-yz34'
import versal from './versal-kftc'
import womenSecret from './women-secret-ek2b'
import vetMaster from './vet-master-amh9'
import zoocenter from './zoocenter-nm5u'
import osiyoGrand from './osiyo-grand-sq4y'

export const leads: Lead[] = [osiyoGrand, billur, doctorAnimals, gordons, darel, zoocenter, vetMaster, riks, royalRose, bahor, versal, denta, nasimov, chilanzar, iroda, expertBeauty, konfetti, womenSecret, brookland]

// Внутри ниши направления не повторяются: пять залов — пять разных миров.
const seen = new Map<string, string>()
for (const l of leads) {
  const key = `${l.niche}/${l.direction}`
  const other = seen.get(key)
  if (other) throw new Error(`Направление ${l.direction} уже занято в нише ${l.niche} лидом ${other}`)
  seen.set(key, l.slug)
}
if (new Set(leads.map((l) => l.slug)).size !== leads.length) throw new Error('Повторяющийся slug')

export function getLead(slug: string): Lead {
  const lead = leads.find((l) => l.slug === slug)
  if (!lead) throw new Error(`Нет лида ${slug}`)
  return lead
}
