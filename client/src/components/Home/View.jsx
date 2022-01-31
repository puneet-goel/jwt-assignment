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
            <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered text-center">
                    <thead className="table-dark">
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
                                    <th className="align-middle" scope="row">{index+1}</th>
                                    <td className="align-middle">{cur.username}</td>
                                    <td className="align-middle">{cur.mobile}</td>
                                    <td className="align-middle">{cur.email}</td>
                                    <td className="align-middle">{cur.address}</td>
                                    <td className="align-middle"><i className="bi bi-trash bi-2x text-danger" style={{cursor: 'pointer'}} onClick={() => deleteRow(cur._id)}></i></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default View;