export function resizeImage(file, width = 1080, height = 1350) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      const image = new Image()
      image.onerror = reject
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d')
        const scale = Math.max(width / image.width, height / image.height)
        const drawWidth = image.width * scale
        const drawHeight = image.height * scale
        context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight)
        resolve(canvas.toDataURL('image/jpeg', 0.9))
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export function downloadImage(dataUrl, name = 'soke-campaign.jpg') {
  const anchor = document.createElement('a')
  anchor.href = dataUrl
  anchor.download = name
  anchor.click()
}
