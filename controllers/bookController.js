import { StatusCodes } from "http-status-codes"
import Book from "../models/Book.js"
import NotFoundError from "../errors/not-Found.js"
import BadRequestError from "../errors/bad-request.js"

const getAllBooks = async (req,res) => {
    const { userId } = req.user

    const books = await Book.find({createdBy : userId})

    res.status(StatusCodes.OK).json({books, count : books.length})

    
}

const createBook = async (req,res) => {
    const { userId, firstname, lastname } = req.user

    const authorFullName = firstname.concat(' ', lastname)

    req.body.createdBy = userId

    // passing author
    req.body.author = authorFullName

    const book = await Book.create(req.body)
    res.status(StatusCodes.CREATED).json({book})
}

const getBook = async (req,res) => {
    const {  id : bookId } = req.params
    const { userId } = req.user

    const book = await Book.findOne({_id : bookId, createdBy : userId})

    if(!book){
        throw new NotFoundError(`No book with id ${bookId}`)
    }

    res.status(StatusCodes.OK).json({book})
}

const updateBook = async (req,res) => {
    const { userId } = req.user
    const {title, content, genre  } = req.body
    const { id : bookId } = req.params

    if(!title || !content || !genre){
        throw new BadRequestError('Please provide all values')
    }

    const book = await Book.findByIdAndUpdate({_id : bookId , createdBy : userId}, req.body, {runValidators:true, new:true})

    if(!book){
        throw new NotFoundError(`No book with id : ${bookId} was found`)
    }

    res.status(StatusCodes.OK).json({book})
}

const deleteBook = async (req,res) => {
    const { userId } = req.user
    const { id : bookId } = req.params

    const book = await Book.findOneAndDelete({_id : bookId, createdBy : userId})

    if (!book){
        throw new NotFoundError(`No book with id ${bookId} was found`)
    }

    res.status(StatusCodes.OK).json({msg : `Book with id ${bookId} deleted`})
}

export {getAllBooks, getBook, updateBook, deleteBook, createBook}