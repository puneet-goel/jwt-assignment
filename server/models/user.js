import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
	username: { 
		type: String, 
		required: true, 
		unique: true 
	},
	email: { 
		type: String, 
		required: true, 
		unique: true 
	},
	mobile: { 
		type: String, 
		required: true 
	},
	address: { 
		type: String, 
		required: true 
	}
}, { collection: 'users' });

const User = mongoose.model('User', UserSchema);

export default User;