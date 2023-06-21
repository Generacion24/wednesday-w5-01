const supertest = require("supertest")
const app = require("../app")

let bookId

test("POST -> '/api/v1/books', should return status code 201 ", async()=>{

    const body = {
        name:"como ganar amigos e influir en los demas",
        category:"ayuda personal"
    }
    const res = await supertest(app)
        .post('/api/v1/books')
        .send(body)

    bookId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(body.name)
})

test("GET -> '/api/v1/books' should return status code 200", async()=>{
    const res = await supertest(app).get('/api/v1/books')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("GET ONE -> '/api/v1/books/:id' should return status code 200 and res.body.name = body.name", async()=>{
    const res = await supertest(app).get(`/api/v1/books/${bookId}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe("como ganar amigos e influir en los demas")
})

test("PUT -> '/api/v1/books/:id' should return status code 200 and res.body.name = body.name" , async()=>{
    const body = {
        name:"como ganar amigos e influir en los demas"
    }
    const res = await supertest(app)
        .put(`/api/v1/books/${bookId}`)
        .send(body)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(body.name)
})

test("Delete -> '/api/v1/books/:id' should return status code 204 ", async()=>{
    const res = await supertest(app).delete(`/api/v1/books/${bookId}`)
    expect(res.status).toBe(204)
})
