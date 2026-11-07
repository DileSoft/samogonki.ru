import { NavLink } from 'react-router-dom'
import site from '../data/site.json'

type IconLinkProps = {
  icon: string
  iconHover: string
  label: string
  to: string
  className?: string
}

export function IconLink({ icon, iconHover, label, to, className = '' }: IconLinkProps) {
  return (
    <NavLink
      to={to}
      aria-label={label}
      className={({ isActive }) => `${className} ${isActive ? 'is-active' : ''}`.trim()}
    >
      <span className="icon-swap" aria-hidden="true">
        <img src={icon} alt="" className="icon-swap__base" />
        <img src={iconHover} alt="" className="icon-swap__hover" />
      </span>
      <span className="icon-link__label">{label}</span>
    </NavLink>
  )
}

export default function Header() {
  return (
    <header className="site-header">
      <div className="brand-panel">
        <NavLink to="/" className="brand-logo" aria-label="Самогонки — на главную">
          <img src={site.logo} alt="Самогонки" width={135} height={79} />
        </NavLink>

        <div className="brand-extras">
          <div className="lang-switch" aria-label="Язык сайта">
            {site.languages.map((language) => (
              <span
                className={`lang-switch__item ${language.enabled ? 'is-enabled' : 'is-disabled'}`}
                key={language.code}
                title={language.enabled ? language.label : 'Английская версия сайта не восстановлена'}
              >
                <img src={language.image} alt={language.label} width={56} height={10} />
              </span>
            ))}
          </div>
          <div className="brand-trim" aria-hidden="true">
            <img src="assets/t1.gif" alt="" width={36} height={41} />
            <img src="assets/t2.jpg" alt="" width={80} height={41} />
          </div>
        </div>
      </div>

      <div className="header-main">
        <nav className="top-nav" aria-label="Разделы сайта">
          {site.topNav.map((item) => (
            <IconLink
              key={item.id}
              to={item.to}
              icon={item.icon}
              iconHover={item.iconHover}
              label={item.label}
              className="top-nav__link"
            />
          ))}
        </nav>
        <div className="ticker" title={site.ticker}>
          <span className="ticker__dot" aria-hidden="true" />
          <span className="ticker__text">{site.ticker}</span>
        </div>
      </div>
    </header>
  )
}
