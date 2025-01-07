const express = require('express')
const app = express()
const port = 3000
const posts = require('./data/posts.js')
const router = require('./routers/posts.js')
const cors = require("cors")
const handleError = require('./middlewares/handleError.js')
app.use(express.json());
app.use(express.static('public'))

app.use(
    cors({
        origin: "http://localhost:5173",
    })
)

app.use('/post', router)    



app.get('/', (req, res) => {
    res.send('Server del mio blog di cucina')
})

app.get ('/bacheca', (req, res) => {
    res.json({
        postsList: posts,
        postsNum: posts.length
    })
})

app.use(handleError)

app.listen(port, () => {})