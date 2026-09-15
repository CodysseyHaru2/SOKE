import { useEffect, useState } from 'react'
import Modal from './Modal'
import { CHANNELS } from '../lib/channels'
import { normalizeSocialUrl } from '../lib/social'

const fields = [
  ['name', '가게 이름', '카페 소크'],
  ['category', '업종', '카페·디저트'],
  ['address', '주소', '서울시 성동구'],
  ['phone', '전화번호', '02-000-0000'],
  ['hours', '영업시간', '매일 10:00–20:00'],
]

export default function BusinessDialog({ open, business, focusChannel, onClose, onSave }) {
  const [draft, setDraft] = useState(business)
  const [error, setError] = useState('')
  useEffect(() => setDraft(business), [business, open])
  useEffect(() => {
    setError('')
    if (open && focusChannel) document.getElementById(`social-${focusChannel}`)?.focus()
  }, [open, focusChannel])
  const save = event => {
    event.preventDefault()
    const socialLinks = {}
    for (const [key, channel] of Object.entries(CHANNELS)) {
      try { socialLinks[key] = normalizeSocialUrl(draft.socialLinks?.[key] || '') }
      catch { setError(`${channel.name}: 올바른 http 또는 https 주소를 입력해주세요.`); document.getElementById(`social-${key}`)?.focus(); return }
    }
    onSave({ ...draft, socialLinks })
  }
  return <Modal title="가게 기본정보" open={open} onClose={onClose}>
    <p className="notice">입력한 정보는 채널별 홍보 문구에 자연스럽게 포함됩니다.</p>
    <form onSubmit={save}>
      <div className="business-grid">
        {fields.map(([key, label, placeholder]) => <label key={key}><span className="field-label">{label}</span><input value={draft[key] || ''} placeholder={placeholder} onChange={e => setDraft({ ...draft, [key]: e.target.value })} /></label>)}
      </div>
      <h3>SNS 페이지 주소</h3>
      <p className="notice">프로필이나 가게 페이지의 링크를 입력해주세요. 주소는 이 브라우저에 저장됩니다.</p>
      {Object.entries(CHANNELS).map(([key, channel]) => <label key={key}>
        <span className="field-label">{channel.icon} {channel.name}</span>
        <input id={`social-${key}`} type="text" inputMode="url" placeholder="https://…" value={draft.socialLinks?.[key] || ''} onChange={e => setDraft({ ...draft, socialLinks: { ...draft.socialLinks, [key]: e.target.value } })} />
      </label>)}
      {error && <p role="alert">{error}</p>}
      <button className="primary wide" type="submit">가게 정보 저장</button>
    </form>
  </Modal>
}
