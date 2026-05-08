function Students(props){
 return(
        <tr>
            <td>{props.name}</td>
            <td>{props.percentage}</td>
            <td>{props.result}</td>
        </tr>
 )   
}
export default Students;