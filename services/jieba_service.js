const Tag = require('../models/mongo/tag')
const nodejieba = require("nodejieba");
nodejieba.load({
    userDict: './userdict.utf8',
});

//title: "请问李玲老师的网页课如何?"
async function getTags(title) {
    var tags = nodejieba.extract(title, 2)
    var tagArray = []
    for(let i =0; i < tags.length; i++){
        tagArray.push(tags[i].word)
    }
    var Course = await Tag.getCourse(tagArray)

    console.log(tags)
    console.log(Course)
    return {
        course: Course[0].course,
        tags: tagArray,
    }

}

module.exports = {
    getTags,
}
