import PageHeader from '../components/PageHeader'
import team from '../data/team.json'

type Member = {
  name: string
  role?: string
}

type Group = {
  title: string
  logo?: string
  logoAlt?: string
  logoHref?: string
  members: Member[]
}

const groups = team.groups as Group[]

export default function TeamPage() {
  return (
    <>
      <PageHeader title={team.title} kicker="К-Д ЛАБ · 1С · Битрикс" />

      <div className="team-grid">
        {groups.map((group) => (
          <section className="team-group" key={group.title}>
            <h2 className="section-title">
              <span>{group.title}</span>
              <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
            </h2>
            <div className="accent-rule" />

            {'logo' in group && group.logo && (
              <a
                className="team-group__logo"
                href={group.logoHref}
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={group.logo} alt={group.logoAlt ?? group.title} />
              </a>
            )}

            <ul className="team-list">
              {group.members.map((member) => (
                <li key={member.name}>
                  <strong>{member.name}</strong>
                  {member.role && <span>{member.role}</span>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="credits">
        <h2 className="section-title">
          <span>Копирайты и благодарности</span>
          <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
        </h2>
        <div className="accent-rule" />
        {team.credits.map((credit) => (
          <p key={credit}>{credit}</p>
        ))}
      </section>
    </>
  )
}
