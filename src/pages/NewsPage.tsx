import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import NewsList from '../components/NewsList'
import news from '../data/news.json'

export default function NewsPage() {
  const { newsId } = useParams()
  const currentIndex = newsId ? news.findIndex((item) => item.id === Number(newsId)) : -1
  const current = currentIndex >= 0 ? news[currentIndex] : null

  if (newsId && !current) {
    return (
      <>
        <PageHeader title="Новость не найдена" />
        <p className="prose">Такой новости в архиве нет. Возможно, ссылка устарела.</p>
        <Link className="button-link" to="/news">
          Все новости
        </Link>
      </>
    )
  }

  if (current) {
    const previous = currentIndex < news.length - 1 ? news[currentIndex + 1] : null
    const next = currentIndex > 0 ? news[currentIndex - 1] : null

    return (
      <>
        <nav className="crumbs" aria-label="Навигация">
          <Link to="/">Главная</Link>
          <span aria-hidden="true">/</span>
          <Link to="/news">Новости</Link>
          <span aria-hidden="true">/</span>
          <span>{current.dateLabel}</span>
        </nav>

        <article className="news-detail">
          <header>
            <time className="news-date" dateTime={current.dateISO}>
              {current.dateLabel}
            </time>
            <h1 className="page-title page-title--article">{current.title}</h1>
            <div className="accent-rule" />
          </header>
          {current.image && (
            <img
              className="news-detail__image"
              src={current.image}
              alt={current.imageAlt ?? ''}
            />
          )}
          <div className="prose prose--justify" dangerouslySetInnerHTML={{ __html: current.html }} />
        </article>

        <nav className="news-pager" aria-label="Соседние новости">
          {previous ? (
            <Link to={`/news/${previous.id}`} className="news-pager__item">
              <span>← Предыдущая</span>
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/news/${next.id}`} className="news-pager__item news-pager__item--next">
              <span>Следующая →</span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </>
    )
  }

  return (
    <>
      <PageHeader title="Новости" kicker="Архив · сентябрь–октябрь 2002" />
      <p className="prose page-lead">
        Все новости, сохранённые на главной странице сайта: чемпионаты, конкурсы скриншотов и жизнь
        СамоГской Гоночной Ассамблеи.
      </p>
      <NewsList items={news} />
    </>
  )
}
