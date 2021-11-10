const express = require('express')
const router = express.Router()
const Article = require('../models/article')

//Get All
router.get('/', async(req,res) => {
    try{
        const articles = await Article.find()
        res.json(articles) //respond with json (articles)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
//Get One
router.get('/:id', getArticle, (req,res) => {   //get by ID
    res.json({
        title: res.article.title,
        content: res.article.content
    })  //respond with title (res.article for all)
})

//Create One
router.post('/', async (req,res) => {
    const article = new Article({   //Create
        title: req.body.title,
        tags: req.body.tags,
        author: req.body.author,
        content: req.body.content
    })

    try{                            //Save
        const newArticle = await article.save()
        res.status(201).json(newArticle)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

//Update One
router.patch('/:id', getArticle, async(req,res) => { //or router.put 

    //These check if the request is null, if not then assign the request respectively
    if(req.body.title != null){
        res.article.title = req.body.title
    }
    if(req.body.tags != null){
        res.article.tags = req.body.tags
    }
    if(req.body.author != null){
        res.article.author = req.body.author
    }
    if(req.body.content != null){
        res.article.content = req.body.content
    }

    //After assigning values, try and save/update
    try{
        const updatedArticle = await res.article.save()
        res.json(updatedArticle)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//Delete One
router.delete('/:id', getArticle, async(req,res) => {
    try{
        await res.article.remove()
        res.json({message: 'Deleted Article'})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

async function getArticle(req, res, next) {
    let article
    try{
        article = await Article.findById(req.params.id) //find the id request
        if(article == null){
            return res.status(404).json({message: "Cannot find article"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.article = article
    next()
}

module.exports = router