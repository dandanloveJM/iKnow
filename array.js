let result = [
    {
        "course": "文献信息检索与利用"
    },
    {
        "course": "多媒体技术及其应用"
    },
    {
        "course": "信息科学前沿"
    },
    {
        "course": "网站与网页设计"
    },
    {
        "course": "心理学与生活"
    },
    {
        "course": "信息安全"
    },
    {
        "course": "专业综合设计"
    },
    {
        "course": "信息安全"
    },
    {
        "course": "中外电影及经典作品赏析"
    }
]

var set = new Set(result);
var newArr = Array.from(set);

console.log(newArr)