import '../App.css';
import { Link } from "react-router-dom";
import logout_icon from "./images/logout.png";

const Header = () => {
    return (
        <div className="card bg-dark text-white border">
            <div className="card-body">
                <h1 className='text-center text-honey'>iMigrate</h1>
                <Link to="/" className='float-end mt-mins-10 mx-3' title='Logout' >
                    <img src={logout_icon} alt="logout" className='xs-icon' />
                </Link>
            </div>
        </div>
    )
}

export default Header