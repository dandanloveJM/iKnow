class BaseHttpError extends Error {
    constructor(msg, MYCode, httpCode, httpMsg) {
        super(msg)
        this.MYCode = MYCode
        this.httpCode = httpCode
        this.httpMsg = httpMsg
        this.name = 'BaseHttpError'

    }

    static get ['DEFAULT_MYCODE']() {
        return 100000
    }

}

class InternalError extends BaseHttpError {
    constructor(msg) {
        const MYCode = 100001
        const httpMsg = '服务器好像出小差了，一会再试试'
        const httpCode = 500
        super(msg, MYCode, httpCode, httpMsg)
    }
}

class ValidationError extends BaseHttpError {
    constructor(path, reason) {
        const MYCode = 200001
        const httpCode = 400
        super(`error validating param, path:${path}, reason:${reason}`, MYCode, httpCode, '参数错误，请检查后再重试~')
        this.name = 'ValidationError'

    }
}
//用户重名错误
class DuplicateUsernameError extends ValidationError {
    constructor(username) {
        super('username', `duplicate user name ${username}`)
        this.httpMsg = '这个昵称已经被别人使用过啦～不如换一个吧～'
        this.MYCode = 200002
    }
}

class NeverLikedError extends BaseHttpError {
    constructor(userId, attachedId) {
        const msg = `user ${userId} never liked content ${attachedId}, but called dislike`
        super(`never liked error: ${msg}`, 6000001, 400, '还没有点过赞呢，不能取消呦')
    }
}

class AlreadyLikedError extends BaseHttpError {
    constructor(userId, attachedId) {
        const msg = `user ${userId} already liked content ${attachedId}, but called like`
        super(`already liked error: ${msg}`, 6000002, 400, '已经点过赞啦')
    }
}

module.exports = {
    BaseHttpError,
    ValidationError,
    DuplicateUsernameError,
    InternalError,
    NeverLikedError,
    AlreadyLikedError


}