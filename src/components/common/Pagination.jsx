export default function Pagination({ page, totalPages, onPageChange, totalItems, pageSize }) {
  if (!totalPages || totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pages = [];
  const maxButtons = 5;
  let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }
  for (let i = startPage; i <= endPage; i++) pages.push(i);

  return (
    <div className="pagination">
      <span className="pagination-summary">
        Showing {start}–{end} of {totalItems}
      </span>
      <div className="pagination-controls">
        <button
          type="button"
          className="pagination-btn"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            className={`pagination-btn ${p === page ? "active" : ""}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          className="pagination-btn"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
