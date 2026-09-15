export default function EmptyState({
  title = "Nothing to show yet",
  message = "There is no data available for the current filters.",
  action,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" aria-hidden="true">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 4V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 4V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <h4>{title}</h4>
      <p>{message}</p>
      {action}
    </div>
  );
}
