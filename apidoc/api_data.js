define({ "api": [
  {
    "type": "GET",
    "url": "/course",
    "title": "get student course by userId",
    "name": "get_course",
    "group": "Course",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>bearer <code>token</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Authorization\" : \"bearer `token`\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>0 represents &quot;successful repsonse&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "userId",
            "description": "<p>userId</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "courses",
            "description": "<p>include coursename and teacher</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"code\": 0,\n   \"userId\": \"5abe3f7969c9d9111be87ef6\",\n   \"courses\": [\n       {\n           \"course\": \"多媒体技术及其应用\",\n           \"teacher\": \"阮新新\"\n       },\n       {\n           \"course\": \"信息安全\",\n           \"teacher\": \"刘雅琦\"\n       },\n       {\n            \"course\": \"信息科学前沿\",\n           \"teacher\": \"叶焕倬\"\n       },\n       {\n           \"course\": \"网站与网页设计\",\n           \"teacher\": \"李玲\"\n       },\n       {\n            \"course\": \"专业综合设计\",\n           \"teacher\": \"屈振新\"\n        }\n       ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ErrorUploadAvatar",
            "description": "<p>Error uploading course</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"something wrong when upload course\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/course.js",
    "groupTitle": "Course"
  },
  {
    "type": "POST",
    "url": "/course",
    "title": "upload course",
    "name": "upload_course",
    "group": "Course",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "file",
            "description": "<p>user's course</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>bearer <code>token</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Content-Type\": \"multipart/form-data\",\n   \"Authorization\" : \"bearer `token`\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>0 represents &quot;successful repsonse&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "userId",
            "description": "<p>userId</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "courses",
            "description": "<p>include coursename and teacher</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"code\": 0,\n   \"userId\": \"5abe3f7969c9d9111be87ef6\",\n   \"courses\": [\n       {\n           \"course\": \"多媒体技术及其应用\",\n           \"teacher\": \"阮新新\"\n       },\n       {\n           \"course\": \"信息安全\",\n           \"teacher\": \"刘雅琦\"\n       },\n       {\n            \"course\": \"信息科学前沿\",\n           \"teacher\": \"叶焕倬\"\n       },\n       {\n           \"course\": \"网站与网页设计\",\n           \"teacher\": \"李玲\"\n       },\n       {\n            \"course\": \"专业综合设计\",\n           \"teacher\": \"屈振新\"\n        }\n       ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ErrorUploadAvatar",
            "description": "<p>Error uploading course</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"something wrong when upload course\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/course.js",
    "groupTitle": "Course"
  },
  {
    "type": "POST",
    "url": "/login",
    "title": "Login",
    "name": "Login",
    "group": "Index",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Stirng",
            "optional": false,
            "field": "email",
            "description": "<p>user's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>user's password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>user info</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token for user to authorization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"0\",\n  \"data\": {\n     \"user\": {\n         \"_id\": \"5abe3f7969c9d9111be87ef6\",\n         \"name\": \"dx\",\n         \"email\": \"123@qq.com\"\n     },\n     \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJlM2Y3OTY5YzlkOTExMWJlODdlZjYiLCJpYXQiOjE1MjI0MjgwMzQ0NDUsImV4cGlyZSI6MTUyMjUxNDQzNDQ0NX0.C-F4CFj4Ef447q7jzcfs4qFTfg8ZhX0d4tfXl3PpWy0\"\n   }\n  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ErrorLogin",
            "description": "<p>Error when login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Error when login\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Index"
  },
  {
    "type": "get",
    "url": "/msg",
    "title": "Get User Received Msg",
    "name": "GetUserMsg",
    "group": "Msg",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>bearer <code>token</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Authorization\" : \"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJlM2Y3OTY5YzlkOTExMWJlODdlZjYiLCJpYXQiOjE1MjU0MTU2MzIwNTQsImV4cGlyZSI6MTUyNTUwMjAzMjA1NH0.kafI-1f8ocvF-AjABkPvkknLq7l2tKKAm7plGViHDD4\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>0-success</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "msgs",
            "description": "<p>user received msgs</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 0,\n   \"msgs\": [\n   {\n      \"_id\": \"5aec014ec3c03a421183901f\",\n      \"from\": \"5abe460346771c6bf8069a19\",\n      \"to\": \"5abe460346771c6bf8069a19\",\n      \"content\": \"5aec014ec3c03a421183901e;this is a question about how to find paper\",\n      \"type\": \"sys\",\n      \"__v\": 0,\n      \"createTime\": 1525415101600\n    }\n]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/msg.js",
    "groupTitle": "Msg"
  },
  {
    "type": "POST",
    "url": "/msg",
    "title": "send msg to user",
    "name": "SendUserMsg",
    "group": "Msg",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>bearer <code>token</code></p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Content-Type\": \"application/x-www-form-urlencoded\"\n   \"Authorization\" : \"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJlM2Y3OTY5YzlkOTExMWJlODdlZjYiLCJpYXQiOjE1MjU0MTU2MzIwNTQsImV4cGlyZSI6MTUyNTUwMjAzMjA1NH0.kafI-1f8ocvF-AjABkPvkknLq7l2tKKAm7plGViHDD4\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>0-success</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "msg",
            "description": "<p>user send the  msg</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 0,\n   \"msg\":\n   {\n      \"_id\": \"5aec014ec3c03a421183901f\",\n      \"from\": \"5abe460346771c6bf8069a19\",\n      \"to\": \"5abe460346771c6bf8069a19\",\n      \"content\": \"5aec014ec3c03a421183901e;this is a question about how to find paper\",\n      \"type\": \"user\",\n      \"__v\": 0,\n      \"createTime\": 1525415101600\n    }\n\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/msg.js",
    "groupTitle": "Msg"
  },
  {
    "type": "GET",
    "url": "/topic/:topicId/:replyId/dislike",
    "title": "user dislike a reply",
    "name": "DisikeAReply",
    "group": "Topic",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>0 represents &quot;successful repsonse&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"0\",     \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ErrorCreateUser",
            "description": "<p>Error get topic</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/topic.js",
    "groupTitle": "Topic"
  },
  {
    "type": "GET",
    "url": "/topic/:topicId/dislike",
    "title": "user dislike a topic",
    "name": "DislikeATopic",
    "group": "Topic",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>0 represents &quot;successful repsonse&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"0\",     \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ErrorCreateUser",
            "description": "<p>Error get topic</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/topic.js",
    "groupTitle": "Topic"
  },
  {
    "type": "GET",
    "url": "/topic/:topicId/:replyId/like",
    "title": "user like a reply",
    "name": "LikeAReply",
    "group": "Topic",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>0 represents &quot;successful repsonse&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"0\",     \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ErrorCreateUser",
            "description": "<p>Error get topic</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/topic.js",
    "groupTitle": "Topic"
  },
  {
    "type": "GET",
    "url": "/topic/:topicId/like",
    "title": "user like a topic",
    "name": "LikeATopic",
    "group": "Topic",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>0 represents &quot;successful repsonse&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"0\",     \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ErrorCreateUser",
            "description": "<p>Error get topic</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/topic.js",
    "groupTitle": "Topic"
  },
  {
    "type": "post",
    "url": "/topic",
    "title": "create a new topic",
    "name": "create_a_new_topic",
    "group": "Topic",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>bearer <code>token</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Content-Type\": \"application/x-www-form-urlencoded\",\n   \"Authorization\" : \"bearer `token`\"\n }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>topic's title</p>"
          },
          {
            "group": "Parameter",
            "type": "Stirng",
            "optional": false,
            "field": "content",
            "description": "<p>topic's content</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "tags",
            "description": "<p>topic's tags</p>"
          },
          {
            "group": "Parameter",
            "type": "Stirng",
            "optional": false,
            "field": "courseTag",
            "description": "<p>topic's courseTag</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>0 represents &quot;successful repsonse&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "topic",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"code\": \"0\",\n      \n        \"topic\": {\n           \"__v\": 0,\n           \"creator\": \"{ _id: 5abe3f7969c9d9111be87ef6,\\n  name: 'dx',\\n  email: '123@qq.com',\\n  avatar: 'http://ov6ie3kzo.bkt.clouddn.com/image/avatar/1522430493115.png' }\",\n           \"title\": \"this is a question \",\n           \"courseTag\": \"信息安全\",\n           \"_id\": \"5ad994dbe1e1291b2dd2e108\",\n           \"createTime\": 1524208853430,\n           \"tags\": [],\n           \"replyList\": []\n}\n\n       \n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ErrorCreateUser",
            "description": "<p>Error creating user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/topic.js",
    "groupTitle": "Topic"
  },
  {
    "type": "GET",
    "url": "/topic/:topicId",
    "title": "get topic by id",
    "name": "get_topic_by_id",
    "group": "Topic",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>0 represents &quot;successful repsonse&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "topic",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"0\",\n  \n    \"topic\": {\n       \"__v\": 0,\n       \"creator\": \"{ _id: 5abe3f7969c9d9111be87ef6,\\n  name: 'dx',\\n  email: '123@qq.com',\\n  avatar: 'http://ov6ie3kzo.bkt.clouddn.com/image/avatar/1522430493115.png' }\",\n       \"title\": \"this is a question \",\n       \" courseTag\": \"信息安全\",\n       \"_id\": \"5ad994dbe1e1291b2dd2e108\",\n       \"createTime\": 1524208853430,\n       \"tags\": [],\n       \"replyList\": []\n   }\n\n   \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ErrorCreateUser",
            "description": "<p>Error get topic</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/topic.js",
    "groupTitle": "Topic"
  },
  {
    "type": "POST",
    "url": "/topic/:topicId/reply",
    "title": "reply a topic",
    "name": "reply_topic",
    "group": "Topic",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>bearer <code>token</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Content-Type\": \"application/x-www-form-urlencoded\",\n   \"Authorization\" : \"bearer `token`\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>0 represents &quot;successful repsonse&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "topic",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"0\",\n  \n    \"topic\": {\n       \"__v\": 0,\n       \"creator\": \"{ _id: 5abe3f7969c9d9111be87ef6,\\n  name: 'dx',\\n  email: '123@qq.com',\\n  avatar: 'http://ov6ie3kzo.bkt.clouddn.com/image/avatar/1522430493115.png' }\",\n       \"title\": \"this is a question \",\n       \"courseTag\": \"信息安全\",\n       \"_id\": \"5ad994dbe1e1291b2dd2e108\",\n       \"createTime\": 1524208853430,\n       \"tags\": [],\n       \"replyList\": [\n       {\n           \"content\": \"this is a reply\",\n           \"creator\": \"5abe3f7969c9d9111be87ef6\",\n           \"_id\": \"5ad99dd091dfaf2001add181\",\n           \"createTime\": 1524211146040\n       }\n       ]\n   }\n\n   \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ErrorCreateUser",
            "description": "<p>Error get topic</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/topic.js",
    "groupTitle": "Topic"
  },
  {
    "type": "get",
    "url": "/user/",
    "title": "Request All Users information",
    "name": "GetAllUsers",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "users",
            "description": "<p>all users info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"0\",\n  \"users\": \"users\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>There isn't any user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/",
    "title": "create a new user / register",
    "name": "create___register_a_new_user",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "Stirng",
            "optional": false,
            "field": "email",
            "description": "<p>user's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>user's password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>0 represents &quot;successful repsonse&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"0\",\n  \n  \"user\": {\n     \"_id\": \"5abe460346771c6bf8069a19\",\n     \"name\": \"dandan\",\n     \"email\": \"834921748@qq.com\"\n   }\n   \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ErrorCreateUser",
            "description": "<p>Error creating user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/:id",
    "title": "get user by id",
    "name": "get_user_by_id",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>userId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>0 represents &quot;successful repsonse&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"0\",\n  \n  \"user\": {\n     \"_id\": \"5abe460346771c6bf8069a19\",\n     \"name\": \"dandan\",\n     \"email\": \"834921748@qq.com\"\n   }\n   \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>There isn't any user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/user/:id",
    "title": "modify userinfo",
    "name": "modify_userinfo",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>user's name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": "<p>user's age</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>user's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>user's password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>0 represents &quot;successful repsonse&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"0\",\n  \n  \"user\": {\n     \"_id\": \"5abe3f7969c9d9111be87ef6\",\n     \"name\": \"dx\",\n     \"email\": \"123@qq.com\",\n     \"avatar\": \"http://ov6ie3kzo.bkt.clouddn.com/image/avatar/1522428143719.png\"\n   }\n   \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ErrorModifyUserInfo",
            "description": "<p>Error modifing userinfo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"something wrong when modifing userinfo\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/:id",
    "title": "upload avatar",
    "name": "upload_avatar",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "avatar",
            "description": "<p>user's avatar</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>bearer <code>token</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Content-Type\": \"multipart/form-data\",\n   \"Authorization\" : \"bearer `token`\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>0 represents &quot;successful repsonse&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"0\",\n  \n  \"user\": {\n     \"_id\": \"5abe3f7969c9d9111be87ef6\",\n     \"name\": \"dx\",\n     \"email\": \"123@qq.com\",\n     \"avatar\": \"http://ov6ie3kzo.bkt.clouddn.com/image/avatar/1522428143719.png\"\n   }\n   \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ErrorUploadAvatar",
            "description": "<p>Error uploading avatar</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"something wrong when upload avatar\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  }
] });
