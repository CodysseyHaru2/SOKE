import Modal from './Modal'
import PostCard from './PostCard'

export default function CampaignDialog({ campaign, onClose, onChange, onDelete }) {
  if (!campaign) return null
  const updateItem = item => onChange({ ...campaign, items: campaign.items.map(current => current.id === item.id ? item : current) })
  const removeItem = id => onChange({ ...campaign, items: campaign.items.filter(item => item.id !== id) })
  return <Modal title={campaign.title} open onClose={onClose} wide>
    {campaign.image && <img className="detail-image" src={campaign.image} alt={`${campaign.title} 홍보 이미지`} />}
    <div className="campaign-meta"><span>{new Date(campaign.createdAt).toLocaleString('ko-KR')}</span><span>{campaign.items.length}개 채널</span></div>
    <div className="post-list">{campaign.items.map(item => <PostCard key={item.id} item={item} image={campaign.image} onChange={updateItem} onRemove={() => removeItem(item.id)} />)}</div>
    <button className="danger wide" onClick={() => onDelete(campaign.id)}>캠페인 전체 삭제</button>
  </Modal>
}
