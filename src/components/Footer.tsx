import { NavLink } from 'react-router-dom'
import site from '../data/site.json'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-credit">
        <a href={site.footer.bitrixHref} target="_blank" rel="noreferrer noopener" className="footer-bitrix">
          <img src={site.footer.bitrixLogo} alt="Битрикс" width={69} height={58} />
          <span>{site.footer.bitrixCredit}</span>
        </a>
        <span className="footer-archive">{site.footer.archiveNote}</span>
      </div>

      <div className="footer-character">
        <img src={site.footer.character} alt="Персонаж СамоГонок" width={82} height={70} />
      </div>

      <div className="footer-bottom">
        {site.footer.links.map((link) => (
          <NavLink key={link.id} to={link.to} className="footer-link">
            <span className="icon-swap icon-swap--small" aria-hidden="true">
              <img src={link.icon} alt="" className="icon-swap__base" />
              <img src={link.iconHover} alt="" className="icon-swap__hover" />
            </span>
            <span>{link.label}</span>
          </NavLink>
        ))}
        <div className="footer-copy">
          <span>{site.footer.copyright}</span>
          <span className="footer-copy__sep" aria-hidden="true">·</span>
          <span>Архив 2002–2005</span>
        </div>
      </div>
    </footer>
  )
}
