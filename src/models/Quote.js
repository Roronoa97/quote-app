const mongoose = require('mongoose');

const QuoteSchema = mongoose.Schema({
    quoteBody:{
        type: String, 
        required: true
    },
    quoteBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},{ timestamps: true });

module.exports = mongoose.model('quotes', QuoteSchema);