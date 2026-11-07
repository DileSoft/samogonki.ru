import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useArchiveJson } from '../lib/useArchiveJson'
import type { ForumArchive } from '../types/archive'

export default function ForumThreadPage() {
  const { threadId } = useParams()
  const { data: archive, loading, error } = useArchiveJson<ForumArchive>('forum-archive.json')
  const thread = archive?.threads.find((item) => item.id === Number(threadId))
  const section = thread?.sectionId
    ? archive?.sections.find((item) => item.id === thread.sectionId)
    : null

  if (loading) {
    return <div className="archive-loading">Загружаем тему форума…</div>
  }

  if (error) {
    return <div className="archive-error">Не удалось загрузить архив форума: {error}</div>
  }

  if (!thread) {
    return (
      <>
        <PageHeader title="Тема не найдена" kicker="Архив форума" />
        <p className="prose page-lead">
          Тема #{threadId} не сохранилась в архиве. Возможно, в веб-архив попала только страница
          списка тем без сообщений.
        </p>
        <Link className="button-link" to="/forum">
          Все темы форума
        </Link>
      </>
    )
  }

  return (
    <>
      <nav className="crumbs" aria-label="Навигация">
        <Link to="/">Главная</Link>
        <span aria-hidden="true">/</span>
        <Link to="/forum">Форум</Link>
        <span aria-hidden="true">/</span>
        <span>{section?.title ?? `Раздел ${thread.sectionId}`}</span>
      </nav>

      <PageHeader title={thread.title} kicker={`Тема #${thread.id}`} />

      <div className="forum-thread__stats">
        <span>
          <em>Сообщений:</em> {thread.postCount}
        </span>
        <span>
          <em>Первый:</em> {thread.firstDate}
        </span>
        <span>
          <em>Последний:</em> {thread.lastDate}
        </span>
        {thread.archiveUrl && (
          <a href={thread.archiveUrl} target="_blank" rel="noreferrer noopener">
            Архивная страница ↗
          </a>
        )}
      </div>

      <div className="forum-thread">
        {thread.posts.map((post) => (
          <article className="forum-post" key={post.id} id={`post-${post.id}`}>
            <header className="forum-post__head">
              <div>
                {post.profileId ? (
                  <Link className="forum-post__author" to={`/players/${post.profileId}`}>
                    {post.author || 'Аноним'}
                  </Link>
                ) : (
                  <strong className="forum-post__author">{post.author || 'Аноним'}</strong>
                )}
                <span className="forum-post__subject">{post.subject}</span>
              </div>
              <time className="forum-post__date">{post.date}</time>
            </header>
            <div className="forum-post__body">{post.body || '—'}</div>
            <footer className="forum-post__footer">
              <span>#{post.id}</span>
              {post.profileId && (
                <Link to={`/players/${post.profileId}`}>Профиль #{post.profileId}</Link>
              )}
            </footer>
          </article>
        ))}
      </div>

      <Link className="button-link" to="/forum">
        ← Все темы форума
      </Link>
    </>
  )
}
