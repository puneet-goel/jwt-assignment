import React,{ useState, useEffect } from 'react';
import {fetchUsers, deleteUser} from "../../api";

const View = () => {

    const [entries, setEntries] = useState([]);

    useEffect( () => {
        (async () => {
            const x = await fetchUsers();
            setEntries(x);
        })()
    },[]);

    const deleteRow = async(id) => {
        const isdelete = await deleteUser(id);
        if(isdelete){
            setEntries((entry) => entry.filter(cur => cur._id!==id));
        }       
    }

    return(
        <div className="container-fluid p-3" >
            <table className="table table-striped table-hover text-center">
                <thead >
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        entries.map((cur, index) => 
                            <tr key={cur._id}>
                                <th scope="row">{index+1}</th>
                                <td>{cur.username}</td>
                                <td>{cur.mobile}</td>
                                <td>{cur.email}</td>
                                <td>{cur.address}</td>
                                <td><i className="bi bi-trash text-danger" onClick={() => deleteRow(cur._id)}></i></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default View;