export default function PageHeader({
  title,
  kicker,
}: {
  title: string
  kicker?: string
}) {
  return (
    <header className="page-header">
      {kicker && <p className="page-kicker">{kicker}</p>}
      <h1 className="page-title">
        <span>{title}</span>
        <img src="assets/titarr.gif" alt="" width={34} height={10} aria-hidden="true" />
      </h1>
      <div className="accent-rule" />
    </header>
  )
}
