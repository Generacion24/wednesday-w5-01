const supertest = require("supertest")
const app = require('../app');
const Course = require("../models/Course");
require('../models')

let studentId;

test("POST -> '/api/v1/students', should return status code 201 and to have length 1", async()=>{
    const student = {
        firstName: "Jose",
        lastName: "Gaspar",
        birthday: "2023-02-05",
        program: "software engineer"
    }
    const res = await supertest(app)
    .post('/api/v1/students')
    .send(student)

    studentId = res.body.id
        
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(student.firstName)
})


test("GET -> '/api/v1/students' should return status code 200", async()=>{
    const res = await supertest(app).get('/api/v1/students')

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].courses).toBeDefined()
})

test("GET ONE-> `/api/v1/students/:id` should return status code 200, and res.body.firstName should return Jose", async()=>{
    
    const res = await supertest(app).get(`/api/v1/students/${studentId}`)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("Jose")
})

test("PUT -> '/api/v1/students/:id' should return status code 200 and res.body.name = body.name" , async()=>{
    const body = {
        firstName: "Jose"
    }
    const res = await supertest(app)
        .put(`/api/v1/students/${studentId}`)
        .send(body)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(body.firstName)
})

test("POST -> 'api/v1/students/:id/courses' set courses students, should status code 200 and res.body.length = 1",async()=>{
    const body = {
        name:"object oriented programming",
        credits: 10
    }
    const course = await Course.create(body)

    const res = await supertest(app)
        .post(`/api/v1/students/${studentId}/courses`)
        .send([course.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await course.destroy()
})

test("Delete -> '/api/v1/students/:id' should return status code 204 ", async()=>{
    const res = await supertest(app).delete(`/api/v1/students/${studentId}`)
    expect(res.status).toBe(204)
})

