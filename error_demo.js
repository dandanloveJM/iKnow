class BaseHttpError extends Error{
    constructor(msg, MYCode, httpCode, httpMsg){
        super(msg)
        this.MYCode = MYCode
        this.httpCode = httpCode
        this.httpMsg = httpMsg

    }

}

class ValidationError extends BaseHttpError{
    constructor(path, reason){
        const MYCode = 100001
        const httpCode = 400
        super(`error validating param, path:${path}, reason:${reason}`, MYCode, httpCode, '参数错误，请检查后再重试~')


    }
} 



module.exports = {
    BaseHttpError,
    ValidationError,
}