import React,{ useState } from 'react';
import AddUser from "./AddUser.jsx";
import View from "./View.jsx";

const Home = () => {

    const [tab, setTab] = useState(1);
    const handleTab1 = (e) => {
        e.preventDefault();
        setTab(1);
    }
    const handleTab2 = (e) => {
        e.preventDefault();
        setTab(2);
    }

    return(
        <div className="container-fluid min-vh-100 min-vw-100 p-0" style={{backgroundColor: 'white'}} >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className={`nav-link ${tab===1?'active':''}`} aria-current="page" href="/" onClick={handleTab1}>Add Users</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${tab===2?'active':''}`}  aria-current="page" href="/" onClick={handleTab2}>View/Delete Users</a>
                        </li>
                    </ul>
                </div>
            </nav>
            {
                tab===1?
                <AddUser />
                :<View />
            }
        </div>
    )
}

export default Home;
