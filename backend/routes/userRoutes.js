const express = require("express");

const {
    getUser,
    getUsers,
    getUsersName,
    updateUser,
    updatePassword,
    deleteUser,
} = require("../controllers/userController");
const { authenticated } = require("../middleware/authentication");

const router = express.Router();


router.get("/", authenticated, getUsers);
router.get("/name", authenticated, getUsersName);
router.get("/:id", authenticated, getUser);

router.patch("/newPwd", updatePassword);

router.patch("/:id", authenticated, updateUser);
router.delete("/:id", authenticated, deleteUser);

module.exports = router;
