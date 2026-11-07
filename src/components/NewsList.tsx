import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export type NewsItemData = {
  id: number
  dateLabel: string
  dateISO: string
  title: string
  html: string
  image?: string
  imageAlt?: string
}

export function MoreLink({ to, children = 'Подробнее' }: { to: string; children?: ReactNode }) {
  return (
    <Link className="more-link" to={to}>
      <span className="more-link__arrow" aria-hidden="true">
        <img src="assets/arr.gif" alt="" className="more-link__arrow-base" />
        <img src="assets/arr-anim.gif" alt="" className="more-link__arrow-hover" />
      </span>
      <span>{children}</span>
    </Link>
  )
}

export default function NewsList({ items }: { items: NewsItemData[] }) {
  return (
    <div className="news-list">
      {items.map((item) => (
        <article className="news-item" id={`news-${item.id}`} key={item.id}>
          <div className="news-meta">
            <time className="news-date" dateTime={item.dateISO}>
              {item.dateLabel}
            </time>
            <Link className="news-title" to={`/news/${item.id}`}>
              {item.title}
            </Link>
          </div>
          <div className="news-rule" />
          <div className="news-body">
            {item.image && (
              <Link to={`/news/${item.id}`} className="news-image-link">
                <img className="news-image" src={item.image} alt={item.imageAlt ?? ''} loading="lazy" />
              </Link>
            )}
            <div dangerouslySetInnerHTML={{ __html: item.html }} />
          </div>
          <MoreLink to={`/news/${item.id}`} />
        </article>
      ))}
    </div>
  )
}
