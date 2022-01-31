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
        <div>
            <div className="container-fluid min-vh-100 min-vw-100 p-0" style={{backgroundColor: 'white'}} >
                <nav className="navbar navbar-expand navbar-dark bg-primary">
                    <div className="container-fluid">
                        <ul className="navbar-nav d-flex justify-content-between w-100">
                            <li className="nav-item">
                                <a className={`nav-link fs-5 fw-bold text-center ${tab===1?'active':''}`} aria-current="page" href="/" onClick={handleTab1}>Add Users</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link fs-5 fw-bold text-center ${tab===2?'active':''}`}  aria-current="page" href="/" onClick={handleTab2}>View/Delete Users</a>
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
        </div>
    )
}

export default Home;
