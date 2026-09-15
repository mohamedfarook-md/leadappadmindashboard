export default function PageHeader({ title, subtitle, actions, breadcrumb }) {
  return (
    <div className="page-header">
      <div>
        {breadcrumb && <div className="page-breadcrumb">{breadcrumb}</div>}
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </div>
  );
}
