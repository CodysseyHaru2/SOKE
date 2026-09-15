import { CHANNELS } from '../lib/channels'

export default function CampaignForm({ form, setForm, onPhoto, onGenerate, busy }) {
  const toggleChannel = channel => setForm(current => ({
    ...current,
    channels: current.channels.includes(channel)
      ? current.channels.filter(item => item !== channel)
      : [...current.channels, channel],
  }))
  return (
    <section className="card" id="create">
      <div className="section-title"><span>01</span><div><h3>새 캠페인 제작</h3><p>사진과 원본 정보로 채널별 홍보 문구를 만듭니다.</p></div></div>
      <label className={`upload-box ${form.image ? 'has-image' : ''}`}>
        <input type="file" accept="image/*" onChange={onPhoto} />
        {form.image ? <img src={form.image} alt="홍보 사진 미리보기" /> : <div><strong>＋</strong><b>홍보 사진 올리기</b><small>4:5 비율로 자동 정리됩니다</small></div>}
      </label>
      <label className="field-label" htmlFor="campaignTitle">캠페인 이름</label>
      <input id="campaignTitle" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="예: 가나슈 케이크 출시" />
      <label className="field-label" htmlFor="sourceText">원본 정보</label>
      <textarea id="sourceText" value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} placeholder={'오늘 준비한 메뉴:\n가격:\n이벤트 기간:\n추가 안내:'} />
      <span className="field-label">올릴 채널</span>
      <div className="channel-grid">
        {Object.entries(CHANNELS).map(([key, channel]) => (
          <button key={key} className={`channel ${form.channels.includes(key) ? 'active' : ''}`} onClick={() => toggleChannel(key)}>
            <span>{channel.icon}</span>{channel.name}
          </button>
        ))}
      </div>
      <button className="primary wide" onClick={onGenerate} disabled={busy}>{busy ? '문구 만드는 중…' : '✨ AI 채널 문구 만들기'}</button>
    </section>
  )
}
