const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
	courseName: {
		type: String,
		index: true,
		required: [true, "Name is required"],
        trim: true
	},
	creatorId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
		index: true,
	},
	courseDescription: {
		type: String,
        required:true,
	},
    coursePrice: {
        type: Number,
        required:true
    }


},{
    timestamps: true,
});


courseSchema.statics.findByCreatorId = async function(creatorId) {
    return await this.find({ creatorId });
};

// Instance Method: Apply discount to the course price
courseSchema.methods.applyDiscount = function(discountPercentage) {
    if (discountPercentage > 0 && discountPercentage <= 100) {
        this.coursePrice = this.coursePrice - (this.coursePrice * (discountPercentage / 100));
    }
    return this.coursePrice;
};