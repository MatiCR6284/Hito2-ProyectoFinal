import './form.css'
import { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const FormRegister = () => {
  const { register } = useContext(UserContext)
  const navigate = useNavigate() // reindirizza utente

  const [registration, setRegistration] = useState({
    nombre: '',
    appellido: '',
    nacimiento: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value })
  }

  const handleRegister = async () => {
    if (!registration.email || !registration.password || !registration.passwordConfirmation) {
      setError('Debes ingresar todos los datos')
      return
    }

    if (registration.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (registration.password !== registration.passwordConfirmation) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      await register(registration.email, registration.password)
      navigate('/')
    } catch (error) {
      setError('Error en el registro, intenta con otro email')
    }
  }

  return (
    <div className='create-package-container'>
      <div className='create-package-header'>
        <h1>🌟 Crear Cuenta</h1>
        <p>Únete a nuestra comunidad de viajeros</p>
      </div>

      <div className='package-form'>
        {error && <div className='error-message'>{error}</div>}

        <div className='form-section'>
          <h2>📝 Información Personal</h2>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='nombre'>Nombre</label>
              <input
                id='nombre'
                type='text'
                placeholder='Tu nombre'
                value={registration.nombre}
                onChange={handleChange}
                name='nombre'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='appellido'>Apellido</label>
              <input
                id='appellido'
                type='text'
                placeholder='Tu apellido'
                value={registration.appellido}
                onChange={handleChange}
                name='appellido'
              />
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='nacimiento'>Fecha de nacimiento</label>
              <input
                id='nacimiento'
                type='date'
                value={registration.nacimiento}
                onChange={handleChange}
                name='nacimiento'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                type='email'
                placeholder='tu@email.com'
                value={registration.email}
                onChange={handleChange}
                name='email'
              />
            </div>
          </div>
        </div>

        <div className='form-section'>
          <h2>🔐 Seguridad</h2>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='password'>Contraseña</label>
              <input
                id='password'
                type='password'
                placeholder='Mínimo 6 caracteres'
                value={registration.password}
                onChange={handleChange}
                name='password'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='passwordConfirmation'>Confirmar contraseña</label>
              <input
                id='passwordConfirmation'
                type='password'
                placeholder='Repite tu contraseña'
                value={registration.passwordConfirmation}
                onChange={handleChange}
                name='passwordConfirmation'
              />
            </div>
          </div>
        </div>

        <div className='form-actions'>
          <button className='btn-create-package' onClick={handleRegister}>
            🚀 Crear Cuenta
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormRegister
