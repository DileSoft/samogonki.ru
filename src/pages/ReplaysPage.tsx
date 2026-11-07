import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useArchiveJson } from '../lib/useArchiveJson'
import type { ReplayEntry } from '../types/archive'

const PAGE_SIZE = 50

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} Б`
  return `${(bytes / 1024).toFixed(1)} КБ`
}

export default function ReplaysPage() {
  const { data, loading, error } = useArchiveJson<ReplayEntry[]>('replays.json')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (!data) return []
    const query = search.trim()
    if (!query) return data
    return data.filter((replay) => String(replay.id).includes(query))
  }, [data, search])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const totalSize = data?.reduce((sum, replay) => sum + replay.size, 0) ?? 0

  return (
    <>
      <PageHeader title="Повторы игр" kicker="Архив онлайн-сервера" />
      <p className="prose page-lead">
        Сервер отдавал записи игр в виде файлов <code>.msr</code>. В веб-архиве сохранилась часть
        повторов — их можно скачать и открыть в оригинальном клиенте «СамоГонок».
      </p>

      <div className="server-stats">
        <div className="server-stat">
          <strong>{data?.length ?? '…'}</strong>
          <span>файлов повторов</span>
        </div>
        <div className="server-stat">
          <strong>{data ? formatSize(totalSize) : '…'}</strong>
          <span>общий размер</span>
        </div>
        <div className="server-stat">
          <strong>1185</strong>
          <span>ID повторов в веб-архиве</span>
        </div>
        <div className="server-stat">
          <strong>1022</strong>
          <span>страниц игр в веб-архиве</span>
        </div>
      </div>

      <div className="server-actions">
        <Link className="button-link" to="/games">
          Все игры
        </Link>
        <Link className="button-link button-link--ghost" to="/online">
          На сервер
        </Link>
      </div>

      {loading && <div className="archive-loading">Загружаем список повторов…</div>}
      {error && <div className="archive-error">Не удалось загрузить список повторов: {error}</div>}

      {data && (
        <>
          <div className="archive-filters">
            <label className="filter-field filter-field--search">
              <span>Поиск по ID игры</span>
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setPage(1)
                }}
                placeholder="Например, 3665"
              />
            </label>
          </div>

          <p className="result-count">
            Найдено повторов: <strong>{filtered.length}</strong>
            {filtered.length > PAGE_SIZE && (
              <span>
                {' '}
                · страница {currentPage} из {pageCount}
              </span>
            )}
          </p>

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID игры</th>
                  <th>Размер</th>
                  <th>Повтор</th>
                  <th>Страница игры</th>
                  <th>Архив</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((replay) => (
                  <tr key={replay.id}>
                    <td className="data-table__num">#{replay.id}</td>
                    <td className="data-table__num">{formatSize(replay.size)}</td>
                    <td>
                      <a href={replay.file} download>
                        Скачать .msr ↓
                      </a>
                    </td>
                    <td>
                      <Link to={`/games/${replay.id}`}>Открыть игру</Link>
                    </td>
                    <td>
                      {replay.archiveUrl ? (
                        <a href={replay.archiveUrl} target="_blank" rel="noreferrer noopener">
                          Wayback ↗
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pageCount > 1 && (
            <nav className="pagination" aria-label="Страницы повторов">
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
        </>
      )}

      <aside className="archive-note">
        <strong>О формате.</strong> <code>.msr</code> — внутренний формат записи повтора
        «СамоГонок». Браузер не умеет его проигрывать; файл предназначен для оригинального клиента.
      </aside>
    </>
  )
}
