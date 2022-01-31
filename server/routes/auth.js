import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import mongoose from "mongoose";

const router = express.Router();

const authorize = async(req,res,next) => {

    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.sendStatus(403);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {exp} = decoded;

        if (Date.now() >= exp * 1000) {
            return res.sendStatus(403);
        }

        next();
        
    }catch(err){
        return res.sendStatus(401);
    }
}

router.post("/login",async(req,res) => {

    try{
        
        const { email, password } = req.body;

        if(process.env.adminPassword !== password || process.env.adminEmail !== email) {
            return res.status(401).json({ message: 'not authenticated', token: '' });
        }        

        const token = jwt.sign({
                email: email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '300s', 
            }
        );
        
        return res.status(200).json({ message: 'Authenticated', token: token });
        
    }catch(err){
        res.status(500).json({ message: err.message, token: ''});
    }
});

router.get('/authenticate', (req,res) => {
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.sendStatus(403);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {exp} = decoded;

        if (Date.now() >= exp * 1000) {
            return res.json('Token expired').sendStatus(403);
        }

        return res.sendStatus(201);
        
    }catch(err){
        return res.sendStatus(401);
    }
});

router.get("/get", authorize, async(req,res) => {
    
    try{
        const users = await User.find();
        res.status(201).json(users);
    
    }catch (error) {
        res.status(404).json({ message: error.message});
    }
});

router.post("/add", authorize, async(req,res) => {
    
    try{
        
        const {username, mobile, email, address} = req.body;
        await User.create({ 
            username: username,
            mobile: mobile,
            email: email, 
            address: address
        });

        res.status(201).json({ message: "ok"});
    
    }catch (error) {
        if (error.code === 11000) {
			// duplicate key
            return res.json({ message: 'Username/Email already exists'});
		} 
        res.status(500).json({ message: error.message});
    }
});

router.delete("/delete/:id", authorize, async(req,res) => {
    
    try{
        const { id: _id } = req.params;

		if(!mongoose.Types.ObjectId.isValid(_id)){
			return res.status(404).send("No post with that id");
		}

		await User.findByIdAndRemove(_id);
		res.status(204).json({message: "Post Deleted successfully!!"});
    
    }catch (error) {
        res.status(409).json({message: error.message});
    }
});

export default router;