
const User = require("../models/User")

// Get User

const getUser = async (req, res) => {
    try {
        const user = await User.find()
        res.json({suceess: true, user})
        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}


// get UserBy ID

const userById = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);
        res.json({suceess: true, user});

        if(!user){
            res.status(404).json({message: "User not found"})
        }
        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

// create New User

const newUser = async (req, res) => {
    try {

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profileImage: req.file ? req.file.filename : null,
        })

        await newUser.save();
        res.status(201).json({suceess: true, newUser});
        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}


// edit and update User

const updateUser = async (req, res) => {
    try {
        const updateData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        if (req.file) {
            updateData.file = req.file.filename;
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ success: true, updateUser });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};




// delete User

const deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.json({message:"User deleted"})

        if(!deleteUser){
            res.status(404).json({message: "User not found"})
        }
        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

module.exports = { getUser, deleteUser, newUser, userById, updateUser };