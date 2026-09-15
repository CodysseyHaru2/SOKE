const CURRENT_USER_KEY = 'soke-current-email'

export const emptyState = () => ({
  business: { name: '', category: '', address: '', phone: '', hours: '' },
  campaigns: [],
})

export const getCurrentEmail = () => localStorage.getItem(CURRENT_USER_KEY) || ''

export const setCurrentEmail = email => {
  if (email) localStorage.setItem(CURRENT_USER_KEY, email)
  else localStorage.removeItem(CURRENT_USER_KEY)
}

const keyFor = email => `soke-user-${email.toLowerCase()}`

export const loadState = email => {
  try {
    return { ...emptyState(), ...JSON.parse(localStorage.getItem(keyFor(email)) || '{}') }
  } catch {
    return emptyState()
  }
}

export const saveState = (email, state) => {
  if (email) localStorage.setItem(keyFor(email), JSON.stringify(state))
}
