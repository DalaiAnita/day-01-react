function SearchBar({ search, setSearch }) {
  return (
    <input
      className="search-bar" 
      type="text"
      placeholder="Search by name, email or company.."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  );
}
export default SearchBar;
