import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import online from '../data/online.json'

export default function OnlinePage() {
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(online.login.notice)
  }

  return (
    <>
      <PageHeader title={online.title} kicker="Онлайн-сервер" />
      <p className="prose page-lead">{online.lead}</p>

      <div className="online-layout">
        <section className="panel online-login">
          <h2 className="panel__title">{online.login.title}</h2>
          <form onSubmit={handleSubmit}>
            {online.login.fields.map((field) => (
              <label className="field" key={field.name}>
                <span>{field.label}</span>
                <input
                  type={field.type}
                  name={field.name}
                  autoComplete={field.autocomplete}
                  placeholder={field.label}
                />
              </label>
            ))}
            <button className="button" type="submit">
              {online.login.submit}
            </button>
            <div className="online-login__links">
              {online.login.links.map((link) => (
                <span key={link}>{link}</span>
              ))}
            </div>
            {message && (
              <p className="form-message" role="status">
                {message}
              </p>
            )}
          </form>
        </section>

        <section className="panel championship">
          <p className="championship__kicker">Завершён</p>
          <h2 className="panel__title">{online.championship.title}</h2>
          <p>{online.championship.description}</p>
          <dl className="facts">
            {online.championship.stats.map((stat) => (
              <div className="facts__row" key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
          <div className="server-actions server-actions--compact">
            <Link className="button-link" to="/championships">
              Подробнее о финале
            </Link>
            <Link className="button-link button-link--ghost" to="/games">
              Все игры
            </Link>
          </div>
        </section>
      </div>

      <div className="server-data-grid">
        <Link className="server-data-card" to="/games">
          <span className="server-data-card__icon" aria-hidden="true">01</span>
          <strong>Игры сервера</strong>
          <span>10 архивных записей из 1435: трассы, владельцы, победители и комментарии.</span>
        </Link>
        <Link className="server-data-card" to="/championships">
          <span className="server-data-card__icon" aria-hidden="true">17</span>
          <strong>Чемпионаты</strong>
          <span>Финал 17-го чемпионата: участники, заклинания и финишная статистика.</span>
        </Link>
        <Link className="server-data-card" to="/games">
          <span className="server-data-card__icon" aria-hidden="true">135</span>
          <strong>Рейтинг игроков</strong>
          <span>Первые 20 самогонщиков из рейтинга 2005 года.</span>
        </Link>
      </div>

      <div className="mode-grid">
        {online.features.map((feature) => (
          <article className="mode-card" key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </div>
    </>
  )
}
