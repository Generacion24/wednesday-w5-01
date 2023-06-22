const Book = require('./Book')
const Authors = require('./Author')
const Student = require('./Student')
const Course = require('./Course')

// Table pivote "BookAuthor"
Book.belongsToMany(Authors,{through:"BookAuthor"})
Authors.belongsToMany(Book,{through:"BookAuthor"})

//Table pivote "StudentCourse"
Student.belongsToMany(Course,{through:"StudentCourse"})
Course.belongsToMany(Student,{through:"StudentCourse"})