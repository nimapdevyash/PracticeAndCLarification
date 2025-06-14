
const express = require('express');
const { user, post, comment, profile } = require('./models');
const {connectTodb, sequelize} = require("./db");
const app = express() ;
const router = require("./controllers");

user.hasMany(post, {foreignKey: "author_id" , as: "user-posts"});
post.belongsTo(user , {foreignKey: "author_id" , as: "author"});

post.hasMany(comment, {foreignKey: "post_id" , as: "comments"});
comment.belongsTo(post, {foreignKey: "post_id" , as: "post"});

user.hasMany(comment, {foreignKey: "user_id" , as: "user-comments"});
comment.belongsTo(user, {foreignKey: "user_id" , as: "commenter"})

user.hasOne(profile, {foreignKey: "user_id" , as: "profile"});
profile.belongsTo(user , {foreignKey: "user_id" , as: "user"});

connectTodb().then(() => sequelize.sync());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("welcome, my son !");
});

app.use("/", router);

app.use("/", (req, res) => {
  res.send("I too had once lost my way in those eyes of hers !");
});

app.listen(3000, () => console.log("app is live....")) ;
