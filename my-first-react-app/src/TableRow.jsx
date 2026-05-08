function TableRow({ user, onDelete, onEdit }) {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.company?.name}</td>
      <td>
        <button onClick={()=>onDelete(user.id)}>Delete</button>
        <button onClick={()=> onEdit(user)}>Edit</button>
      </td>
    </tr>
  );
}
export default TableRow;
