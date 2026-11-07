import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

export default function NotFoundPage() {
  return (
    <>
      <PageHeader title="Страница не найдена" kicker="Ошибка 404" />
      <p className="prose page-lead">
        Эта страница затерялась где-то между спутниками СамоГа. Вернитесь на главную или
        воспользуйтесь картой сайта.
      </p>
      <div className="not-found-links">
        <Link className="button-link" to="/">
          На главную
        </Link>
        <Link className="button-link button-link--ghost" to="/map">
          Карта сайта
        </Link>
      </div>
    </>
  )
}
