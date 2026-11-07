import PageHeader from '../components/PageHeader'
import files from '../data/files.json'

export default function FilesPage() {
  return (
    <>
      <PageHeader title={files.title} kicker="Материалы" />
      <p className="prose page-lead">{files.lead}</p>

      {files.groups.map((group) => (
        <section className="files-group" key={group.title}>
          <h2 className="section-title">
            <span>{group.title}</span>
            <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
          </h2>
          <div className="accent-rule" />

          <div className="file-grid">
            {group.items.map((item) => (
              <a className="file-card" href={item.href} download key={item.title}>
                <span className="file-card__preview">
                  <img src={item.preview} alt="" loading="lazy" />
                </span>
                <span className="file-card__body">
                  <strong>{item.title}</strong>
                  <span>{item.meta}</span>
                  <span className="file-card__download">Скачать ↓</span>
                </span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
