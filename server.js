const express=require("express");
const app=express();
const mongoose=require("mongoose");
const articleRouter=require("./routes/articles");

app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get("/",function(req,res){
    const articles=[{
        title:"test article",
        createdDate:new Date(),
        text:"test data"
    }]
    res.render("articles/index",{articles:articles});
});

app.use("/articles",articleRouter);

app.listen(5000);