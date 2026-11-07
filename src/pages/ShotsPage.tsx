import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Lightbox from '../components/Lightbox'
import screenshots from '../data/screenshots.json'

export default function ShotsPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <PageHeader title="Скриншоты" kicker="Галерея · 7 кадров" />
      <p className="prose page-lead">
        Миры и трассы СамоГонок: зелёные планеты, красные скалы, стартовая решётка и финишная
        прямая. Нажмите на кадр, чтобы открыть его во весь экран.
      </p>

      <div className="gallery">
        {screenshots.map((shot, index) => (
          <button
            key={shot.id}
            type="button"
            className="gallery__item"
            onClick={() => setLightboxIndex(index)}
            aria-label={`Открыть скриншот: ${shot.title}`}
          >
            <img src={shot.thumb} alt={shot.alt} loading="lazy" />
            <span className="gallery__caption">{shot.title}</span>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={screenshots}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </>
  )
}
