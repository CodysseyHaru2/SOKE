export default function AppHeader({ onBusiness, onLogout }) {
  return (
    <header className="app-header">
      <a className="logo" href="#top" aria-label="소크 홈"><span>S</span> 소크</a>
      <div className="header-actions">
        <button className="secondary" onClick={onBusiness}>가게 정보</button>
        <button className="secondary" onClick={onLogout}>로그아웃</button>
      </div>
    </header>
  )
}
