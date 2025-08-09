import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import './myTrips.css'

const MyTrips = () => {
  const [trips, setTrips] = useState([])
  const [filter, setFilter] = useState('all') // 'all', 'upcoming', 'ongoing', 'completed'
  const { token } = useContext(UserContext)

  useEffect(() => {
    setTrips([
      {
        id: 1,
        title: 'Roma Classica',
        destination: 'Roma, Italia',
        startDate: '2025-09-15',
        endDate: '2025-09-18',
        status: 'upcoming',
        price: 299,
        image: '/src/assets/img/rome.jpg',
        bookingCode: 'ROM2025001',
        services: ['Hotel 4 stelle', 'Guida turistica', 'Colazione inclusa'],
        itinerary: [
          { day: 1, activities: 'Arrivo e visita al Colosseo' },
          { day: 2, activities: 'Musei Vaticani e Cappella Sistina' },
          { day: 3, activities: 'Fontana di Trevi e Pantheon' }
        ]
      },
      {
        id: 2,
        title: 'Toscana & Vino',
        destination: 'Toscana, Italia',
        startDate: '2025-07-10',
        endDate: '2025-07-15',
        status: 'completed',
        price: 450,
        image: '/src/assets/img/tuscany.jpg',
        bookingCode: 'TOS2025002',
        services: ['Agriturismo', 'Degustazioni vini', 'Tour delle cantine'],
        rating: 5
      },
      {
        id: 3,
        title: 'Costa Amalfitana',
        destination: 'Amalfi, Italia',
        startDate: '2025-08-20',
        endDate: '2025-08-27',
        status: 'ongoing',
        price: 599,
        image: '/src/assets/img/amalfi.jpg',
        bookingCode: 'AMA2025003',
        services: ['Hotel vista mare', 'Escursioni in barca', 'Cene tipiche']
      }
    ])
  }, [])

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming': return '🔜 Próximo'
      case 'ongoing': return '✈️ En curso'
      case 'completed': return '✅ Completado'
      default: return status
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'upcoming': return 'status-upcoming'
      case 'ongoing': return 'status-ongoing'
      case 'completed': return 'status-completed'
      default: return ''
    }
  }

  const filteredTrips = trips.filter(trip =>
    filter === 'all' || trip.status === filter
  )

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  if (!token) {
    return (
      <div className='mytrips-container'>
        <div className='login-required'>
          <h2>Acceso requerido</h2>
          <p>Inicia sesión para ver tus viajes</p>
        </div>
      </div>
    )
  }

  return (
    <div className='mytrips-container'>
      <div className='mytrips-header'>
        <h1>📅 Mis Viajes</h1>
        <p>Gestiona y revive tus aventuras</p>
      </div>

      {/* filters */}
      <div className='filters-container'>
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todos ({trips.length})
        </button>
        <button
          className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
          onClick={() => setFilter('upcoming')}
        >
          Próximos ({trips.filter(t => t.status === 'upcoming').length})
        </button>
        <button
          className={`filter-btn ${filter === 'ongoing' ? 'active' : ''}`}
          onClick={() => setFilter('ongoing')}
        >
          En curso ({trips.filter(t => t.status === 'ongoing').length})
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completados ({trips.filter(t => t.status === 'completed').length})
        </button>
      </div>

      {/* trips list */}
      <div className='trips-grid'>
        {filteredTrips.length === 0
          ? (
            <div className='no-trips'>
              <h3>No se encontraron viajes</h3>
              <p>Aún no has reservado viajes en esta categoría</p>
            </div>
            )
          : (
              filteredTrips.map((trip) => (
                <div key={trip.id} className='trip-card'>
                  <div className='trip-image-container'>
                    <img src={trip.image} alt={trip.title} className='trip-image' />
                    <div className={`trip-status ${getStatusClass(trip.status)}`}>
                      {getStatusText(trip.status)}
                    </div>
                  </div>

                  <div className='trip-info'>
                    <h3>{trip.title}</h3>
                    <p className='trip-destination'>📍 {trip.destination}</p>

                    <div className='trip-dates'>
                      <span>📅 {formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                    </div>

                    <div className='trip-services'>
                      <h4>Servicios incluidos:</h4>
                      <ul>
                        {trip.services.map((service, serviceIndex) => (
                          <li key={`${trip.id}-service-${serviceIndex}`}>✓ {service}</li>
                        ))}
                      </ul>
                    </div>

                    <div className='trip-footer'>
                      <div className='trip-price'>
                        <strong>€{trip.price}</strong>
                      </div>
                      <div className='trip-code'>
                        Código: {trip.bookingCode}
                      </div>
                    </div>

                    <div className='trip-actions'>
                      <button className='btn-details'>📋 Detalles</button>
                      {trip.status === 'completed' && (
                        <button className='btn-review'>⭐ Reseñar</button>
                      )}
                      {trip.status !== 'completed' && (
                        <button className='btn-manage'>⚙️ Gestionar</button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
      </div>
    </div>
  )
}

export default MyTrips
