

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
	dialect: "postgres",
	username: "postgres",
	password: "pass",
	host: "localhost",
	port: "5000",
	logging: false
})

const connectTodb = async () => {
  await sequelize.authenticate().then(() => console.log("connected to db"));
};

module.exports = {
  connectTodb,
  sequelize
}