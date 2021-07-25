const express=require("express");
const article = require("./../models/article");
const router=express.Router();
const Article=require('./../models/article')

router.get("/new",(req,res)=>{
    res.render('articles/new',{article:new Article()});
})

router.get("/:id",async(req,res)=>{
    const article = await Article.findById(req.params.id)
    if(article==null) res.redirect("/")
    res.render("articles/show",{article:article})
})

router.get("/edit/:id",async(req,res)=>{
    const article=await Article.findById(req.params.id)
    res.render("articles/edit",{article:article})
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
  }, saveArticleAndRedirect('new'))
  
  router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
  }, saveArticleAndRedirect('edit'))

function saveArticleAndRedirect(path){
    return async (req,res)=>{
        let article=req.article
            article.title=req.body.title
            article.description=req.body.des
            article.markdown=req.body.markdown
        
        try{
            article=await article.save();
            res.redirect(`/articles/${article.id}`)
            }
            catch(err){
                res.render(`articles/${path}`,{article:article})
            }
    }
}

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports=router;


