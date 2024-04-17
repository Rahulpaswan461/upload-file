const express = require("express")
const path = require("node:path")
const multer  = require('multer')

const app = express();

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads/profileImages")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()} - ${file.originalname}`)
    }
})

const upload = multer({storage})

app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.get("/",(req,res)=>{
     return res.render("home")
})

app.post("/profile",upload.single("profileImage"),(req,res)=>{
    console.log(req.body)
    console.log(req.file)

    return res.redirect("/")
})

app.listen(8000,()=>{
      console.log("Server is running : ");
})