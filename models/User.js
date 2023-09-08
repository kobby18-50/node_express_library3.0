import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true, 'Please provide first name'],
        minlength : 5
    },

    lastName : {
        type : String,
        required : [true, 'Please provide last name'],
        minlength : 5
    },

    email : {
        type : String,
        required : [true, 'Please provide email'],
        unique : [true, 'This email has already been used'],
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            , 'Please provide a valid email'
        ]
    },

    password : {
        type : String,
        required : [true, 'Please provide password'],
        minlength : 8
    }


})

// hash password before saving
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// jwt token
UserSchema.methods.createJWT = function(){
    const token = jwt.sign({userId : this._id, firstName : this.firstName, lastName:this.lastName}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})
    return token

}

// get firstName
UserSchema.methods.getFirst = function(){
    return this.firstName
}

// get lastname
UserSchema.methods.getLast = function(){
    return this.lastName
}

// comparing passwords
UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}


export default mongoose.model('User', UserSchema)