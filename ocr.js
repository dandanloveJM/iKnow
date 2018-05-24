var AipOcr = require('baidu-aip-sdk').ocr;
var fs = require('fs');
var http = require('http');
var nodejieba = require("nodejieba");
nodejieba.load({
    userDict: './userdict.utf8',
});

var APP_ID = "11294546";
var API_KEY = "AWNow6tChQet4BUGehIM1us2";
var SECRET_KEY = "kspZFDzl5uqxPALPR2PNKNMwFAHO2Pfi";

var client = new AipOcr(APP_ID, API_KEY, SECRET_KEY);

var image = fs.readFileSync('./3.jpg');

var app = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
    var base64Img = new Buffer(image).toString('base64');
    client.generalBasic(base64Img).then(function (result) {
        res.end(JSON.stringify(result));
        // let words= JSON.stringify(result)
        // makeString(words.words_result)
        // jieba(words.words_result)
    });
});
function makeString(words){
    let str = '';
    for(let i = 0; i < words.length; i++){
        str += words[i].words
        str += ','
    }
    console.log(str)
}
function jieba(words){
    let result = nodejieba.extract(words, 20);
    console.log(result)
}


app.listen(8000, function () {
    console.log('listening on 8000');
});