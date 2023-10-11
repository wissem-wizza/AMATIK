const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// @route   GET /api/user
// @desc    get user list
// @access  authenticated supervisor
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}); //.sort({ createdAt: -1 });

        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @route   GET /api/user name
// @desc    get name list of users
// @access  authenticated supervisor
const getUsersName = async (req, res) => {
    try {
        const users = await User.find({}, { NOM: 1 }).sort({ NOM: 1 }); //.sort({ createdAt: -1 });
        names = users.map((user) => user.NOM);
        res.status(200).json(names);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @route   GET /api/user/:id
// @desc    get one user record
// @access  authenticated supervisor
const getUser = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "id non valid!" });
    }
    try {
        const user = await User.findById(id);

        if (!user) {
            return res
                .status(400)
                .json({ error: "Aucun utilisateur ne correspond!" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// create a new user .. is replaced with signup

// @route   DELETE /api/user/:id
// @desc    delete one user record
// @access  authenticated supervisor
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "l'id n'est pas valide!" });
    }

    try {
        const user = await User.findOneAndDelete({ _id: id });

        if (!user) {
            return res
                .status(400)
                .json({ error: "Aucun utilisateur ne correspond!" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @route   PATCH /api/user/:id
// @desc    update one user record
// @access  authenticated supervisor
const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Aucun utilisateur ne correspond!" });
    }

    const deviceStringID = req.body.DEVICE_ID;
    if (deviceStringID) {
        console.log("Buffer String ID Token is :", deviceStringID);
    }

    try {
        const user = await User.findOneAndUpdate(
            { _id: id },
            {
                ...req.body,
            },
            { new: true }
        );

        if (!user) {
            return res
                .status(400)
                .json({ error: "Aucun utilisateur ne correspond!" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @route   PATCH /api/user/newPwd
// @desc    update password for a specific user
// @access  Public
const updatePassword = async (req, res) => {
    const { EMAIL, PASSWORD, RESET_CODE } = req.body;

    try {
        const user = await User.findOne({ EMAIL });
        if (!user) {
            return res
                .status(404)
                .json({ message: "Aucun utilisateur ne correspond!" });
        }

        if (RESET_CODE === user.RESET_CODE) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(PASSWORD, salt);
            user.PASSWORD = hash;
            user.RESET_CODE = null;
            await user.save();

            const { PASSWORD: _p, RESET_CODE: _r, ...userToReturn } = user.toObject();
            res.status(200).json(userToReturn);
        } else {
            return res.status(404).json({ message: "Invalid Request" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getUser,
    getUsers,
    getUsersName,
    updateUser,
    updatePassword,
    deleteUser,
};
