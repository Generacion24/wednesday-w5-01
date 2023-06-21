const sequelize = require('../utils/connection');
require('../models/Book')
require('../models/Student')
require("../models/Author")
require('../models/Course')


const main = async() => {
    try{
        await sequelize.sync({ force: true });

        process.exit();
    } catch(error){
        console.log(error);
    }
 }

main();