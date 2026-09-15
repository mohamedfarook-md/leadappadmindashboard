export default function SearchBar({ value, onChange, placeholder = "Search…", onSubmit }) {
  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="search-icon">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </form>
  );
}
