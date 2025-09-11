const { Sequelize, DataTypes, Op } = require("sequelize");
const { sequelize } = require("./db.js");

// Model
const User = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER, // ✅ fixed
      allowNull: false,
    },
  },
  {
    timestamps: true, // ✅ fixed
    paranoid: true,
  }
);

User.sync({alter:true});

// ---------------- Controllers ----------------
const createUserController = async (req, res) => {
  const result = await addUser(req.body);
  return res.status(201).json(result);
};

const listUsersController = async (req, res) => {
  const result = await listUsers(req.query);
  return res.status(200).json(result);
};

const getUserController = async (req, res) => {
  const result = await getUser(req.params);
  return res.status(200).json(result);
};

const updateUserController = async (req, res) => {
  const result = await updateUserById({ ...req.params, ...req.body });
  return res.status(200).json(result);
};

const removeUserController = async (req, res) => {
  const result = await removeUserById(req.params);
  return res.status(200).json(result);
};

// ---------------- Services ----------------
async function addUser({ name, age }) {
  return await User.create({ name, age });
}

async function listUsers({ name, age }) {
  return await User.findAll({
    where: {
      [Op.and]: [
        name && { name: { [Op.iLike]: `%${name}%` } },
        age && { age },
      ].filter(Boolean),
    },
  });
}

async function getUser({ id }) {
  return await User.findByPk(id);
}

async function updateUserById({ id, name, age }) {
  const [count, users] = await User.update(
    { name, age },
    { where: { id }, returning: true } // ✅ so you get updated rows
  );
  return users[0] || null;
}

async function removeUserById({ id }) {
  return await User.destroy({ where: { id } });
}

// ---------------- Routes ----------------
const router = require("express").Router();

router.post("/", createUserController);
router.get("/", listUsersController);
router.get("/:id", getUserController);
router.put("/:id", updateUserController);
router.delete("/:id", removeUserController);

module.exports = router;

