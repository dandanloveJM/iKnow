var AipOcr = require('baidu-aip-sdk').ocr;
var fs = require('fs');
var http = require('http');
var nodejieba = require("nodejieba");
nodejieba.load({
    userDict: './userdict.utf8',
});

let text = [{"words":"星期一"},{"words":"星期二"},{"words":"星期三"},{"words":"星期四"},{"words":"星期五"},{"words":"多媒体技术及其"},{"words":"多媒体技术及其应用"},{"words":"第一大"},{"words":"应用"},{"words":"阮新新副教授"},{"words":"阮新新副教授"},{"words":"2,46,8,10,12,14,16(周)"},{"words":"1-16(周)"},{"words":"文澜202"},{"words":"文澜202"},{"words":"信息安全"},{"words":"信息科学前沿"},{"words":"第二大"},{"words":"刘雅琦副教授"},{"words":"叶焕倬副教授"},{"words":"节"},{"words":"1-16(周"},{"words":"1-8(周)"},{"words":"文泰114"},{"words":"文泰210"},{"words":"网站与网页设计信息科学前沿"},{"words":"专业综合设计"},{"words":"李玲讲师(高叶焕倬副教授"},{"words":"屈振新副教授"},{"words":"第三大"},{"words":"校)"},{"words":"1-8(周)"},{"words":"1-12(周)"},{"words":"节"},{"words":"1-12(周)"},{"words":"文泰110"},{"words":"梅教实验室1"},{"words":"计算机开放实验"},{"words":"室文波217"},{"words":"网站与网页设计"},{"words":"专业综合设计"},{"words":"李玲讲师(高"},{"words":"屈振新副教授"},{"words":"第四大"},{"words":"校)"},{"words":"1-12(周)"},{"words":"节"},{"words":"1-12(周)"},{"words":"梅教实验室1"},{"words":"计算机开放实验"},{"words":"室文波217"},{"words":"第五大"},{"words":"节"},{"words":"备注:"}]
let text1 = [{"words":"星期"},{"words":"星期二"},{"words":"星期三"},{"words":"星期四"},{"words":"星期五"},{"words":"星期六"},{"words":"星期日"},{"words":"T项目管理"},{"words":"会计学"},{"words":"Unx与 Linux系信息系统分析与计算机网络实务"},{"words":"沈计讲师(高"},{"words":"黄勇"},{"words":"统"},{"words":"设计"},{"words":"刘琪讲师(高校)"},{"words":"校),彭虎锋副"},{"words":"5(双周)"},{"words":"程传慧副教授余传明副教授1-810-17(周)"},{"words":"文澜401"},{"words":"1-8,10-17(单1-7,10-17(周)网络与电子商务"},{"words":"文泰115"},{"words":"实验室文波402"},{"words":"文澜106"},{"words":"创新实验室文波"},{"words":"219"},{"words":"黄勇"},{"words":"文澜40"},{"words":"计算机网络实务"},{"words":"刘琪讲师(高"},{"words":"1-8.10-17(双"},{"words":"黄勇"},{"words":"24,68.10.12,16(双网络与电子商务"},{"words":"实验室文波402"},{"words":"文澜401"},{"words":"管理学"},{"words":"信息系统分析与设计「T项目管理"},{"words":"管理学"},{"words":"会计学"},{"words":"熙峰副教授,万"},{"words":"余传明副教授"},{"words":"沈计讲师(高熊峰副教授万华"},{"words":"黄勇"},{"words":"华讲师(高校)"},{"words":"校),彭虎锋副讲师(高校)1-8.10-13,15"},{"words":"1-810-17(周)"},{"words":"文泰115"},{"words":"教授"},{"words":"1-8.10-17(单周)"},{"words":"17(周)"},{"words":"第二大文澜307"},{"words":"1-8(周)"},{"words":"文澜207"},{"words":"文澜401"},{"words":"文泰103"},{"words":"信息系统分析与设计"},{"words":"余传明副教授"},{"words":"1-810-17(周)"},{"words":"文泰115"},{"words":"劳动者权益及其Unⅸx与 Linux系统"},{"words":"保护"},{"words":"程传慧副教授"},{"words":"韩桂君副教授"},{"words":"1-8.10-17(周)"},{"words":"1-8.10-17周)创新实验室文波219"},{"words":"文澜209"},{"words":"网络编程"},{"words":"第四大"},{"words":"ava"},{"words":"金大卫教授"},{"words":"1-8(周)"},{"words":"商法与企业经营网络编程数学的奥秘:本"},{"words":"管理"},{"words":"质与思维"},{"words":"第五大"},{"words":"向前讲师(高校)金大卫教授1-8.10-17(周)"},{"words":"1-8.10-17(周)1-8(周)"},{"words":"文澜111"},{"words":"计算机开放实验"},{"words":"备注"}]
let text2 = [{"words":"星期"},{"words":"星期二"},{"words":"星期三"},{"words":"星期四"},{"words":"星期五"},{"words":"多媒体技术及其"},{"words":"多媒体技术及其应用"},{"words":"应用"},{"words":"阮新新副教授"},{"words":"阮新新副教授"},{"words":"2,46,8,10,12,14,16(周)"},{"words":"1-16(周)"},{"words":"文澜202"},{"words":"文澜202"},{"words":"信息安全"},{"words":"心理学与生活"},{"words":"信息科学前沿"},{"words":"刘雅琦副教授康丽婷助教(高"},{"words":"叶焕倬副教授"},{"words":"1-16(周)"},{"words":"校)"},{"words":"1-8(周)"},{"words":"文泰114"},{"words":"1-16(周"},{"words":"文泰210"},{"words":"文波305"},{"words":"网站与网页设计信息科学前沿"},{"words":"专业综合设计"},{"words":"李玲讲师(高叶焕倬副教授"},{"words":"屈振新副教授"},{"words":"校)"},{"words":"1-8(周)"},{"words":"1-12(周)"},{"words":"1-12(周)"},{"words":"文泰110"},{"words":"梅教实验室1"},{"words":"计算机开放实验"},{"words":"室文波217"},{"words":"网站与网页设计"},{"words":"专业综合设计"},{"words":"李玲讲师(高"},{"words":"屈振新副教授"},{"words":"校)"},{"words":"1-12(周)"},{"words":"1-12(周"},{"words":"梅教实验室1"},{"words":"计算机开放实验"},{"words":"室文波217"},{"words":"中外电影及经典文献信息检索与"},{"words":"作品赏析"},{"words":"利用"},{"words":"高婷讲师(高"},{"words":"徐菊香"},{"words":"校)"},{"words":"1-8(周)"},{"words":"1-16(周)"},{"words":"文泰319"},{"words":"文泰321"}]
function makeString(words){
    let str = '';
    for(let i = 0; i < words.length; i++){
        if( (words[i].words).indexOf('副') === -1 && (words[i].words).indexOf('讲') === -1 && (words[i].words).indexOf('文') === -1 && (words[i].words).indexOf('1') === -1 && (words[i].words).indexOf('星') === -1 && (words[i].words).indexOf('第') === -1 ){
            str += words[i].words
            str += ','
        }
       
    }
    console.log(str)
    return str
}

function jieba(words){
    let result = nodejieba.extract(words, 30);
    console.log('result')
    console.log(result)
}


let str = makeString(text2)
jieba(str)
