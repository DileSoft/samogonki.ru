import PageHeader from '../components/PageHeader'
import universe from '../data/universe.json'

export default function UniversePage() {
  return (
    <>
      <PageHeader title={universe.title} kicker="Вселенная СамоГа" />
      <p className="prose page-lead">{universe.lead}</p>

      <section className="toc panel" aria-labelledby="toc-title">
        <h2 id="toc-title" className="panel__title">
          Содержание
        </h2>
        <ol className="toc__list">
          {universe.toc.map((chapter) => (
            <li key={chapter.id}>
              <button
                type="button"
                className="toc__link"
                onClick={() =>
                  document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              >
                <span className="toc__num">{String(chapter.num).padStart(2, '0')}</span>
                <span>{chapter.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <div className="chapters">
        {universe.chapters.map((chapter) => (
          <article className="chapter" id={chapter.id} key={chapter.id}>
            <h2 className="chapter__title">
              <span className="chapter__num">{chapter.num}.</span> {chapter.title}
            </h2>
            <div className="chapter__rule" />
            <div className="chapter__body prose prose--justify">
              {chapter.image && (
                <img
                  className="chapter__image"
                  src={chapter.image}
                  alt={chapter.imageAlt ?? ''}
                />
              )}
              <div dangerouslySetInnerHTML={{ __html: chapter.html }} />
            </div>
          </article>
        ))}
      </div>

      <aside className="archive-note">
        <strong>Примечание архива.</strong> {universe.note}
      </aside>
    </>
  )
}
