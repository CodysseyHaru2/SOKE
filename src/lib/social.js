export function normalizeSocialUrl(value) {
  const text = value.trim()
  if (!text) return ''
  if (/^[a-z][a-z\d+.-]*:/i.test(text) && !/^https?:\/\//i.test(text)) throw new Error('http 또는 https 주소를 입력해주세요.')
  const url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`)
  if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.') || url.username || url.password) throw new Error('올바른 페이지 주소를 입력해주세요.')
  return url.href
}
