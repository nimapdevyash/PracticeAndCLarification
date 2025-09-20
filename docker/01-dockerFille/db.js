const Sequelize = require("sequelize") ;
require("dotenv").config();

const sequelize = new Sequelize({
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME ,
	dialect: process.env.DB_DIALECT ,
	host: process.env.DB_HOST ,
	password: process.env.DB_PASSWORD ,
	logging: false
}) ;

async function connectToDB () {
	try {
		await sequelize.authenticate() ;
		console.log(`Connected to Database on port : ${process.env.DB_PORT || 543}`);
	}
	catch(error){
		console.log(`error while connecting to Database : \n \n ${error} \n \n `);
	}
}

module.exports = {
	connectToDB,
	sequelize
}
