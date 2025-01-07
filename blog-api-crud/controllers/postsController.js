const postsList = require('../data/posts.js')

const index = (req, res) => {
    if (req.query.tags === undefined) {
        res.json({
            data: postsList,
            count: postsList.length
        })
    } else {
        const tagSearch = req.query.tags
        const result = postsList.filter((post) => post.tags.includes(tagSearch))
        res.json({
            data: result,
            count: result.length
        })
    }
}

const show = (req, res) => {
    const postId = parseInt(req.params.id)
    const myPost = postsList.find((post) => post.id === postId)
    if (myPost === undefined) {
        res.statusCode = 404
        res.json({
            error: 'Not found',
            message: 'Il post non è stato trovato'
        })
    } else { res.json(myPost) }
}

const store = (req, res) => {
    const newPost = req.body;
    // console.log(req.body)
    // res.json("Dati ricevuti")
    newPost.id = postsList[postsList.length - 1].id + 1
    postsList.push(newPost)
    res.statusCode = 201
    res.json(newPost)
}

const update = (req, res) => {
    const postId = parseInt(req.params.id)
    const newData = req.body
    const postIndex = postsList.findIndex((post) => post.id === postId)
    if (postIndex === -1) {
        return res.status(404).json({
            error: "Not found",
            message: "Il post non è stato trovato"
        })
    } else {
        postsList[postIndex] = {
            ...postsList[postIndex],
            ...newData,
            id: postId
        }
        res.json(postsList[postIndex])
        console.log(postsList)
    }
}

const destroy = (req, res) => {
    const postId = parseInt(req.params.id)
    const myPost = postsList.find((post) => post.id === postId)
    const myPostIndex = postsList.findIndex((post) => post.id === postId)
    if (myPost === undefined) {
        res.statusCode = 404
        res.json({
            error: 'Not found',
            message: 'Il post non è stato trovato'
        })
    } else {
        postsList.splice(myPostIndex, 1)
        res.statusCode = 204
        res.json(console.log(postsList))
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}