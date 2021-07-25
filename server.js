const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Article = require("./models/article");
const articleRouter=require("./routes/articles");
const methodOverride=require("method-override");


mongoose.connect("mongodb+srv://Prasanna:Prasanna123@cluster0.w886a.mongodb.net/blog?retryWrites=true&w=majority",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    
})
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}));
//app.use(express.static("public"));
app.use(methodOverride('_method'));

app.get("/",async (req,res)=>{
    const articles = await Article.find().sort({createdDate:'desc'});
    res.render("articles/index",{articles:articles});
});

app.use("/articles",articleRouter);

app.listen(5000);