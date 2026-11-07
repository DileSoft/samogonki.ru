import PageHeader from '../components/PageHeader'
import forum from '../data/forum.json'

export default function ForumPage() {
  return (
    <>
      <PageHeader title={forum.title} kicker="Обсуждения" />
      <p className="prose page-lead">{forum.lead}</p>

      <aside className="archive-note">
        <strong>Архив.</strong> {forum.notice}
      </aside>

      <div className="forum-table" role="table" aria-label="Темы форума">
        <div className="forum-table__head" role="row">
          <span role="columnheader">Тема</span>
          <span role="columnheader">Автор</span>
          <span role="columnheader">Ответов</span>
          <span role="columnheader">Дата</span>
        </div>
        {forum.topics.map((topic) => (
          <div className="forum-table__row" role="row" key={topic.title}>
            <span className="forum-table__topic" role="cell">
              {topic.title}
            </span>
            <span role="cell">{topic.author}</span>
            <span role="cell">{topic.replies}</span>
            <span role="cell">{topic.date}</span>
          </div>
        ))}
      </div>

      <a className="button-link" href={forum.archiveHref} target="_blank" rel="noreferrer noopener">
        Открыть архив форума
      </a>
    </>
  )
}
