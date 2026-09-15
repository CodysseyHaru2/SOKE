export default function CampaignList({ campaigns, onOpen }) {
  return (
    <section className="card section" id="campaigns">
      <div className="section-row"><div className="section-title compact"><span>03</span><div><h3>캠페인 관리</h3><p>저장한 홍보 작업을 다시 확인합니다.</p></div></div><b className="count">{campaigns.length}개</b></div>
      {campaigns.length ? <div className="campaign-list">{campaigns.map(campaign => (
        <button className="campaign-item" key={campaign.id} onClick={() => onOpen(campaign.id)}>
          {campaign.image ? <img src={campaign.image} alt="" /> : <span className="campaign-placeholder">S</span>}
          <span><b>{campaign.title}</b><small>{new Date(campaign.createdAt).toLocaleString('ko-KR')} · {campaign.items.length}개 채널</small></span>
          <i>›</i>
        </button>
      ))}</div> : <div className="empty small"><b>저장된 캠페인이 없습니다</b><small>완성한 문구를 캠페인으로 저장해보세요.</small></div>}
    </section>
  )
}
