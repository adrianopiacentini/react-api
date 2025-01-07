import { useState } from 'react'
import './App.css'
import posts from '../data/posts'

function App() {
  const [post, setPost] = useState(posts)
  const [newPost, setnewPost] = useState('')

  const createPost = event => {
    event.preventDefault()
    setPost([...post, { id: Date.now(), title: newPost }])
    setnewPost('')
  }

  const deletePost = (postId) => {
    setPost(post.filter(post => post.id !== postId))
  }

  return (
    <>
      <div>
        <form onSubmit={createPost}>
          <label htmlFor='desc'>Contenuto</label>
          <input type='text' name='desc' id='desc' value={newPost} onChange={test => { setnewPost(test.target.value) }} />
          <button type='submit'>Invia</button>
        </form>
      </div>
      {(post.length !== 0) ? post.map(curPost => <div key={curPost.id}>
        {curPost.title}
        <button onClick={() => deletePost(curPost.id)}>Cancella</button>
      </div>) : <p>La pagina è vuota</p>}
    </>
  )
}

export default App
