import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useArchiveJson } from '../lib/useArchiveJson'
import type { ForumArchive } from '../types/archive'

const PAGE_SIZE = 30

export default function ForumPage() {
  const { data: archive, loading, error } = useArchiveJson<ForumArchive>('forum-archive.json')
  const [sectionId, setSectionId] = useState<number | 'all'>('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const topics = useMemo(() => {
    if (!archive) return []
    const query = search.trim().toLowerCase()
    return archive.topics.filter((topic) => {
      if (sectionId !== 'all' && topic.sectionId !== sectionId) return false
      if (!query) return true
      return [topic.title, topic.author].filter(Boolean).some((value) => String(value).toLowerCase().includes(query))
    })
  }, [archive, sectionId, search])

  const pageCount = Math.max(1, Math.ceil(topics.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = topics.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const totalPosts = archive?.threads.reduce((sum, thread) => sum + thread.postCount, 0) ?? 0

  const sectionTitle = (id: number) =>
    archive?.sections.find((section) => section.id === id)?.title ?? `Раздел ${id}`
  const activeSection = sectionId === 'all' ? null : archive?.sections.find((section) => section.id === sectionId)

  return (
    <>
      <PageHeader title="Форум" kicker="Архив обсуждений · 2001–2005" />
      <p className="prose page-lead">
        Форум WWW.SAMOGONKI.RU сохранился частично: восстановлены разделы, списки тем и{' '}
        {archive?.threads.length ?? '…'} тем с полным содержимым. Остальные темы доступны только
        названиями.
      </p>

      <div className="server-stats">
        <div className="server-stat">
          <strong>{archive?.sections.length ?? '…'}</strong>
          <span>разделов</span>
        </div>
        <div className="server-stat">
          <strong>{archive?.topics.length ?? '…'}</strong>
          <span>тем в архиве</span>
        </div>
        <div className="server-stat">
          <strong>{archive?.threads.length ?? '…'}</strong>
          <span>тем с сообщениями</span>
        </div>
        <div className="server-stat">
          <strong>{totalPosts || '…'}</strong>
          <span>сообщений</span>
        </div>
      </div>

      {loading && <div className="archive-loading">Загружаем архив форума…</div>}
      {error && <div className="archive-error">Не удалось загрузить архив форума: {error}</div>}

      {archive && (
        <>
          <div className="forum-sections">
            <button
              type="button"
              className={`forum-section-tab ${sectionId === 'all' ? 'is-active' : ''}`}
              onClick={() => {
                setSectionId('all')
                setPage(1)
              }}
            >
              Все разделы
            </button>
            {archive.sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`forum-section-tab ${sectionId === section.id ? 'is-active' : ''}`}
                onClick={() => {
                  setSectionId(section.id)
                  setPage(1)
                }}
              >
                {section.title}
                <span>{section.topicCount}</span>
              </button>
            ))}
          </div>

          {activeSection && (
            <p className="forum-section-description">
              {activeSection.description} · тем: {activeSection.topicCount} · с сообщениями:{' '}
              {activeSection.archivedThreads}
            </p>
          )}

          <div className="archive-filters">
            <label className="filter-field filter-field--search">
              <span>Поиск по темам</span>
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setPage(1)
                }}
                placeholder="Название темы или автор"
              />
            </label>
          </div>

          <p className="result-count">
            Найдено тем: <strong>{topics.length}</strong>
            {topics.length > PAGE_SIZE && (
              <span>
                {' '}
                · страница {currentPage} из {pageCount}
              </span>
            )}
          </p>

          <div className="forum-topic-list">
            {visible.map((topic) => (
              <article className={`forum-topic ${topic.archived ? 'is-archived' : ''}`} key={topic.id}>
                <div className="forum-topic__main">
                  <span className="forum-topic__section">{sectionTitle(topic.sectionId)}</span>
                  {topic.archived ? (
                    <Link className="forum-topic__title" to={`/forum/${topic.id}`}>
                      {topic.title}
                    </Link>
                  ) : (
                    <span className="forum-topic__title">{topic.title}</span>
                  )}
                  <span className={`forum-topic__status ${topic.archived ? 'is-ok' : ''}`}>
                    {topic.archived ? `архив · ${topic.postCount} сообщ.` : 'только заголовок'}
                  </span>
                </div>
                <div className="forum-topic__meta">
                  <span>
                    <em>Автор:</em> {topic.author ?? '—'}
                  </span>
                  <span>
                    <em>Ответов:</em> {topic.replies ?? '—'}
                  </span>
                  <span>
                    <em>Последний:</em> {topic.lastDate ?? '—'}
                  </span>
                  <span>
                    <em>ID:</em> {topic.id}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {pageCount > 1 && (
            <nav className="pagination" aria-label="Страницы форума">
              <button
                type="button"
                className="pagination__button"
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                disabled={currentPage === 1}
              >
                ← Назад
              </button>
              <span className="pagination__info">
                {currentPage} / {pageCount}
              </span>
              <button
                type="button"
                className="pagination__button"
                onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
                disabled={currentPage === pageCount}
              >
                Вперёд →
              </button>
            </nav>
          )}

          <aside className="archive-note">
            <strong>Сохранность форума.</strong> В веб-архиве есть {archive.topics.length} тем и{' '}
            {archive.threads.length} страниц с сообщениями. Вложения, аватары и полные ветки
            обсуждений за пределами сохранённых страниц не восстановлены.
          </aside>
        </>
      )}
    </>
  )
}
