import { StatusCodes } from "http-status-codes"
import Book from "../models/Book.js"

const getAllBooks =  async (req,res) => {
   
    const books = await Book.find().sort("-updatedAt")

    res.status(StatusCodes.OK).json({books, count : books.length})
}


const getBook = async (req,res) => {
    const {id : bookID} = req.params

    const book = await Book.findOne({_id : bookID })

    res.status(StatusCodes.ACCEPTED).json({book})
}

export  {getAllBooks, getBook}