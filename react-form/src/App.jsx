import { useState, useEffect } from 'react';
import './App.css';
import posts from '../data/posts';
import axios from 'axios';

const api = "http://localhost:3000";

const initialFormData = {
  id: "",
  title: "",
};

function App() {
  const [post, setPost] = useState([]);
  const [newPost, setNewPost] = useState(initialFormData);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    axios.get(`${api}/post`).then((resp) => {
      console.log(resp);
      setPost(resp.data.data);
    });
  };

  const createPost = (event) => {
    event.preventDefault();
    axios.post(`${api}/post`, newPost).then((resp) => {
      console.log(resp)
      const newPostApi = resp.data;

      const newPostList = [
        ...post, newPostApi
      ]
      setPost(newPostList)
    })
  };

  const handleChange = (event) => {

    const keyToChange = event.target.name;
    const newData = {
      ...newPost,
      [keyToChange]: event.target.value
    }
    setNewPost(newData)
  };

  const deletePost = (postId) => {
    axios.delete(`${api}/post/${postId}`).then((resp) => {
      const newPostList = post.filter((curPost) => 
        curPost.id != postId
      )
      setPost(newPostList)
    })
  };

  return (
    <>
      <div>
        <form onSubmit={createPost}>
          <h2>Aggiungi un nuovo post</h2>
          <label htmlFor="title">Contenuto</label>
          <input
            type="text"
            name="title"
            id="title"
            value={newPost.title}
            onChange={handleChange}
          />
          <button type="submit">Invia</button>
        </form>
      </div>
      {post.length !== 0
        ? post.map((curPost) => (
          <div key={curPost.id}>
            {curPost.title}
            <button onClick={() => deletePost(curPost.id)}>Cancella</button>
          </div>
        ))
        : <p>La pagina è vuota</p>}
    </>
  );
}

export default App;