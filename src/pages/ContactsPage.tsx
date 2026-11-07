import PageHeader from '../components/PageHeader'
import contacts from '../data/contacts.json'

export default function ContactsPage() {
  return (
    <>
      <PageHeader title={contacts.title} kicker="Обратная связь" />

      <p className="prose page-lead">
        Вопросы по игре, сайту и онлайновому серверу. Адреса сохранены в том виде, в каком они были
        опубликованы на официальном сайте.
      </p>

      <div className="contact-list">
        {contacts.contacts.map((contact) => (
          <a className="contact-card" href={`mailto:${contact.email}`} key={contact.email}>
            <span className="contact-card__email">{contact.email}</span>
            <span className="contact-card__text">{contact.text}</span>
          </a>
        ))}
      </div>

      <aside className="archive-note">
        <strong>Примечание архива.</strong> {contacts.note}
      </aside>
    </>
  )
}
