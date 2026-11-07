import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export type LightboxImage = {
  title: string
  full: string
  alt: string
}

type LightboxProps = {
  images: LightboxImage[]
  index: number
  onClose: () => void
  onChange: (index: number) => void
}

export default function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const image = images[index]

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length)
      if (event.key === 'ArrowRight') onChange((index + 1) % images.length)
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [images.length, index, onChange, onClose])

  if (!image) return null

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={image.title} onClick={onClose}>
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Закрыть">
        ×
      </button>
      <div className="lightbox__frame" onClick={(event) => event.stopPropagation()}>
        <img className="lightbox__image" src={image.full} alt={image.alt} />
        <div className="lightbox__bar">
          <button
            type="button"
            className="lightbox__nav"
            onClick={() => onChange((index - 1 + images.length) % images.length)}
            aria-label="Предыдущий скриншот"
          >
            ‹
          </button>
          <div className="lightbox__caption">
            <strong>{image.title}</strong>
            <span>
              {index + 1} / {images.length}
            </span>
          </div>
          <button
            type="button"
            className="lightbox__nav"
            onClick={() => onChange((index + 1) % images.length)}
            aria-label="Следующий скриншот"
          >
            ›
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
