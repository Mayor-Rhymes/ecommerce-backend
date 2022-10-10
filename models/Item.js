const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true
    },

    brand: { 

        type: String,
        required: true
    },

    model: { 

        type: String,
        required: true
    },

    category: { 

        type: String,
        required: true
    },

    price: { 

        type: Number,
        required: true,
    }

}, {timestamps: true})



module.exports = mongoose.model("Item", itemSchema);

