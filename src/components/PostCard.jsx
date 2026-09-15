import { CHANNELS } from '../lib/channels'
import { downloadImage } from '../lib/image'

export default function PostCard({ item, image, onChange, onRemove }) {
  const channel = CHANNELS[item.channel]
  const update = changes => onChange({ ...item, ...changes })
  const copy = async () => navigator.clipboard.writeText(item.text)
  return (
    <article className="post-card">
      <div className="post-head"><strong>{channel.icon} {channel.name}</strong><span className={`status ${item.posted ? 'done' : ''}`}>{item.posted ? '게시 완료' : '게시 전'}</span></div>
      <textarea className="post-editor" value={item.text} onChange={e => update({ text: e.target.value, edited: e.target.value !== item.originalText })} />
      <label className={`posted-check ${item.posted ? 'checked' : ''}`}>
        <input type="checkbox" checked={item.posted} onChange={e => update({ posted: e.target.checked, postedAt: e.target.checked ? new Date().toISOString() : null })} />
        {item.posted ? '✓ 게시 완료 확인' : '게시했다면 체크'}
      </label>
      <div className="action-grid">
        <button onClick={() => update({ edited: item.text !== item.originalText })}>수정 저장</button>
        <button onClick={() => update({ text: item.originalText, edited: false })}>처음 문구로 복원</button>
        <button onClick={copy}>글 복사</button>
        <button onClick={() => image && downloadImage(image)} disabled={!image}>사진 다운로드</button>
        <button className="danger span-2" onClick={onRemove}>이 채널만 삭제</button>
      </div>
    </article>
  )
}
