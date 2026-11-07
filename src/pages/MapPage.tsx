import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import site from '../data/site.json'

const sections = [
  {
    title: 'Новости',
    icon: 'assets/menu-news.gif',
    links: [
      { label: 'Все новости', to: '/news' },
      { label: '17-й Чемпионат', to: '/news/227' }
    ]
  },
  {
    title: 'Об игре',
    icon: 'assets/menu-game.gif',
    links: [
      { label: 'Коротко об игре', to: '/game' },
      { label: 'Режимы игры', to: '/game' },
      { label: 'Где купить', to: '/buy' }
    ]
  },
  {
    title: 'Вселенная',
    icon: 'assets/menu-features.gif',
    links: [
      { label: 'Хроники СамоГского Сопротивления', to: '/universe' },
      { label: 'Персонажи', to: '/universe' },
      { label: 'Миры и трассы', to: '/universe' }
    ]
  },
  {
    title: 'Создатели',
    icon: 'assets/menu-team.gif',
    links: [{ label: 'К-Д ЛАБ, 1С, Битрикс', to: '/team' }]
  }
]

export default function MapPage() {
  return (
    <>
      <PageHeader title="Карта сайта" kicker="Навигация" />

      <div className="sitemap">
        {sections.map((section) => (
          <section className="sitemap__section" key={section.title}>
            <div className="sitemap__head">
              <img src={section.icon} alt="" width={46} height={46} />
              <h2>{section.title}</h2>
            </div>
            <ul>
              {section.links.map((link) => (
                <li key={`${section.title}-${link.label}`}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="sitemap__section">
          <div className="sitemap__head">
            <img src="assets/top-files.gif" alt="" width={34} height={34} />
            <h2>Материалы</h2>
          </div>
          <ul>
            <li><Link to="/files">Файлы</Link></li>
            <li><Link to="/shots">Скриншоты</Link></li>
            <li><Link to="/buy">Где купить</Link></li>
            <li><Link to="/forum">Форум</Link></li>
            <li><Link to="/contacts">Контакты</Link></li>
          </ul>
        </section>

        <section className="sitemap__section">
          <div className="sitemap__head">
            <img src="assets/start.gif" alt="" width={46} height={46} />
            <h2>Самогонки On-line</h2>
          </div>
          <ul>
            <li><Link to={site.online.to}>Сервер онлайновых состязаний</Link></li>
            <li><Link to="/online">Вход и регистрация</Link></li>
            <li><Link to="/games">Игры сервера</Link></li>
            <li><Link to="/championships">Чемпионаты</Link></li>
            <li><Link to="/games">Рейтинг игроков</Link></li>
          </ul>
        </section>
      </div>
    </>
  )
}
