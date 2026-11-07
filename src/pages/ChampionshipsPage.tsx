import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useArchiveJson } from '../lib/useArchiveJson'
import type { ArchiveGame } from '../types/archive'
import games from '../data/games.json'
import news from '../data/news.json'

export default function ChampionshipsPage() {
  const championship = games.championship
  const { data: archiveGames } = useArchiveJson<ArchiveGame[]>('championships-archive.json')
  const championships = (archiveGames ?? [])
    .filter((game) => game.isChampionship && game.id !== championship.id)
    .sort((a, b) => b.id - a.id)
  const chronicle = news
    .filter((item) => item.id >= 221 && item.id <= 227)
    .sort((a, b) => a.id - b.id)

  return (
    <>
      <PageHeader title="Чемпионаты" kicker="Онлайн-сервер · 17-й чемпионат" />
      <p className="prose page-lead">
        Чемпионаты СамоГонок проходили на сервере WWW.SAMOGONKI.RU. В архиве лучше всего
        сохранился финал 17-го чемпионата: состав участников, их персонажи и заклинания, а также
        финишная статистика.
      </p>

      <section className="championship-hero panel" aria-labelledby="champ-title">
        <div className="championship-hero__top">
          <span className="status-pill">Игра успешно завершена</span>
          <span className="championship-hero__number">17</span>
        </div>
        <h2 id="champ-title">{championship.title}</h2>
        <p>{championship.description}</p>

        <dl className="championship-facts">
          <div>
            <dt>Приз</dt>
            <dd>{championship.prize}</dd>
          </div>
          <div>
            <dt>Регистрация</dt>
            <dd>{championship.registration}</dd>
          </div>
          <div>
            <dt>Начало игры</dt>
            <dd>{championship.start}</dd>
          </div>
          <div>
            <dt>Завершение</dt>
            <dd>{championship.end}</dd>
          </div>
          <div>
            <dt>Трасса</dt>
            <dd>{championship.track}</dd>
          </div>
          <div>
            <dt>Кругов</dt>
            <dd>{championship.laps}</dd>
          </div>
          <div>
            <dt>Игроков</dt>
            <dd>{championship.players}</dd>
          </div>
          <div>
            <dt>Ход</dt>
            <dd>{championship.moveDurationMinutes} мин.</dd>
          </div>
          <div>
            <dt>Семян на ход</dt>
            <dd>{championship.seedsPerMove}</dd>
          </div>
          <div>
            <dt>Тип игры</dt>
            <dd>{championship.type}</dd>
          </div>
          <div>
            <dt>Владелец</dt>
            <dd>{championship.owner}</dd>
          </div>
          <div>
            <dt>ID игры</dt>
            <dd>#{championship.id}</dd>
          </div>
        </dl>

        <div className="server-actions server-actions--compact">
          <a
            className="button-link"
            href={championship.archiveUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            Архивная страница финала ↗
          </a>
          <Link className="button-link button-link--ghost" to="/games">
            Все игры сервера
          </Link>
        </div>
      </section>

      <section aria-labelledby="champ-list-title">
        <h2 id="champ-list-title" className="section-title section-title--spaced">
          <span>Чемпионаты в архиве</span>
          <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
        </h2>
        <div className="accent-rule" />

        <p className="table-note">
          Найдено игр с «Чемпионат» в названии:{' '}
          <strong>{archiveGames ? championships.length + 1 : '…'}</strong>. Полные сетки всех
          чемпионатов не сохранились, но отдельные игры и финалы доступны.
        </p>

        <div className="championship-list">
          {championships.map((game) => (
            <article className="championship-list__item" key={game.id}>
              <div className="championship-list__head">
                <span className="status-pill status-pill--gold">Чемпионат</span>
                <Link to={`/games/${game.id}`}>
                  <strong>{game.title}</strong>
                </Link>
                <span className="game-card__id">#{game.id}</span>
              </div>
              <div className="championship-list__meta">
                <span>
                  <em>Трасса:</em> {game.track ?? '—'}
                </span>
                <span>
                  <em>Игроков:</em> {game.players ?? '—'}
                </span>
                <span>
                  <em>Победитель:</em> {game.winner ?? '—'}
                </span>
                <span>
                  <em>Дата:</em> {game.start ?? game.end ?? '—'}
                </span>
              </div>
              <Link className="text-link" to={`/games/${game.id}`}>
                Подробнее об игре →
              </Link>
            </article>
          ))}
          {!archiveGames && <div className="archive-loading">Загружаем список чемпионатов…</div>}
        </div>
      </section>

      <section aria-labelledby="participants-title">
        <h2 id="participants-title" className="section-title section-title--spaced">
          <span>Участники финала</span>
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
              </tr>
            </thead>
            <tbody>
              {championship.participants.map((participant) => (
                <tr key={participant.player}>
                  <td className="data-table__num">{participant.place}</td>
                  <td>
                    <strong>{participant.player}</strong>
                  </td>
                  <td className="data-table__num">{participant.rank}</td>
                  <td>{participant.character}</td>
                  <td>{participant.arcans.join(', ')}</td>
                  <td>{participant.robot ? 'Да' : 'Нет'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="finish-title">
        <h2 id="finish-title" className="section-title section-title--spaced">
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
              {championship.finish.map((result) => (
                <tr key={result.player} className={result.place === 1 ? 'is-winner' : undefined}>
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

      <section aria-labelledby="chronicle-title">
        <h2 id="chronicle-title" className="section-title section-title--spaced">
          <span>Хроника чемпионата</span>
          <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
        </h2>
        <div className="accent-rule" />

        <ol className="chronicle">
          {chronicle.map((item) => (
            <li key={item.id}>
              <time dateTime={item.dateISO}>{item.dateLabel}</time>
              <Link to={`/news/${item.id}`}>{item.title}</Link>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="champ-archive-title">
        <h2 id="champ-archive-title" className="section-title section-title--spaced">
          <span>Упоминания в архиве</span>
          <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
        </h2>
        <div className="accent-rule" />

        <ul className="archive-list">
          {championship.mentions.map((mention) => (
            <li key={mention.gameId}>
              <a
                href={`https://web.archive.org/web/2005/http://www.samogonki.ru/games/game_info.asp?ID=${mention.gameId}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {mention.title}
              </a>
              <span>ID {mention.gameId}</span>
            </li>
          ))}
        </ul>
      </section>

      <aside className="archive-note">
        <strong>Сохранность данных.</strong> Полная сетка всех чемпионатов в архиве не сохранилась.
        Здесь собрано то, что удалось восстановить: финал 17-го чемпионата, финишная статистика,
        новости и упоминания 10-го и 15-го чемпионатов на странице рейтинга игроков.
      </aside>
    </>
  )
}
