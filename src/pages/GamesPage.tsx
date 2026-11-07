import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import games from '../data/games.json'

export default function GamesPage() {
  const { totals, championship } = games

  return (
    <>
      <PageHeader title="Игры" kicker="Онлайн-сервер · архив 2005" />
      <p className="prose page-lead">
        Сервер WWW.SAMOGONKI.RU позволял создавать собственные игры и участвовать в чужих.
        В веб-архиве сохранился снимок списка игр: первые 10 записей из {totals.games}, рейтинг
        игроков и финал 17-го чемпионата.
      </p>

      <div className="server-stats">
        <div className="server-stat">
          <strong>{totals.games}</strong>
          <span>игр на сервере</span>
        </div>
        <div className="server-stat">
          <strong>{totals.players}</strong>
          <span>игроков в рейтинге</span>
        </div>
        <div className="server-stat">
          <strong>{games.games.length}</strong>
          <span>игр в архивной выборке</span>
        </div>
        <div className="server-stat">
          <strong>17</strong>
          <span>чемпионат СамоГонок</span>
        </div>
      </div>

      <div className="server-actions">
        <Link className="button-link" to="/championships">
          Чемпионаты
        </Link>
        <Link className="button-link button-link--ghost" to="/online">
          Вернуться на сервер
        </Link>
        <a
          className="button-link button-link--ghost"
          href={championship.archiveUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Архив сервера ↗
        </a>
      </div>

      <section aria-labelledby="games-list-title">
        <h2 id="games-list-title" className="section-title section-title--spaced">
          <span>Последние игры</span>
          <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
        </h2>
        <div className="accent-rule" />

        <div className="game-card-list">
          {games.games.map((game) => (
            <article className="game-card" key={game.id}>
              <header className="game-card__head">
                <span className="status-pill">{game.status}</span>
                <h3>{game.title}</h3>
                <span className="game-card__id">#{game.id}</span>
              </header>

              <dl className="game-card__meta">
                <div>
                  <dt>Начало</dt>
                  <dd>{game.start}</dd>
                </div>
                <div>
                  <dt>Конец</dt>
                  <dd>{game.end}</dd>
                </div>
                <div>
                  <dt>Владелец</dt>
                  <dd>{game.owner}</dd>
                </div>
                <div>
                  <dt>Трасса</dt>
                  <dd>{game.track ?? '—'}</dd>
                </div>
                <div>
                  <dt>Игроков</dt>
                  <dd>
                    {game.players} из {game.playersRange}
                  </dd>
                </div>
                <div>
                  <dt>Кругов</dt>
                  <dd>{game.laps ?? '—'}</dd>
                </div>
              </dl>

              <div className="game-card__winner">
                <span>Победитель:</span> <strong>{game.winner}</strong>{' '}
                {game.winnerDelta && <em>{game.winnerDelta}</em>}
              </div>

              {game.winnerComment && (
                <blockquote className="game-card__quote">«{game.winnerComment}»</blockquote>
              )}

              <a
                className="text-link"
                href={game.archiveUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                Страница игры в веб-архиве ↗
              </a>
            </article>
          ))}
        </div>
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
              {games.ratings.map((player) => (
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

        <p className="table-note">
          Показаны первые 20 игроков из {totals.players}. Данные взяты со страницы рейтинга 2005 года.
        </p>
      </section>

      <aside className="archive-note">
        <strong>Что сохранилось.</strong> В веб-архиве есть только снимок первой страницы списка
        игр — 10 записей из {totals.games}. Полный список и страницы отдельных игр можно открыть по
        ссылкам на архивные копии.
      </aside>
    </>
  )
}
