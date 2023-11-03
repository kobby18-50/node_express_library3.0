import User from '../models/User.js'
import {StatusCodes} from 'http-status-codes'
import BadRequestError from '../errors/bad-request.js'
import NotFoudError from '../errors/not-Found.js'
import UnAuthorizedError from '../errors/unauthorized.js'
import jwt from 'jsonwebtoken'

const register = async (req,res) => {

    const email = req.body.email

    const userAlreadyExits = await User.findOne({email})

    if(userAlreadyExits){
        throw new BadRequestError('User already exists create a different one with a different email')
    }

    const user = await User.create({...req.body})

   const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({
        user : {
            firstname : user.getFirst(),
            lastname : user.getLast()
        },
        token
    })

    
}

const login = async (req,res) => {
    const { email, password } = req.body

    if(!email || !password){
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({email})

    if(!user){
        throw new NotFoudError('No user found')
    }

    // compare password
    const passwordMatch = await user.comparePassword(password)

    if(!passwordMatch){
        throw new UnAuthorizedError('Invalid credentials')
    }

    // token
    const token = await user.createJWT()


    res.status(StatusCodes.ACCEPTED).json({
        user : {
            firstname : user.getFirst(),
            lastname : user.getLast()
        },

        token
    })    
  
    // res.json({email,password})
}

export {register, login}