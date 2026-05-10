import { useEffect, useState } from "react";
import "./App.css";
import Profile from "./Profile";
import Students from "./Students";
import SearchBar from "./SearchBar";
import Table from "./Table";
function App() {

  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  }); //Sorting functionality "asc" to "desc" or "desc" to "asc"
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    company:""
  });
  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const[error, setError] = useState(false);




  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((result) => result.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(()=>{
        setError(true);
        setLoading(false);
      });
  }, []);


const searchText = search.toLowerCase();
  const filteredUser = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText) ||
      user.company?.name?.toLowerCase().includes(searchText),
  );


  function handleSort(key) {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }


  const sortedUsers = [...filteredUser].sort((a, b) => {
    const { key, direction } = sortConfig;

    let result;

    if (key === "company") {
      result = a.company.name.localeCompare(b.company.name);
    } else if (typeof a[key] === "string") {
      result = a[key].localeCompare(b[key]);
    } else {
      result = a[key] - b[key];
    }
    return direction === "asc" ? result : -result;
  });


  function handleAdd(){
    if(!newUser.name.trim() || !newUser.email.trim() || !newUser.company.trim()){
      alert("Please fill all the fields");
      return;
    }
    setUsers( prev => [
      ...prev,
      {
        id: Date.now(),
        name: newUser.name,
        email: newUser.email,
        company: {name: newUser.company}
      }
    ]);
    setNewUser({name: "", email: "", company: ""})
  }


  function handleEdit(user){
    setEditUserId(user.id);

    setEditData({
      name: user.name,
      email: user.email,
      company: user.company.name
    })
  }

  function handleUpdate(){
    setUsers(prev =>
      prev.map(user=>
        user.id == editUserId 
          ? {
            ...user,
            name: editData.name,
            email: editData.email,
            company: {name: editData.company}
          } : user
      )
    );
    setEditUserId(null);
    setEditData({
      name: "",
      email: "",
      company: ""
    });
  }

  function handleDelete(id){
    setUsers(users.filter((user)=>user.id !== id));
  }
  if (loading) {
    return <h2>Loading...</h2>;
  }


  if (error) {
    return <h2>⚠️ Failed to load users. Please try again.</h2>;
  }



  return (
    <div className="container">
      <h1>User Management</h1>
      <div className="toolbar">
        <div className="search-group">
          <SearchBar search={search} setSearch={setSearch} />
          <button className="reset-btn" onClick={() => setSearch("")}>
            Reset
          </button>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={editUserId ? editData.name : newUser.name}
            onChange={(e) =>
              editUserId
                ? setEditData({ ...editData, name: e.target.value })
                : setNewUser({ ...newUser, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Email"
            value={editUserId ? editData.email : newUser.email}
            onChange={(e) =>
              editUserId
                ? setEditData({ ...editData, email: e.target.value })
                : setNewUser({ ...newUser, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Company Name"
            value={editUserId ? editData.company : newUser.company}
            onChange={(e) =>
              editUserId
                ? setEditData({ ...editData, company: e.target.value })
                : setNewUser({ ...newUser, company: e.target.value })
            }
          />
          <button
            className="add-btn"
            onClick={editUserId ? handleUpdate : handleAdd}
          >
            {editUserId ? "Update User" : "Add User"}
          </button>
          <button
            className="reset-btn"
            onClick={() => {
              if (editUserId) {
                setEditData({
                  name: "",
                  email: "",
                  company: "",
                });
                setEditUserId(null);
              } else {
                setNewUser({
                  name: "",
                  email: "",
                  company: "",
                });
              }
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="table-container">
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
          {/* <tbody>
          {sortedUsers.length === 0 ? (
            <tr>
              <td colSpan="3"> No results found.</td>
            </tr>
          ) : (
            sortedUsers.map((user, index) => (
              <Profile
                key={index}
                name={user.name}
                email={user.email}
                company={user.company.name}
              />
            ))
          )}
        </tbody> */}
          <Table
            users={sortedUsers}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </table>
      </div>
    </div>
  );
}

export default App;
