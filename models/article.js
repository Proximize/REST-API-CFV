const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    tags:{
        type: String
    },
    publishDate:{
        type: Date,
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    },
    highlight:{         //if frontpage worthy, could be emplemented based on number (etc. 1 = front page, 0 = normal)
        type: Number,
        //required:true
    },
    author:{
        type: String
    },
    content:{
        type: String
    }/*,
    coverImage:{
        type: String
    },
    coverImageType:{
        type: String
    },*/
    
})

/*
ArticleSchema

title		String

tags		String

publishDate	Date

createdAt	Date

author		String

content		String

coverImage	String

coverImageType	String

*/

/*
this converts the image to base64
articleSchema.virtual('coverImagePath').get(function() {
    if (this.coverImage != null && this.coverImageType != null) {
      return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
  })


schemaname is the name of the schema in the database without 's'
model (schemaname,actualschema)                             */
module.exports = mongoose.model('Article', articleSchema)