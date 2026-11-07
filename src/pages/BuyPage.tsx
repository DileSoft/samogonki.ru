import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import buy from '../data/buy.json'

export default function BuyPage() {
  return (
    <>
      <PageHeader title={buy.title} kicker="Где купить" />

      <div className="buy-layout">
        <div className="buy-main">
          {buy.sections.map((section) => (
            <section className="buy-section" key={section.title}>
              <h2 className="buy-section__title">{section.title}</h2>
              <ul className="prose-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}

          <aside className="archive-note">
            <strong>Спустя годы.</strong> {buy.note}
          </aside>
        </div>

        <aside className="buy-side">
          <div className="panel buy-card">
            <img src="assets/banner-buy.gif" alt="Где купить?" width={150} height={68} />
            <p>Официальный сайт игры «СамоГонки» и сервер онлайновых состязаний.</p>
            <Link className="button-link" to="/online">
              Перейти на сервер
            </Link>
          </div>
        </aside>
      </div>
    </>
  )
}
