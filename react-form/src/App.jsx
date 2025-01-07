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
    setPost([...post, { id: Date.now(), title: newPost.title }]);
    setNewPost(initialFormData); 
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const deletePost = (postId) => {
    setPost(post.filter((post) => post.id !== postId));
  };

  return (
    <>
      <div>
        <form onSubmit={createPost}>
          <label htmlFor="title">Contenuto</label>
          <input
            type="text"
            name="title"
            id="id"
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