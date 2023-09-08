import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Book title is required'],
        minlength : 8,
        unique : [true, 'Book title has already been used']
    },

    content : {
        type : String,
        required : [true, 'Book content is required'],
        minlength : 40,
    },

    genre : {
        type : String,
        enum : ['fiction','folktales', 'science', 'african culture', 'short stories', 'poems'],
        required : [true, 'Genre cannot be empty']
    },

    author : {
        type : String,
        required : [true, 'Please provide author']
    },

    year : {
        type : Date,
        default : Date.now()
    },

    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : [true, 'Please provide user']
    }
}, {timestamps : true})

export default mongoose.model('Book', BookSchema)