import "./index.css"
const EachComment=(props)=>{
    const {eachDetails}=props
    const {id, name, email, body}=eachDetails
    return(
        <tr className="each-table-style">
            <td className="each-table-style">{id}</td>
            <td className="each-table-style">{name}</td>
            <td className="each-table-style">{email}</td>
            <td className="each-table-style">{body}</td>
        </tr>
    )    
}

export default EachComment