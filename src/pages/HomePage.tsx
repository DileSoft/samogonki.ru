import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import NewsList, { MoreLink } from '../components/NewsList'
import Lightbox from '../components/Lightbox'
import home from '../data/home.json'
import news from '../data/news.json'
import screenshots from '../data/screenshots.json'

export default function HomePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <PageHeader title={home.heading} kicker="Официальный сайт игры" />

      <section className="intro">
        <Link to={home.banner.to} className="intro__banner">
          <img src={home.banner.src} alt={home.banner.alt} width={150} height={68} />
        </Link>
        <div className="intro__text" dangerouslySetInnerHTML={{ __html: home.introHtml }} />
      </section>

      <div className="home-layout">
        <section className="home-news" aria-labelledby="home-news-title">
          <div className="section-head">
            <h2 id="home-news-title" className="section-title">
              <span>{home.newsHeading}</span>
              <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
            </h2>
            <div className="accent-rule" />
          </div>

          <NewsList items={news.slice(0, home.newsLimit)} />

          <MoreLink to="/news">Все новости</MoreLink>
        </section>

        <aside className="home-shots" aria-labelledby="home-shots-title">
          <div className="section-head">
            <h2 id="home-shots-title" className="section-title">
              <span>{home.shotsHeading}</span>
              <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
            </h2>
            <div className="accent-rule" />
          </div>

          <div className="home-shots__grid">
            {screenshots.slice(0, home.shotsLimit).map((shot, index) => (
              <button
                key={shot.id}
                type="button"
                className="shot-thumb"
                onClick={() => setLightboxIndex(index)}
                aria-label={`Увеличить: ${shot.title}`}
              >
                <img src={shot.thumb} alt={shot.alt} width={120} height={90} loading="lazy" />
              </button>
            ))}
          </div>

          <MoreLink to="/shots">Скриншоты</MoreLink>
        </aside>
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
