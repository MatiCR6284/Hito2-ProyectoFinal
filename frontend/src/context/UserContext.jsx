import { createContext, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [email, setEmail] = useState(null)
  const [userType, setUserType] = useState(null) // 'traveler' o 'organizer'
  const [userData, setUserData] = useState(null)

  // login
  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!res.ok) {
        throw new Error('Credenziali non valide')
      }

      const data = await res.json()
      setToken(data.token)
      setEmail(data.email)
      setUserType(data.userType)
      setUserData(data.user)
      console.log('Login effettuato con successo!')
    } catch (error) {
      console.error('Errore durante il login:', error.message)
    }
  }

  // register new user - traveler or organizer
  const register = async (email, password, name, userType = 'organizer') => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name, userType })
      })

      if (!res.ok) {
        throw new Error('Errore nella registrazione')
      }

      const data = await res.json()
      setToken(data.token)
      setEmail(data.email)
      setUserType(data.userType)
      setUserData(data.user)
      console.log('Registrazione completata con successo!')
    } catch (error) {
      console.error('Errore durante la registrazione:', error.message)
    }
  }

  // profile logged user

  const getProfile = async () => {
    if (!token) return

    try {
      const res = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // send token in header
          'Content-Type': 'application/json'
        }
      })

      if (!res.ok) {
        throw new Error('Errore nel recupero del profilo')
      }

      const data = await res.json()
      setEmail(data.email)
      setUserType(data.userType)
      setUserData(data)
      console.log('Profilo utente:', data)
    } catch (error) {
      console.error('Errore durante il recupero del profilo:', error.message)
    }
  }

  // logout - clear email and token
  const logout = () => {
    setToken(null)
    setEmail(null)
    setUserType(null)
    setUserData(null)
    console.log('Logout effettuato')
  }

  // check if user is organizer
  const isOrganizer = () => {
    return userType === 'organizer'
  }

  // quick test organizer
  const setTestOrganizer = () => {
    setToken('test-organizer-token')
    setEmail('organizer@test.com')
    setUserType('organizer')
    setUserData({ name: 'Test Organizer', email: 'organizer@test.com' })
  }

  return (
    <UserContext.Provider value={{
      token,
      email,
      userType,
      userData,
      login,
      register,
      logout,
      getProfile,
      isOrganizer,
      setTestOrganizer
    }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
