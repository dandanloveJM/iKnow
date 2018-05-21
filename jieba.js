var nodejieba = require("nodejieba");
nodejieba.load({
    userDict: './userdict.utf8',
  });
var result = nodejieba.cut("请问信息检索这门课怎么样?");
console.log(result);

result = nodejieba.extract("请问信息检索这门课怎么样?", 2);
console.log(result);

result = nodejieba.extract("请问李玲老师的网页课如何?", 2);
console.log(result);
