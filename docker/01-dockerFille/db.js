const Sequelize = require("sequelize") ;

const sequelize = new Sequelize({
	port: process.env.DB_PORT || 543,
	username: process.env.DB_USERNAME || "yash",
	dialect: process.env.DB_DIALECT || "postgres",
	host: process.env.DB_HOST || "localhost",
	password: process.env.DB_PASSWORD || "pass",
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
