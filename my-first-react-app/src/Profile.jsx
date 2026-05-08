function Profile({name, email, company}){
    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{company}</td>
        </tr>
    )
}

export default Profile;