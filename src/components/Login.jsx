import { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const submit = event => {
    event.preventDefault()
    if (email.trim()) onLogin(email.trim())
  }
  return (
    <main className="login-screen">
      <form className="login-card" onSubmit={submit}>
        <div className="brand-mark">S</div>
        <h1>소크</h1>
        <p className="muted">이메일로 내 홍보 작업을 구분합니다.</p>
        <label className="field-label" htmlFor="loginEmail">이메일</label>
        <input id="loginEmail" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" required autoFocus />
        <button className="primary wide" type="submit">이메일로 시작하기</button>
        <p className="privacy">별도의 비밀번호를 수집하지 않습니다. 데이터는 현재 브라우저에 저장됩니다.</p>
      </form>
    </main>
  )
}
