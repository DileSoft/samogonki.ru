import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useArchiveJson } from '../lib/useArchiveJson'
import type { ArchiveGame, PlayersArchive } from '../types/archive'
import meta from '../data/games.json'

const PAGE_SIZE = 20

export default function GamesPage() {
  const { data: games, loading, error } = useArchiveJson<ArchiveGame[]>('games-archive.json')
  const { data: players } = useArchiveJson<PlayersArchive>('players-archive.json')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [championshipsOnly, setChampionshipsOnly] = useState(false)
  const [page, setPage] = useState(1)
  const [showAllRatings, setShowAllRatings] = useState(false)

  const filtered = useMemo(() => {
    if (!games) return []
    const query = search.trim().toLowerCase()
    return games.filter((game) => {
      if (championshipsOnly && !game.isChampionship) return false
      if (status !== 'all' && game.status !== status) return false
      if (!query) return true
      return [game.title, game.owner, game.track, game.winner]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    })
  }, [games, search, status, championshipsOnly])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const ratings = players?.ratings ?? meta.ratings
  const visibleRatings = showAllRatings ? ratings : ratings.slice(0, 20)

  const updateSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }
  const updateStatus = (value: string) => {
    setStatus(value)
    setPage(1)
  }

  return (
    <>
      <PageHeader title="Игры" kicker="Онлайн-сервер · архив 2001–2005" />
      <p className="prose page-lead">
        В веб-архиве сохранились страницы сервера WWW.SAMOGONKI.RU: {meta.totals.games} игр,
        рейтинг игроков, чемпионаты и файлы повторов. Ниже — {games?.length ?? '…'} игр, которые
        удалось восстановить по отдельным архивным страницам.
      </p>

      <div className="server-stats">
        <div className="server-stat">
          <strong>{meta.totals.games}</strong>
          <span>игр на сервере</span>
        </div>
        <div className="server-stat">
          <strong>{games?.length ?? '…'}</strong>
          <span>игр в архиве</span>
        </div>
        <div className="server-stat">
          <strong>{games?.filter((game) => game.isChampionship).length ?? '…'}</strong>
          <span>чемпионатов</span>
        </div>
        <div className="server-stat">
          <strong>{games?.filter((game) => game.replayAvailable).length ?? '…'}</strong>
          <span>игр с повторами</span>
        </div>
      </div>

      <div className="server-actions">
        <Link className="button-link" to="/championships">
          Чемпионаты
        </Link>
        <Link className="button-link button-link--ghost" to="/forum">
          Форум
        </Link>
        <Link className="button-link button-link--ghost" to="/replays">
          Повторы
        </Link>
        <Link className="button-link button-link--ghost" to="/online">
          Вернуться на сервер
        </Link>
        <a
          className="button-link button-link--ghost"
          href={meta.championship.archiveUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Архив сервера ↗
        </a>
      </div>

      <section aria-labelledby="games-list-title">
        <h2 id="games-list-title" className="section-title section-title--spaced">
          <span>Все игры</span>
          <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
        </h2>
        <div className="accent-rule" />

        <div className="archive-filters">
          <label className="filter-field filter-field--search">
            <span>Поиск</span>
            <input
              type="search"
              value={search}
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Название, владелец, трасса, победитель"
            />
          </label>
          <label className="filter-field">
            <span>Статус</span>
            <select value={status} onChange={(event) => updateStatus(event.target.value)}>
              <option value="all">Все статусы</option>
              <option value="Игра успешно завершена">Завершённые</option>
              <option value="Активная игра">Активные</option>
              <option value="Игра скомпрометирована">Скомпрометированные</option>
              <option value="Игра ещё не началась">Не начавшиеся</option>
            </select>
          </label>
          <label className="filter-check">
            <input
              type="checkbox"
              checked={championshipsOnly}
              onChange={(event) => {
                setChampionshipsOnly(event.target.checked)
                setPage(1)
              }}
            />
            <span>Только чемпионаты</span>
          </label>
        </div>

        {loading && <div className="archive-loading">Загружаем архив игр…</div>}
        {error && (
          <div className="archive-error">
            Не удалось загрузить архив игр: {error}. Запустите проект через dev-сервер или
            production-preview.
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="result-count">
              Найдено игр: <strong>{filtered.length}</strong>
              {filtered.length > PAGE_SIZE && (
                <span>
                  {' '}
                  · страница {currentPage} из {pageCount}
                </span>
              )}
            </p>

            <div className="game-card-list">
              {visible.map((game) => (
                <article className="game-card" key={game.id}>
                  <header className="game-card__head">
                    {game.status && <span className="status-pill">{game.status}</span>}
                    {game.isChampionship && <span className="status-pill status-pill--gold">Чемпионат</span>}
                    <h3>
                      <Link to={`/games/${game.id}`}>{game.title}</Link>
                    </h3>
                    <span className="game-card__id">#{game.id}</span>
                  </header>

                  <dl className="game-card__meta">
                    <div>
                      <dt>Начало</dt>
                      <dd>{game.start ?? '—'}</dd>
                    </div>
                    <div>
                      <dt>Конец</dt>
                      <dd>{game.end ?? '—'}</dd>
                    </div>
                    <div>
                      <dt>Владелец</dt>
                      <dd>{game.owner ?? '—'}</dd>
                    </div>
                    <div>
                      <dt>Трасса</dt>
                      <dd>{game.track ?? '—'}</dd>
                    </div>
                    <div>
                      <dt>Игроков</dt>
                      <dd>{game.players ?? '—'}</dd>
                    </div>
                    <div>
                      <dt>Кругов</dt>
                      <dd>{game.laps ?? '—'}</dd>
                    </div>
                  </dl>

                  <div className="game-card__winner">
                    <span>Победитель:</span> <strong>{game.winner ?? '—'}</strong>{' '}
                    {game.winnerRating != null && <em>рейтинг +{game.winnerRating}</em>}
                  </div>

                  <div className="game-card__actions">
                    <Link className="text-link" to={`/games/${game.id}`}>
                      Подробнее об игре →
                    </Link>
                    {game.replayAvailable && (
                      <a className="text-link" href={`replays/${game.replayId}.msr`} download>
                        Скачать повтор ↓
                      </a>
                    )}
                    <a
                      className="text-link"
                      href={game.archiveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Архивная страница ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {pageCount > 1 && (
              <nav className="pagination" aria-label="Страницы игр">
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
      </section>

      <section id="ratings" aria-labelledby="ratings-title">
        <h2 id="ratings-title" className="section-title section-title--spaced">
          <span>Рейтинг игроков</span>
          <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
        </h2>
        <div className="accent-rule" />

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Ник</th>
                <th>Имя игрока</th>
                <th>Игр</th>
                <th>Лучшая игра</th>
                <th>Рейтинг</th>
                <th>Эффект.</th>
              </tr>
            </thead>
            <tbody>
              {visibleRatings.map((player) => (
                <tr key={player.profileId}>
                  <td className="data-table__num">{player.rank}</td>
                  <td>
                    <strong>{player.nick}</strong>
                  </td>
                  <td>{player.name || '—'}</td>
                  <td className="data-table__num">{player.games}</td>
                  <td>{player.bestGame}</td>
                  <td className="data-table__num">
                    {player.rating}{' '}
                    {player.ratingDelta && <span className="data-table__muted">{player.ratingDelta}</span>}
                  </td>
                  <td className="data-table__num">{player.effectiveness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ratings-footer">
          <p className="table-note">
            {showAllRatings
              ? `Показаны все ${ratings.length} игроков из архива рейтинга.`
              : `Показаны первые 20 из ${ratings.length} игроков архива.`}
          </p>
          {ratings.length > 20 && (
            <button
              type="button"
              className="button-link button-link--ghost"
              onClick={() => setShowAllRatings((value) => !value)}
            >
              {showAllRatings ? 'Свернуть рейтинг' : `Показать всех (${ratings.length})`}
            </button>
          )}
        </div>
      </section>

      <aside className="archive-note">
        <strong>Что сохранилось.</strong> В архиве есть {games?.length ?? 969} страниц игр из{' '}
        {meta.totals.games}, полный рейтинг на 135 игроков, 111 анкет и{' '}
        {games?.filter((game) => game.replayAvailable).length ?? 795} игр с файлами повторов.
        Отдельные страницы игр, которых нет в архиве, сохранились только в списках и профилях.
      </aside>
    </>
  )
}
