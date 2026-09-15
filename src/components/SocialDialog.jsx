import { CHANNELS } from '../lib/channels'
import { normalizeSocialUrl } from '../lib/social'
import Modal from './Modal'

export default function SocialDialog({ open, business, onClose, onEdit }) {
  return <Modal title="SNS 연결" open={open} onClose={onClose}>
    <p className="notice">내 SNS 페이지 주소를 등록하고 바로 열 수 있습니다. 게시는 글을 복사한 뒤 각 채널에서 직접 진행해주세요.</p>
    <div className="social-list">{Object.entries(CHANNELS).map(([key, channel]) => {
      let url = ''
      try { url = normalizeSocialUrl(business.socialLinks?.[key] || '') } catch {}
      return <article className="social-row" key={key}>
        <strong>{channel.icon} {channel.name}</strong>
        <p>{url ? '개인 주소 등록됨' : '개인 주소 미등록'} · 복사·수동 게시</p>
        <div className="social-actions">
          {url ? <a className="secondary" href={url} target="_blank" rel="noopener noreferrer">내 페이지 열기 ↗</a> : <button className="secondary" onClick={() => onEdit(key)}>주소 등록</button>}
          {url && <button className="secondary" onClick={() => onEdit(key)}>주소 수정</button>}
        </div>
      </article>
    })}</div>
  </Modal>
}
