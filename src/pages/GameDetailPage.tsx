import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useArchiveJson } from '../lib/useArchiveJson'
import type { ArchiveGame } from '../types/archive'

export default function GameDetailPage() {
  const { gameId } = useParams()
  const { data: games, loading, error } = useArchiveJson<ArchiveGame[]>('games-archive.json')
  const game = games?.find((item) => item.id === Number(gameId))

  if (loading) {
    return <div className="archive-loading">Загружаем игру…</div>
  }

  if (error) {
    return <div className="archive-error">Не удалось загрузить архив: {error}</div>
  }

  if (!game) {
    return (
      <>
        <PageHeader title="Игра не найдена" kicker="Архив сервера" />
        <p className="prose page-lead">
          В восстановленном архиве нет игры с номером #{gameId}. Возможно, её страница не
          сохранилась в веб-архиве.
        </p>
        <Link className="button-link" to="/games">
          Все игры
        </Link>
      </>
    )
  }

  return (
    <>
      <nav className="crumbs" aria-label="Навигация">
        <Link to="/">Главная</Link>
        <span aria-hidden="true">/</span>
        <Link to="/games">Игры</Link>
        <span aria-hidden="true">/</span>
        <span>#{game.id}</span>
      </nav>

      <PageHeader title={game.title} kicker={`Игра #${game.id}`} />

      <div className="game-detail__badges">
        {game.status && <span className="status-pill">{game.status}</span>}
        {game.isChampionship && <span className="status-pill status-pill--gold">Чемпионат</span>}
        {game.express === 'Да' && <span className="status-pill status-pill--blue">Экспресс-игра</span>}
      </div>

      {game.description && <p className="prose page-lead">{game.description}</p>}

      <dl className="game-detail__facts">
        <div>
          <dt>Владелец</dt>
          <dd>{game.owner ?? '—'}</dd>
        </div>
        <div>
          <dt>Статус</dt>
          <dd>{game.status ?? '—'}</dd>
        </div>
        <div>
          <dt>Тип игры</dt>
          <dd>{game.type ?? '—'}</dd>
        </div>
        <div>
          <dt>Регистрация</dt>
          <dd>{game.registration ?? '—'}</dd>
        </div>
        <div>
          <dt>Начало</dt>
          <dd>{game.start ?? '—'}</dd>
        </div>
        <div>
          <dt>Завершение</dt>
          <dd>{game.end ?? '—'}</dd>
        </div>
        <div>
          <dt>Трасса</dt>
          <dd>{game.track ?? '—'}</dd>
        </div>
        <div>
          <dt>Кругов</dt>
          <dd>{game.laps ?? '—'}</dd>
        </div>
        <div>
          <dt>Игроков</dt>
          <dd>{game.players ?? '—'}</dd>
        </div>
        <div>
          <dt>Семян на ход</dt>
          <dd>{game.seedsPerMove ?? '—'}</dd>
        </div>
        <div>
          <dt>Ход</dt>
          <dd>{game.moveMinutes != null ? `${game.moveMinutes} мин.` : '—'}</dd>
        </div>
        <div>
          <dt>Победитель</dt>
          <dd className="game-detail__winner">
            {game.winner ?? '—'}
            {game.winnerRating != null && <span> +{game.winnerRating}</span>}
          </dd>
        </div>
      </dl>

      <div className="server-actions">
        {game.replayAvailable && (
          <a className="button-link" href={`replays/${game.replayId}.msr`} download>
            Скачать повтор игры ↓
          </a>
        )}
        <a
          className="button-link button-link--ghost"
          href={game.archiveUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Архивная страница ↗
        </a>
        <Link className="button-link button-link--ghost" to="/games">
          Все игры
        </Link>
      </div>

      {game.participants.length > 0 && (
        <section aria-labelledby="game-players-title">
          <h2 id="game-players-title" className="section-title section-title--spaced">
            <span>Игроки</span>
            <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
          </h2>
          <div className="accent-rule" />

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Место</th>
                  <th>Игрок</th>
                  <th>Рейтинг</th>
                  <th>Персонаж</th>
                  <th>Заклинания</th>
                  <th>Робот</th>
                  <th>Активен</th>
                </tr>
              </thead>
              <tbody>
                {game.participants.map((participant) => (
                  <tr key={`${participant.place}-${participant.player}`}>
                    <td className="data-table__num">{participant.place}</td>
                    <td>
                      {participant.profileId ? (
                        <Link to={`/players/${participant.profileId}`}>
                          <strong>{participant.player}</strong>
                        </Link>
                      ) : (
                        <strong>{participant.player}</strong>
                      )}
                    </td>
                    <td className="data-table__num">{participant.rank ?? '—'}</td>
                    <td>{participant.character ?? '—'}</td>
                    <td>{participant.arcans ?? '—'}</td>
                    <td>{participant.robot ? 'Да' : 'Нет'}</td>
                    <td>{participant.active ? 'Да' : 'Нет'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {game.finish.length > 0 && (
        <section aria-labelledby="game-finish-title">
          <h2 id="game-finish-title" className="section-title section-title--spaced">
            <span>Финишная статистика</span>
            <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
          </h2>
          <div className="accent-rule" />

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Место</th>
                  <th>Игрок</th>
                  <th>Время</th>
                  <th>Ходов</th>
                  <th>Семян</th>
                  <th>Бутылок</th>
                  <th>Арканов</th>
                  <th>Развалов</th>
                  <th>Рейтинг</th>
                </tr>
              </thead>
              <tbody>
                {game.finish.map((result) => (
                  <tr key={`${result.place}-${result.player}`} className={result.place === 1 ? 'is-winner' : undefined}>
                    <td className="data-table__num">{result.place}</td>
                    <td>
                      <strong>{result.player}</strong>
                    </td>
                    <td className="data-table__num">{result.time}</td>
                    <td className="data-table__num">{result.moves}</td>
                    <td className="data-table__num">{result.seeds}</td>
                    <td className="data-table__num">{result.bottles}</td>
                    <td className="data-table__num">{result.arcans}</td>
                    <td className="data-table__num">{result.scrap}</td>
                    <td className="data-table__num">
                      {result.rating}{' '}
                      <span className="data-table__muted">({result.ratingFormula})</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <aside className="archive-note">
        <strong>Повтор игры.</strong> Файл <code>.msr</code> — архивная запись повтора для
        оригинального клиента «СамоГонок». Некоторые повторы могли сохраниться не полностью.
      </aside>
    </>
  )
}
