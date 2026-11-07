import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useArchiveJson } from '../lib/useArchiveJson'
import type { PlayersArchive } from '../types/archive'

export default function PlayerPage() {
  const { playerId } = useParams()
  const { data, loading, error } = useArchiveJson<PlayersArchive>('players-archive.json')
  const profile = data?.profiles.find((item) => item.id === Number(playerId))
  const rating = data?.ratings.find((item) => item.profileId === Number(playerId))

  if (loading) {
    return <div className="archive-loading">Загружаем анкету игрока…</div>
  }

  if (error) {
    return <div className="archive-error">Не удалось загрузить архив: {error}</div>
  }

  if (!profile) {
    return (
      <>
        <PageHeader title="Игрок не найден" kicker="Архив сервера" />
        <p className="prose page-lead">
          Анкета игрока #{playerId} не сохранилась в веб-архиве или игрок не существовал.
        </p>
        <Link className="button-link" to="/games">
          Все игры
        </Link>
      </>
    )
  }

  const stats = profile.stats

  return (
    <>
      <nav className="crumbs" aria-label="Навигация">
        <Link to="/">Главная</Link>
        <span aria-hidden="true">/</span>
        <Link to="/games">Игры</Link>
        <span aria-hidden="true">/</span>
        <span>Игрок #{profile.id}</span>
      </nav>

      <PageHeader title={profile.name} kicker={`Анкета игрока #${profile.id}`} />

      <div className="game-detail__badges">
        {rating && <span className="status-pill status-pill--blue">Рейтинг {rating.rating}</span>}
        {profile.rating && !rating && <span className="status-pill status-pill--blue">Рейтинг {profile.rating}</span>}
        {rating && <span className="status-pill">Место {rating.rank}</span>}
      </div>

      <div className="player-layout">
        <div className="player-main">
          {profile.about && (
            <section className="panel">
              <h2 className="panel__title">О себе</h2>
              <p className="player-about">{profile.about}</p>
            </section>
          )}

          <section className="panel">
            <h2 className="panel__title">Статистика по играм</h2>
            <dl className="facts">
              <div className="facts__row">
                <dt>Всего сыграно игр</dt>
                <dd>{stats.played ?? '—'}</dd>
              </div>
              <div className="facts__row">
                <dt>Выиграно</dt>
                <dd>{stats.won ?? '—'}</dd>
              </div>
              <div className="facts__row">
                <dt>Проиграно</dt>
                <dd>{stats.lost ?? '—'}</dd>
              </div>
              <div className="facts__row">
                <dt>Создано игр</dt>
                <dd>{stats.created ?? '—'}</dd>
              </div>
              <div className="facts__row">
                <dt>Удалено, не доиграв</dt>
                <dd>{stats.deleted ?? '—'}</dd>
              </div>
              <div className="facts__row">
                <dt>Вышел, не доиграв</dt>
                <dd>{stats.left ?? '—'}</dd>
              </div>
            </dl>
          </section>

          {profile.bestGames.length > 0 && (
            <section className="panel">
              <h2 className="panel__title">Лучшие последние игры</h2>
              <ul className="player-best-games">
                {profile.bestGames.map((game) => (
                  <li key={game.id}>
                    <Link to={`/games/${game.id}`}>{game.title}</Link>
                    <span>{game.delta}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="player-side">
          <div className="panel">
            <h2 className="panel__title">Контакты</h2>
            <dl className="facts">
              <div className="facts__row">
                <dt>E-mail</dt>
                <dd>{profile.email ?? '—'}</dd>
              </div>
              <div className="facts__row">
                <dt>ICQ</dt>
                <dd>{profile.icq ?? '—'}</dd>
              </div>
              <div className="facts__row">
                <dt>Игр в рейтинге</dt>
                <dd>{rating?.games ?? '—'}</dd>
              </div>
              <div className="facts__row">
                <dt>Эффективность</dt>
                <dd>{rating?.effectiveness ?? '—'}</dd>
              </div>
            </dl>
          </div>

          <div className="server-actions">
            {profile.archiveUrl && (
              <a
                className="button-link button-link--ghost"
                href={profile.archiveUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                Архивная анкета ↗
              </a>
            )}
            <Link className="button-link button-link--ghost" to="/games">
              Все игры
            </Link>
          </div>
        </aside>
      </div>

      <aside className="archive-note">
        <strong>Анкета игрока.</strong> Фотографии и часть контактных данных могли не сохраниться в
        веб-архиве. Текст анкеты и статистика восстановлены с архивной страницы профиля.
      </aside>
    </>
  )
}
