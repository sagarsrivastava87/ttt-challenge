var express = require('express');
var router = express.Router({ mergeParams : true });
const http = require('http');
const axios = require('axios');
const _ = require('lodash');

router.get('/', function(req, res, next) {res.render('index', { title: 'ttt-challenge' });});

router.post('/', async function(req, res, next) {
    let url = 'http://terriblytinytales.com/test.txt';
    let regex = /[0-9a-zA-Z]/;
    try{
        var recordsToFetch = (req.body.recordsToFetch)?parseInt(req.body.recordsToFetch):0;
        if(recordsToFetch>0){
            var resp = await axios.get(url);
            if((resp.data) && resp.data!=""){
                /*-------------- Parsing Logic : Start --------------*/
                var docArr = resp.data.replace(/\.*[\?\!\,\;\(\)\<\>\"\{\}\[\]\s\t\n\r]+/g,' ').replace(/[ ]*[\'][^a-zA-Z0-9]*/g, ' ').toLowerCase().split(" "); //Sanitizing input & splitting into array of words;
                docArr = _.countBy(_.filter(docArr,elem=>regex.test(elem.trim())), _.identity); //Generating frequencies of legitimate words;
                docArr = _.orderBy(_.map(_(docArr).toPairs().value(),(n)=>{return {'word':n[0],'frequency':n[1]}}), ['frequency', 'word'],['desc','asc']); //Mapping frequencies into individual objects & sorting array of such objects by frequency followed by word
                /*-------------- Parsing Logic : End ----------------*/
                var count = docArr.length;
                docArr = _.take(docArr, recordsToFetch);
                res.json({error:{code:200,message:"Data fetched successfully"},data:{list:docArr,count:{total:count,fetched:docArr.length}}});
            }else{
                res.status(500).json({error:{code:500,message:"Unable to fetch source data from terriblytinytales."},data:{}});
            }
        }else{
            res.status(400).json({error:{code:400,message:"Invalid input parameters supplied. Please enter a valid value for the number of records to fetch."},data:{}});
        }
    }catch(err){
        res.status(500).json({error:{code:500,message:"Oops! Something went wrong while executing the operation."},data:{}});
    }
});

module.exports = router;
