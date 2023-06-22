const supertest = require("supertest")
const app = require("../app")
require('../models')
let courseId

test("POST -> '/api/v1/courses', should return status code 201 ", async()=>{

    const body = {
        name:"object oriented programming",
        credits:10
    }
    const res = await supertest(app)
        .post('/api/v1/courses')
        .send(body)

    courseId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(body.name)
})

test("GET -> '/api/v1/courses' should return status code 200", async()=>{
    const res = await supertest(app).get('/api/v1/courses')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("GET ONE -> '/api/v1/courses/:id' should return status code 200 and res.body.name = body.name", async()=>{
    const res = await supertest(app).get(`/api/v1/courses/${courseId}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe("object oriented programming")
})

test("PUT -> '/api/v1/courses/:id' should return status code 200 and res.body.name = body.name" , async()=>{
    const body = {
        name:"object oriented programming"
    }
    const res = await supertest(app)
        .put(`/api/v1/courses/${courseId}`)
        .send(body)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(body.name)
})

test("Delete -> '/api/v1/courses/:id' should return status code 204 ", async()=>{
    const res = await supertest(app).delete(`/api/v1/courses/${courseId}`)
    expect(res.status).toBe(204)
})
