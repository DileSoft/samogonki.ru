import PageHeader from '../components/PageHeader'
import game from '../data/game.json'

export default function GamePage() {
  return (
    <>
      <PageHeader title={game.title} kicker="Об игре" />

      <div className="game-layout">
        <div className="game-main">
          <p className="prose page-lead">{game.lead}</p>

          <h2 className="section-title">
            <span>Особенности</span>
            <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
          </h2>
          <div className="accent-rule" />

          <ul className="feature-list">
            {game.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <aside className="game-side">
          <div className="panel">
            <h2 className="panel__title">Карточка игры</h2>
            <dl className="facts">
              {game.facts.map((fact) => (
                <div className="facts__row" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="panel panel--media">
            <img src="assets/shots/shot3.jpg" alt="Скриншот из игры Самогонки" loading="lazy" />
          </div>
        </aside>
      </div>

      <h2 className="section-title section-title--spaced">
        <span>Режимы игры</span>
        <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
      </h2>
      <div className="accent-rule" />

      <div className="mode-grid">
        {game.modes.map((mode) => (
          <article className="mode-card" key={mode.title}>
            <h3>{mode.title}</h3>
            <p>{mode.text}</p>
          </article>
        ))}
      </div>
    </>
  )
}
