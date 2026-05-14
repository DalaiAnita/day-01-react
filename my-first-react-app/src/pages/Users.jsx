import { useEffect, useState } from "react";
import "./Users.css";
import SearchBar from "./../components/SearchBar";
import Table from "./../components/Table";
import TableRow from "./../components/TableRow";
import { FaUserPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";


function Users(){

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
  const [error, setError] = useState(false);
  const [text, setText] = useState("");
//   const [searchInputText, setSearchInputText] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");


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


  useEffect(() => {
    console.log("Text changed");

    return () => {
      console.log("Cleanup");
    };
  }, [text]);

//debounce search
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebounceSearch(search);
    },500);

    return ()=>{
      clearTimeout(timer)
    }
  },[search]);

  
//Debounce filterring data

const searchText = debounceSearch.toLowerCase();
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
      <h2>User Management</h2>
      <p className="subtitle">Manage and organize your user efficiently.</p>
      <div className="toolbar">
        <div className="search-group">
          <SearchBar search={search} setSearch={setSearch} />
          <button className="reset-btn" onClick={() => setSearch("")}>
            Reset
          </button>
        </div>

        <div className="from-card">
          <h5 className="section-title">
            <FaUserPlus />
            Add New user
          </h5>
          <div className="form-grid">
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={editUserId ? editData.name : newUser.name}
                onChange={(e) =>
                  editUserId
                    ? setEditData({ ...editData, name: e.target.value })
                    : setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter email address"
                value={editUserId ? editData.email : newUser.email}
                onChange={(e) =>
                  editUserId
                    ? setEditData({ ...editData, email: e.target.value })
                    : setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>

            <div className="input-group">
              <label>Company Name</label>
              <input
                type="text"
                placeholder="Enter company name"
                value={editUserId ? editData.company : newUser.company}
                onChange={(e) =>
                  editUserId
                    ? setEditData({ ...editData, company: e.target.value })
                    : setNewUser({ ...newUser, company: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="message-section">
          <div className="input-group">
            <label>Message(Optional)</label>
            <input type="text" placeholder="Enter your message" />
          </div>
          <div className="input-group textarea-box">
            <label>Additional Note(Optional)</label>
            <textarea
              rows="3"
              placeholder="Enter your message here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <p>Characters: {text.length}</p>
          </div>
        </div>
        
        <div className="button-group">
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
        <h5 className="section-title">
          <FaUsers />
          User List
        </h5>
        <Table
            users={sortedUsers}
            onDelete={handleDelete}
            onEdit={handleEdit}
            sortConfig={sortConfig}
            handleSort={handleSort}
          />
      </div>
    </div>
    )
}

export default Users;