import TableRow from "./TableRow";

function Table({ users, onDelete, onEdit, sortConfig, handleSort }) {
  return (
    <table border="2">
      <thead>
        <tr>
          <th
            className={sortConfig.key === "name" ? "active-sort" : ""}
            onClick={() => handleSort("name")}
          >
            Name{" "}
            <span>
              {sortConfig.key === "name"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </span>
          </th>
          <th
            className={sortConfig.key === "email" ? "active-sort" : ""}
            onClick={() => handleSort("email")}
          >
            Email{" "}
            <span>
              {sortConfig.key === "email"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </span>
          </th>
          <th
            className={sortConfig.key === "company" ? "active-sort" : ""}
            onClick={() => handleSort("company.name")}
          >
            Company{" "}
            <span>
              {sortConfig.key === "company.name"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </span>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <tr>
            <td colSpan="4" className="no-results">
              No results found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
export default Table;
