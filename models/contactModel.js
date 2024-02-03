const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "User"
        },
        name: {
            type: String,
            require: [true, "Please add contact name"]
        },
        email: {
            type: String,
            require: [true, "Please add email"]
        },
        phone: {
            type: String,
            require: [true, "Please add contact number"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Contact", contactSchema);