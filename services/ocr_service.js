const Tag = require('../models/mongo/tag')
const nodejieba = require("nodejieba");
var AipOcr = require('baidu-aip-sdk').ocr;
var fs = require('fs');
var http = require('http');
nodejieba.load({
    userDict: './userdict.utf8',
});

var APP_ID = "11294546";
var API_KEY = "AWNow6tChQet4BUGehIM1us2";
var SECRET_KEY = "kspZFDzl5uqxPALPR2PNKNMwFAHO2Pfi";

var client = new AipOcr(APP_ID, API_KEY, SECRET_KEY);

function callback(result) {
    console.log('result11')
    console.log(result)
    //makeString
    let str = '';
    result.words_result.forEach(function (item) {
        str += item.words
        str += ','
    })

    console.log('str')
    console.log(str)
    //结巴解析关键字
    let words = nodejieba.extract(str, 30);
    var tagArray = []
    for (let i = 0; i < words.length; i++) {
        tagArray.push(words[i].word)
    }
    console.log('tagAA')
    console.log(tagArray)
        (async () => {
            var Course = await Tag.getCourse(tagArray)
            console.log(Course)
            return {
                course: Course,

            }
        })()
        .then(r => {
            res.json(r)
        })
        .catch(e => {
            console.log(e)
            next(e)
        })

}


async function ocr(imgSrc) {
    //传入图片
    //var image = fs.readFileSync(imgSrc);
    //var base64Img = new Buffer(image).toString('base64');
    let result = client.generalBasicUrl(imgSrc)
        .then(function (result) {
            //let result1 = JSON.stringify(result)
            // callback(JSON.stringify(result).words_result)
            return new Promise((rl, rj) => {
              
                rl(JSON.stringify(result))
            })
            // let words = result1.words_result
            // console.log('word-------')
            // console.log(words)
            // return result1
        })
        // .then(function(data){
        //     console.log('-------')
        //     console.log(data)
        // })

        .catch(function (err) {
            // 如果发生网络错误
            console.log(err);
        });

    let result2 = result.then(function (data) {
        
        data = JSON.parse(data)
        return new Promise((rl, rj) => {
         
            rl(data.words_result)
        })


    })
        .catch(function (err) {
            // 如果发生网络错误
            console.log(err);
        });

    let result3 = result2.then(words => {
        let str = '';
        for (let i = 0; i < words.length; i++) {
            if ((words[i].words).indexOf('副') === -1 && (words[i].words).indexOf('讲') === -1 && (words[i].words).indexOf('文') === -1 && (words[i].words).indexOf('1') === -1 && (words[i].words).indexOf('星') === -1 && (words[i].words).indexOf('第') === -1) {
                str += words[i].words
                str += ','
            }

        }
        return new Promise((rl, rj) => {
            rl(str)
        })

    })
        .catch(function (err) {
            // 如果发生网络错误
            console.log(err);
        });

    let result4 = result3.then(str => {
        let words = nodejieba.extract(str, 30);
        var tagArray = []
        for (let i = 0; i < words.length; i++) {
            tagArray.push(words[i].word)
        }
      
        return new Promise((rl, rj) => {
            rl(tagArray)
        })
    })
        .catch(function (err) {
            // 如果发生网络错误
            console.log(err);
        });

    return result5 = result4.then(tagArray => {


       return Tag.getCourse(tagArray)
          
            .catch(function (err) {
                // 如果发生网络错误
                console.log(err);
            });
           
        


    })
        .catch(function (err) {
            // 如果发生网络错误
            console.log(err);
        });
}



module.exports = {
    ocr,
}