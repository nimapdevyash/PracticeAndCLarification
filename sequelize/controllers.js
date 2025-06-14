const { Router } = require("express");
const { comment, post, user, profile } = require("./models");

const router = Router();

router.post("/user", async (req, res) => {
  try {
    const data = await user.create({
      name: req.body.name,
      age: req.body.age,
    });

    const user_profile = await profile.create({
      username: req.body.username,
      user_id: data.dataValues.id,
      bio: req.body.bio,
    });

    res.status(201).json({
      status: "user added successfully",
      data: [data, user_profile],
    });
  } catch (error) {
    console.log("error : ", error);
  }
});

router.post("/comment", async (req, res) => {
  try {
    res.status(201).json({
      status: "comment added successfully",
      data: await comment.create({
        post_id: req.body.post_id,
        user_id: req.body.user_id,
        comment: req.body.comment,
      }),
    });
  } catch (error) {
    console.log("error : ", error);
  }
});

router.post("/post", async (req, res) => {
  try {
    res.status(201).json({
      status: "post added successfully",
      data: await post.create({
        author_id: req.body.author_id,
        content: req.body.content,
      }),
    });
  } catch (error) {
    console.log("error : ", error);
  }
});

router.get("/user", async (req, res) => {
  try {
    res.status(200).json({
      data: await user.findOne({
        where: {
          id: req.query.userId,
        },
        include: [
          {
            model: post,
            as: "user-posts",
            include: [
              {
                model: comment,
                as: "comments"
              }
            ]
          },
          {
            model: profile,
            as: "profile",
          },
          {
            model: comment,
            as: "user-comments",
            include: [
              {
                model: post,
                as: "post"
              }
            ]
          },
        ],
      }),
    });
  } catch (error) {
    console.log("error : ", error);
  }
});

router.get("/comments", async (req, res) => {
  try {
    return res.status(200).json({
      data: await comment.findOne({
        where: {
          id: req.query.commentId,
        },
        include: [
          {
            model: post,
            as: "post",
          },
          {
            model: user,
            as: "commenter",
          },
        ],
      }),
    });
  } catch (error) {
    console.log("error : ", error);
  }
});

router.get("/post", async (req, res) => {
  try {
    return res.status(200).json({
      data: await post.findOne({
        where: {
          id: req.query.postId,
        },
        include: [
          {
            model: comment,
            as: "comments",
          },
          {
            model: user,
            as: "author",
          },
        ],
      }),
    });
  } catch (error) {
    console.log("error : ", error);
  }
});

router.get("/profile", async (req, res) => {
  try {
    return res.status(200).json({
      data: await profile.findOne({
        where: {
          id: req.query.profileId,
        },
        include: [
          {
            model: user,
            as: "user",
          },
        ],
        raw: true,
        nest: true
      }),
    });
  } catch (error) {
    console.log("error : ", error);
  }
});

router.get("/all-user", async (req, res) => {
  try {
    res.status(200).json({
      data: await user.findAndCountAll({
        include: [
          {
            model: post,
            as: "user-posts",
            include: [
              {
                model: comment,
                as: "comments"
              }
            ]
          },
          {
            model: profile,
            as: "profile",
          },
          {
            model: comment,
            as: "user-comments",
          },
        ],
        raw: true,
        nest: true
      }),
    });
  } catch (error) {
    console.log("error : ", error);
  }
});

router.get("/all-comments", async (req, res) => {
  try {
    return res.status(200).json({
      data: await comment.findAndCountAll({
        include: [
          {
            model: post,
            as: "post",
            include: [
              {
                model: user,
                as: "author"
              }
            ]
          },
          {
            model: user,
            as: "commenter",
          },
        ],
        raw: true,
        nest: true
      }),
    });
  } catch (error) {
    console.log("error : ", error);
  }
});

router.get("/all-posts", async (req, res) => {
  try {
    return res.status(200).json({
      data: await post.findAndCountAll({
        include: [
          {
            model: comment,
            as: "comments",
            include: [
              {
                model: user,
                as: "commenter"
              }
            ]
          },
          {
            model: user,
            as: "author",
            include: [
              {
                model: profile,
                as: "profile"
              }
            ]
          },
        ],
        raw: true,
        nest: true
      }),
    });
  } catch (error) {
    console.log("error : ", error);
  }
});


router.get("/all-profiles", async (req, res) => {
  try {
    return res.status(200).json({
      data: await profile.findAndCountAll({
        include: [
          {
            model: user,
            as: "user"
          }
          ,
        ],
        raw: true,
        nest: true
      }),
    });
  } catch (error) {
    console.log("error : ", error);
  }
});

module.exports = router;