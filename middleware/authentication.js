import jwt from 'jsonwebtoken'
import UnAuthorizedError from '../errors/unauthorized.js'


const auth = async (req,res,next) => {

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnAuthorizedError('You are not authorized to access this endpoint')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId : payload.userId, firstname : payload.firstName, lastname : payload.lastName}
        next()
    } catch (error) {
        throw new UnAuthorizedError('Authentication Invalid')
    }
}

export default auth