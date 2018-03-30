const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Errors = require('../../errors')
const logger = require('../../utils/logger').logger
const { ObjectId } = Schema.Types

const CourseSchema = Schema({
  userId: { type: ObjectId, index: 1 },
  course: { type: String },
  teacher: { type: String }

})

const CourseModel = mongoose.model('course', CourseSchema)

async function addCourse(params) {
  const newCourse = new CourseModel({
    userId: params.userId,
    course: params.course,
    teacher: params.teacher,
  })

  return await newCourse.save()
    .catch(e => {
      throw new Error(`error ${params.userId} adding course `)
    })
}

async function findStuByCourseName(courseName) {
  const course = await CourseModel.find({ course: courseName })
    .select({ "stuId": 1, "_id": 0 })
    .catch(e => {
      const errorMsg = 'error finding student'
      logger.error(errorMsg, { err: e.stack || e })
      throw new Errors.InternalError(errorMsg)
    })

  return course[0].stuId
}

async function getCourseName(userId) {
  let flow = CourseModel.find({ userId: userId })
  flow.select({ "course": 1, "_id": 0 })

  return await flow
    .catch(e => {
      console.log(e)
      throw new Error('error getting course from db')
    })
}
async function getCourses(params = { page: 0, pageSize: 10 }) {
  let flow = CourseModel.find({})
  flow.skip(params.page * params.pageSize)
  flow.limit(params.pageSize)
  return await flow
      .catch(e => {
          console.log(e)
          throw new Error('error getting users from db')
      })
}
module.exports = {
  CourseModel,
  addCourse,
  findStuByCourseName,
  getCourseName,
  getCourses,
}