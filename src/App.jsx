import { useEffect, useState } from 'react'
import AppHeader from './components/AppHeader'
import BottomNav from './components/BottomNav'
import BusinessDialog from './components/BusinessDialog'
import CampaignDialog from './components/CampaignDialog'
import CampaignForm from './components/CampaignForm'
import CampaignList from './components/CampaignList'
import Login from './components/Login'
import PreviewPanel from './components/PreviewPanel'
import { createId, createResults } from './lib/campaign'
import { DEFAULT_CHANNELS } from './lib/channels'
import { resizeImage } from './lib/image'
import { emptyState, getCurrentEmail, loadState, saveState, setCurrentEmail } from './lib/storage'

const emptyForm = () => ({ title: '', source: '', image: '', channels: DEFAULT_CHANNELS })

export default function App() {
  const [email, setEmail] = useState(getCurrentEmail)
  const [data, setData] = useState(() => email ? loadState(email) : emptyState())
  const [form, setForm] = useState(emptyForm)
  const [results, setResults] = useState([])
  const [businessOpen, setBusinessOpen] = useState(false)
  const [campaignId, setCampaignId] = useState(null)
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => { if (email) saveState(email, data) }, [email, data])
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 1800); return () => clearTimeout(timer) }, [toast])

  const login = value => { setCurrentEmail(value); setEmail(value); setData(loadState(value)) }
  const logout = () => { setCurrentEmail(''); setEmail(''); setData(emptyState()); setResults([]); setForm(emptyForm()) }
  const notify = message => setToast(message)
  const handlePhoto = async event => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const image = await resizeImage(file)
      setForm(current => ({ ...current, image }))
      notify('사진을 4:5 비율로 정리했습니다.')
    }
    catch { notify('사진을 불러오지 못했습니다.') }
  }
  const generate = () => {
    if (!form.source.trim()) return notify('원본 정보를 먼저 입력해주세요.')
    if (!form.channels.length) return notify('채널을 하나 이상 선택해주세요.')
    setBusy(true)
    setResults(createResults(form.channels, form.source, data.business))
    setTimeout(() => setBusy(false), 250)
  }
  const updateResult = updated => setResults(items => items.map(item => item.id === updated.id ? updated : item))
  const saveCampaign = () => {
    const campaign = { id: createId(), title: form.title.trim() || '이름 없는 캠페인', source: form.source, image: form.image, items: results, createdAt: new Date().toISOString() }
    setData(current => ({ ...current, campaigns: [campaign, ...current.campaigns] }))
    setResults([]); setForm(emptyForm()); notify('캠페인을 저장했습니다.')
  }
  const updateCampaign = campaign => setData(current => ({ ...current, campaigns: current.campaigns.map(item => item.id === campaign.id ? campaign : item) }))
  const deleteCampaign = id => { setData(current => ({ ...current, campaigns: current.campaigns.filter(item => item.id !== id) })); setCampaignId(null); notify('캠페인을 삭제했습니다.') }
  const openCampaign = data.campaigns.find(item => item.id === campaignId)

  if (!email) return <Login onLogin={login} />
  return <>
    <div className="app-shell" id="top">
      <AppHeader onBusiness={() => setBusinessOpen(true)} onLogout={logout} />
      <main className="content">
        <section className="hero"><span className="eyebrow">SOCIAL CONTENT MAKER</span><h1>오늘도 한 번에, <em>소크</em></h1><p><b>{email}</b>님의 캠페인은 이 기기에 안전하게 저장됩니다.</p></section>
        <div className="workspace">
          <CampaignForm form={form} setForm={setForm} onPhoto={handlePhoto} onGenerate={generate} busy={busy} />
          <PreviewPanel results={results} image={form.image} onChange={updateResult} onRemove={id => setResults(items => items.filter(item => item.id !== id))} onSave={saveCampaign} />
        </div>
        <CampaignList campaigns={data.campaigns} onOpen={setCampaignId} />
      </main>
    </div>
    <BottomNav />
    <BusinessDialog open={businessOpen} business={data.business} onClose={() => setBusinessOpen(false)} onSave={business => { setData(current => ({ ...current, business })); setBusinessOpen(false); notify('가게 정보를 저장했습니다.') }} />
    <CampaignDialog campaign={openCampaign} onClose={() => setCampaignId(null)} onChange={updateCampaign} onDelete={deleteCampaign} />
    <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
  </>
}
