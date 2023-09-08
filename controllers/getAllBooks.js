import { StatusCodes } from "http-status-codes"
import Book from "../models/Book.js"

const getAllBooks =  async (req,res) => {
   
    const books = await Book.find()

    res.status(StatusCodes.OK).json({books, count : books.length})
}

export default getAllBooks