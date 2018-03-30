const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Errors = require('../../errors')
const logger = require('../../utils/logger').logger
const { ObjectId } = Schema.Types

const CourseSchema = Schema({
  userId: { type: String, index: 1 },
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
      throw new Error(`error ${params.stuId} creating topic `)
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

async function getCourseName(stuId) {
  let flow = CourseModel.find({ stuId: stuId })
  flow.select({ "course": 1, "_id": 0 })

  return await flow
    .catch(e => {
      console.log(e)
      throw new Error('error getting topics from db')
    })
}

module.exports = {
  CourseModel,
  addCourse,
  findStuByCourseName,
  getCourseName,
}