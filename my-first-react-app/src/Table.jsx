import TableRow from "./TableRow";

function Table({users, onDelete, onEdit}){
    return(
    <tbody>
        {users.map((user)=>(
            <TableRow 
                key={user.id} 
                user={user} 
                onDelete={onDelete}
                onEdit={onEdit}
            />
        ))}
    </tbody>
    )
}
export default Table;