function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by name.."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  );
}
export default SearchBar;
