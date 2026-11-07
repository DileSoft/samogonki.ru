import { NavLink } from 'react-router-dom'
import site from '../data/site.json'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="sidebar-art" aria-label="Самогонки — на главную">
        <img src={site.sidebarArt} alt="Наездники СамоГонок" width={251} height={173} />
      </NavLink>

      <nav className="side-nav" aria-label="Основная навигация">
        {site.sidebar.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) => `side-link ${isActive ? 'is-active' : ''}`}
          >
            <span className="side-copy">
              <span className="side-label">{item.label}</span>
              <img className="side-arrow" src="assets/side-arrow.gif" alt="" width={54} height={9} />
            </span>
            <span className="side-icon" aria-hidden="true">
              <img src={item.icon} alt="" className="side-icon__base" width={46} height={46} />
              <img src={item.iconHover} alt="" className="side-icon__hover" width={46} height={46} />
            </span>
          </NavLink>
        ))}
      </nav>

      <NavLink to={site.online.to} className="online-block" aria-label={site.online.label}>
        <span className="online-block__text" aria-hidden="true">
          {site.online.textLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </span>
        <span className="online-block__start">
          <img className="online-block__start-base" src={site.online.startImage} alt="" width={62} height={55} />
          <img className="online-block__start-hover" src={site.online.startImageHover} alt="" width={62} height={55} />
        </span>
      </NavLink>

      <div className="partners" aria-label="Партнёры">
        <a href={site.logos.kd.href} target="_blank" rel="noreferrer noopener" title="K-D Lab">
          <img src={site.logos.kd.src} alt={site.logos.kd.alt} width={79} height={58} />
        </a>
        <a href={site.logos.oneC.href} target="_blank" rel="noreferrer noopener" title="1C">
          <img src={site.logos.oneC.src} alt={site.logos.oneC.alt} width={70} height={58} />
        </a>
      </div>
    </aside>
  )
}
