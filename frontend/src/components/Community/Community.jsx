import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import './community.css'

const Community = () => {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const { userData, token } = useContext(UserContext)

  // community data
  useEffect(() => {
    setPosts([
      {
        id: 1,
        author: 'Marco Verdi',
        content: 'Appena tornato dalla fantastica Sicilia! Le spiagge di Taormina sono spettacolari 🏖️',
        image: '/src/assets/img/sicilia.jpg',
        likes: 24,
        comments: 8,
        timestamp: '2 ore fa',
        location: 'Sicilia, Italia'
      },
      {
        id: 2,
        author: 'Laura Rossi',
        content: 'Chi ha mai visitato Praga? Sto pianificando un viaggio per il prossimo mese!',
        likes: 12,
        comments: 15,
        timestamp: '5 ore fa',
        location: 'Milano, Italia'
      },
      {
        id: 3,
        author: 'Giuseppe Bianchi',
        content: 'Condivido questa vista mozzafiato dal Machu Picchu! Un\'esperienza che non dimenticherò mai 🏔️',
        likes: 89,
        comments: 23,
        timestamp: '1 giorno fa',
        location: 'Machu Picchu, Perù'
      }
    ])
  }, [])

  const handlePostSubmit = (e) => {
    e.preventDefault()
    if (!newPost.trim()) return

    const post = {
      id: posts.length + 1,
      author: userData?.name || 'Utente Anonimo',
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: 'ora',
      location: 'Italia'
    }

    setPosts([post, ...posts])
    setNewPost('')
  }

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.likes + 1 }
        : post
    ))
  }

  return (
    <div className='community-container'>
      <div className='community-header'>
        <h1>🌐 Comunidad de Viajeros</h1>
        <p>Comparte tus experiencias de viaje y descubre nuevos destinos</p>
      </div>

      {/* Form new post */}
      {token && (
        <div className='post-form-container'>
          <form onSubmit={handlePostSubmit} className='post-form'>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder='Comparte tu experiencia de viaje...'
              rows={3}
              className='post-textarea'
            />
            <button type='submit' className='post-submit-btn'>
              📤 Compartir
            </button>
          </form>
        </div>
      )}

      {/* Feed posts */}
      <div className='posts-feed'>
        {posts.map((post) => (
          <div key={post.id} className='post-card'>
            <div className='post-header'>
              <div className='author-info'>
                <div className='author-avatar'>
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div className='author-details'>
                  <h4>{post.author}</h4>
                  <p className='post-meta'>
                    📍 {post.location} • {post.timestamp}
                  </p>
                </div>
              </div>
            </div>

            <div className='post-content'>
              <p>{post.content}</p>
              {post.image && (
                <img src={post.image} alt='Post' className='post-image' />
              )}
            </div>

            <div className='post-actions'>
              <button
                className='action-btn like-btn'
                onClick={() => handleLike(post.id)}
              >
                ❤️ {post.likes}
              </button>
              <button className='action-btn comment-btn'>
                💬 {post.comments}
              </button>
              <button className='action-btn share-btn'>
                🔄 Condividi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Community
