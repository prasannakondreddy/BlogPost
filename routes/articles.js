const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("articles page");
})


module.exports=router;


