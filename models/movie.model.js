import mongoose from 'mongoose';


const movieSchema = new mongoose.Schema({
    releaseYear:{
        type: Number
    },
    Title: {
        type: String
    },
    Director:{
        type: String,
        default: 'unknown'
    },
    Cast: {
        type: String,
        default: ''
    },
    Genre: {
        type: String,
        default: 'unknown'
    },
    Wiki: {
        type:String,
        default: ''
    },
    Plot:{
        type: String,
        default: ''
    },
    embedding: []

})

const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema) ;
export default Movie;