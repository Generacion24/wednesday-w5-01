const supertest = require("supertest")
const app = require("../app")
require('../models')
let authorId

test("POST -> '/api/v1/authors', should return status code 201 ", async()=>{

    const body = {
        name:"Dale Carnegie",
        country:"USA"
    }
    const res = await supertest(app)
        .post('/api/v1/authors')
        .send(body)

    authorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(body.name)
})

test("GET -> '/api/v1/authors' should return status code 200", async()=>{
    const res = await supertest(app).get('/api/v1/authors')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("GET ONE -> '/api/v1/authors/:id' should return status code 200 and res.body.name = body.name", async()=>{
    const res = await supertest(app).get(`/api/v1/authors/${authorId}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe("Dale Carnegie")
})

test("PUT -> '/api/v1/authors/:id' should return status code 200 and res.body.name = body.name" , async()=>{
    const body = {
        name:"Dale Carnegie"
    }
    const res = await supertest(app)
        .put(`/api/v1/authors/${authorId}`)
        .send(body)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(body.name)
})

test("Delete -> '/api/v1/authors/:id' should return status code 204 ", async()=>{
    const res = await supertest(app).delete(`/api/v1/authors/${authorId}`)
    expect(res.status).toBe(204)
})
