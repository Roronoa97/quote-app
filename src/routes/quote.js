const express = require('express');
const router = express.Router();
const authToken = require('./authToken');

const User = require('../models/User');
const Quote = require('../models/Quote');

router.get('/', authToken, async function(req, res){

    let filterId = [];
    let filterQuotes = [];

    try{
        //display Following id
        const user = await User.findById(req.user.id);
        const userId = user._id;
        const followingId = user.following;

        filterId.push(userId);
        followingId.map(function(fid){
            filterId.push(fid);
        })

        try{
        
            const quotes = await Quote.find();
        
            filterId.forEach(function(fid, index){
                quotes.forEach(function(quote){
                    // use equals() method to compare between _id of mongoDb
                    if(quote.quoteBy.equals(fid)){
                        filterQuotes.push(quote);
                    }
                })
            })

            res.json(filterQuotes);

        }catch(err){
            res.json(err)
        }
        
    }catch(err){
        res.json(err)
    }
    
    
})

router.post('/post', async function(req, res){
    try{
        const quote = new Quote({
            quoteBody: req.body.quoteBody,
            quoteBy: req.body.quoteBy
        });

        const quoteId = await quote.save();

        await User.findOneAndUpdate(
            {_id: req.body.quoteBy},
            {$push: {quoteList: quoteId._id} },
            {useFindAndModify: false}
        )

        res.json(quote);

    }catch(err){
        res.json(err);
    }
})

module.exports = router;