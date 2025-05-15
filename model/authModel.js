const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: Number,
		default: 0
	}
}, { timestamps: true })


const hashPassword = async (password) => {
		const salt = 10
		const hashedPassword = await bcrypt.hash(password, salt)
		return hashedPassword
}
const matchPassword = async (password, hashedPassword) => {
	return bcrypt.compare(password, hashedPassword)
}
const userModel = mongoose.model("users", userSchema);

module.exports = {userModel,hashPassword, matchPassword}