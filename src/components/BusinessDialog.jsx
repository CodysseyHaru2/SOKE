import { useEffect, useState } from 'react'
import Modal from './Modal'

const fields = [
  ['name', '가게 이름', '카페 소크'],
  ['category', '업종', '카페·디저트'],
  ['address', '주소', '서울시 성동구'],
  ['phone', '전화번호', '02-000-0000'],
  ['hours', '영업시간', '매일 10:00–20:00'],
]

export default function BusinessDialog({ open, business, onClose, onSave }) {
  const [draft, setDraft] = useState(business)
  useEffect(() => setDraft(business), [business, open])
  return <Modal title="가게 기본정보" open={open} onClose={onClose}>
    <p className="notice">입력한 정보는 채널별 홍보 문구에 자연스럽게 포함됩니다.</p>
    <form onSubmit={event => { event.preventDefault(); onSave(draft) }}>
      <div className="business-grid">
        {fields.map(([key, label, placeholder]) => <label key={key}><span className="field-label">{label}</span><input value={draft[key] || ''} placeholder={placeholder} onChange={e => setDraft({ ...draft, [key]: e.target.value })} /></label>)}
      </div>
      <button className="primary wide" type="submit">가게 정보 저장</button>
    </form>
  </Modal>
}
