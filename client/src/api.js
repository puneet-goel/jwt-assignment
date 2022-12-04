import axios from "axios";

const url = 'https://jwt-assignment.onrender.com';
//const url = "https://jwt-assignment.herokuapp.com";
// const url = "http://localhost:5000";

export const login = async(email, password) => {

    try{
        const user = {
            email: email,
            password: password,
        };
        
        const {data} = await axios.post(url + '/login', user);
        
        if(data.token !== ''){
            localStorage.setItem("token", data.token);
            return true;
        }else{
            return false;
        }

    }catch(err){
        console.log(err);
        return false;
    }
}

export const register = async(username, mobile, email, address) => {

    try{
        const user = {
            email: email,
            mobile: mobile,
            address: address,
            username: username
        };
        const token = localStorage.getItem('token');
        const {data} = await axios.post(url + '/add', user, {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        });

        if(data.message === "ok"){
            return true;
        }else{
            return false;
        }

    }catch(err){
        console.log(err);
        return false;
    }
}

export const fetchUsers = async() => {

    try{
        const token = localStorage.getItem('token');
        const {data} = await axios.get(url + '/get', {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        });

        return data;

    }catch(err){
        console.log(err);
        return [];
    }
}

export const deleteUser = async(id) => {

    try{
        const token = localStorage.getItem('token');
        await axios.delete(url + `/delete/${id}`, {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        });
        return true;

    }catch(err){
        console.log(err);
        return false;
    }
}

export const authenticate = async() =>  {
    try{

        const token = localStorage.getItem('token');
        if(!token){
            return false;
        }

        await axios.get(url + '/authenticate', {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        });
        return true;

    }catch(err){
        console.log(err);
        return false;
    }
}