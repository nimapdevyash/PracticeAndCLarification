const { UUIDV4, DataTypes } = require("sequelize");
const { sequelize } = require("./db");

exports.user = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: (age) => age >= 18,
  },
});

exports.post = sequelize.define("Post", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  author_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

exports.comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  post_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

exports.profile = sequelize.define("Profile", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
