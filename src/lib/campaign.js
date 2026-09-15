import { CHANNELS } from './channels'

export const createId = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`

const openings = {
  instagram: '오늘의 새로운 소식 ✨',
  facebook: '이웃 여러분께 반가운 소식을 전합니다 😊',
  google: '매장에서 새로운 소식을 안내드립니다.',
  naver: '네이버 플레이스에서 전하는 오늘의 소식입니다.',
  carrot: '이웃님들, 새로운 소식이에요 😊',
}

export function makeText(channel, source, business) {
  const info = [business.name, business.category, business.address].filter(Boolean).join(' · ')
  const tags = [business.name, business.category, '동네가게'].filter(Boolean)
    .map(value => `#${value.replace(/\s+/g, '')}`).join(' ')
  return [openings[channel], source.trim(), info, tags].filter(Boolean).join('\n\n')
}

export function createResults(channels, source, business) {
  return channels.map(channel => {
    const text = makeText(channel, source, business)
    return { id: createId(), channel, text, originalText: text, edited: false, posted: false, postedAt: null }
  })
}

export const channelLabel = key => CHANNELS[key]?.name || key
