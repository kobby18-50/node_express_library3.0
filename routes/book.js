import { getAllBooks, getBook, updateBook, deleteBook, createBook} from '../controllers/bookController.js'
import express from 'express'


const router = express.Router()

router.route('/').get(getAllBooks).post(createBook)
router.route('/:id').get(getBook).patch(updateBook).delete(deleteBook)

export default router