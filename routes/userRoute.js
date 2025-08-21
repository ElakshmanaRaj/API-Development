
const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const {getUser, deleteUser, newUser, userById, updateUser} = require("../controllers/UserController")



// File storage

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/");
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

// Routes

router.get("/", getUser);
router.get("/:id",userById);
router.delete("/:id", deleteUser);
router.post("/", upload.single("profileImage"), newUser);
router.put("/:id", upload.single("profileImage"), updateUser);




module.exports = router;