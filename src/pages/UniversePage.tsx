import PageHeader from '../components/PageHeader'
import universe from '../data/universe.json'

const additionIds = ['addition-a', 'addition-b']
const additionLabels = ['А', 'Б']

export default function UniversePage() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

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
                onClick={() => scrollTo(chapter.id)}
              >
                <span className="toc__num">{String(chapter.num).padStart(2, '0')}</span>
                <span>{chapter.title}</span>
              </button>
            </li>
          ))}
          {universe.additions.map((addition, index) => (
            <li key={addition.title}>
              <button
                type="button"
                className="toc__link"
                onClick={() => scrollTo(additionIds[index])}
              >
                <span className="toc__num">{additionLabels[index]}</span>
                <span>{addition.title}</span>
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
                <img className="chapter__image" src={chapter.image} alt={chapter.title} />
              )}
              <div dangerouslySetInnerHTML={{ __html: chapter.html }} />
            </div>
          </article>
        ))}
      </div>

      <section className="additions" aria-labelledby="additions-title">
        <h2 id="additions-title" className="section-title section-title--spaced">
          <span>Дополнения</span>
          <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
        </h2>
        <div className="accent-rule" />

        {universe.additions.map((addition, index) => (
          <article className="chapter" id={additionIds[index]} key={addition.title}>
            <h2 className="chapter__title">
              <span className="chapter__num">{additionLabels[index]}.</span> {addition.title}
            </h2>
            <div className="chapter__rule" />
            <div
              className="chapter__body prose prose--justify"
              dangerouslySetInnerHTML={{ __html: addition.html }}
            />
            <a
              className="text-link"
              href={addition.archiveUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Архивная страница дополнения ↗
            </a>
          </article>
        ))}
      </section>

      <aside className="archive-note">
        <strong>Примечание архива.</strong> {universe.note}{' '}
        <a href={universe.source} target="_blank" rel="noreferrer noopener">
          Исходная страница в Wayback Machine ↗
        </a>
      </aside>
    </>
  )
}
