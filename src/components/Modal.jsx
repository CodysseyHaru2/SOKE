export default function Modal({ title, open, onClose, children, wide = false }) {
  if (!open) return null
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className={`modal ${wide ? 'modal-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <header className="modal-head">
          <h2>{title}</h2>
          <button className="icon-button" onClick={onClose} aria-label="닫기">×</button>
        </header>
        <div className="modal-body">{children}</div>
      </section>
    </div>
  )
}
