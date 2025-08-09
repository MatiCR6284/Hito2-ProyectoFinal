import './profile.css'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { email, logout, token, getProfile } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login') // if not logged send to login
    } else {
      getProfile()
    }
  }, [token, navigate, getProfile])

  const handleLogout = () => {
    logout()
    navigate('/login') // send to login after logout
  }

  if (!email) {
    return <p>Loading...</p>
  }

  return (
    <div className='create-package-container'>
      <div className='create-package-header'>
        <h1>👤 Mi Perfil</h1>
        <p>Gestiona tu cuenta de viajero</p>
      </div>

      <div className='package-form'>
        <div className='form-section'>
          <h2>📧 Información de cuenta</h2>

          <div className='form-row'>
            <div className='form-group'>
              <label>Email</label>
              <div className='form-display-value'>
                {email}
              </div>
            </div>
          </div>
        </div>

        <div className='form-actions'>
          <button className='btn-create-package logout-btn' onClick={handleLogout}>
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
