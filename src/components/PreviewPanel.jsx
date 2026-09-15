import PostCard from './PostCard'

export default function PreviewPanel({ results, image, onChange, onRemove, onSave }) {
  return (
    <section className="card" id="preview">
      <div className="section-title"><span>02</span><div><h3>채널별 미리보기</h3><p>문구를 고치고 저장하거나 복사할 수 있습니다.</p></div></div>
      {results.length ? (
        <div className="post-list">
          {results.map(item => <PostCard key={item.id} item={item} image={image} onChange={onChange} onRemove={() => onRemove(item.id)} />)}
          <button className="primary wide" onClick={onSave}>캠페인으로 묶어 저장</button>
        </div>
      ) : <div className="empty"><span>✦</span><b>아직 만든 문구가 없어요</b><small>사진과 정보를 입력하고 문구 만들기를 눌러주세요.</small></div>}
    </section>
  )
}
