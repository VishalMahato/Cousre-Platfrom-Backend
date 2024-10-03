const { Schema } = require("mongoose");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email :{
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        index: true,
    }, 
    passwordHash: {
        type: String,
        required: true,
        trim: true,
        select: false,
    },
    type: {
        type: String,
        enum: ['admin', 'Creator', 'student'],
        required: true,
        trim: true
    },
    coursesOwned: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

module.exports= {
    userSchema
}