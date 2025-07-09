import "./index.css"
import {Link} from "react-router-dom"
const Header=(props)=>{
    const {view,onClickView}=props
    const onClickButton=()=>{
        onClickView()
    }
    const answer=view?"profile":""
    return(
        <nav className="nav-container">
            <img src="https://cdn.prod.website-files.com/6509887b9119507025235a5a/650ada40fd6cf3427547c9d8_Swift%20logo.svg" alt="logo" className="nav-logo"/>
            <Link className="link-style" to={`/${answer}`}>            
                <button className="nav-button" onClick={onClickButton}>
                    {view?"View Profile":"Dashboard"}
                </button>
            </Link>
        </nav>
    )
}
export default Header