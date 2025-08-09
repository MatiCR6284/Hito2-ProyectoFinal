import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'
import './packageDetail.css'

const PackageDetail = () => {
  const { id } = useParams()
  const [packageData, setPackageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState('')
  const [participants, setParticipants] = useState(1)
  const { token } = useContext(UserContext)
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()

  useEffect(() => {
    // test api call
    const fetchPackageDetail = async () => {
      try {
        // APP CALL
        // const response = await fetch(`/api/packages/${id}`)
        // const data = await response.json()

        // testing
        const mockPackages = {
          1: {
            id: 1,
            title: 'Roma Classica',
            destination: 'Roma, Italia',
            description: 'Esplora la città eterna con un tour completo di 3 giorni. Visiterai i monumenti più iconici, gusterai la cucina locale e scoprirai la storia millenaria di Roma.',
            price: 299,
            image: '/src/assets/img/rome.jpg',
            duration: '3 giorni / 2 notti',
            rating: 4.8,
            reviews: 124,
            maxParticipants: 20,
            availableDates: ['2025-09-15', '2025-09-22', '2025-09-29', '2025-10-06'],
            services: [
              'Hotel 4 stelle nel centro storico',
              'Guida turistica professionale',
              'Colazione inclusa',
              'Trasporti locali inclusi',
              'Ingresso ai musei principali',
              'Assicurazione viaggio'
            ],
            itinerary: [
              {
                day: 1,
                title: 'Arrivo e Centro Storico',
                activities: 'Arrivo a Roma, check-in in hotel. Nel pomeriggio visita guidata del Colosseo e dei Fori Imperiali. Cena tipica in una trattoria del centro.'
              },
              {
                day: 2,
                title: 'Vaticano e Castel Sant\'Angelo',
                activities: 'Mattinata dedicata alla visita dei Musei Vaticani e della Cappella Sistina. Pomeriggio a Castel Sant\'Angelo e passeggiata lungo il Tevere.'
              },
              {
                day: 3,
                title: 'Fontane e Piazze',
                activities: 'Tour delle fontane e piazze più belle: Fontana di Trevi, Piazza di Spagna, Pantheon. Shopping e partenza.'
              }
            ],
            organizer: {
              name: 'Marco Tour Operator',
              rating: 4.9,
              toursCompleted: 156
            }
          },
          2: {
            id: 2,
            title: 'Toscana & Vino',
            destination: 'Toscana, Italia',
            description: 'Un viaggio enogastronomico tra le colline toscane, tra borghi medievali, cantine storiche e paesaggi mozzafiato.',
            price: 450,
            image: '/src/assets/img/tuscany.jpg',
            duration: '5 giorni / 4 notti',
            rating: 4.9,
            reviews: 89,
            maxParticipants: 15,
            availableDates: ['2025-08-10', '2025-08-17', '2025-08-24'],
            services: [
              'Agriturismo di charme',
              'Degustazioni vini DOC',
              'Tour delle cantine',
              'Cooking class tipica',
              'Trasporti privati'
            ],
            itinerary: [
              {
                day: 1,
                title: 'Firenze e Chianti',
                activities: 'Arrivo a Firenze, trasferimento nel Chianti. Prima degustazione in cantina storica.'
              },
              {
                day: 2,
                title: 'San Gimignano e Volterra',
                activities: 'Visita ai borghi medievali di San Gimignano e Volterra. Degustazione di Vernaccia.'
              }
            ],
            organizer: {
              name: 'Tuscany Experience',
              rating: 4.8,
              toursCompleted: 203
            }
          }
        }

        // net delay simulation
        setTimeout(() => {
          setPackageData(mockPackages[id] || null)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Errore nel caricamento del pacchetto:', error)
        setLoading(false)
      }
    }

    fetchPackageDetail()
  }, [id])

  const handleBooking = () => {
    if (!token) {
      navigate('/login')
      return
    }

    if (!selectedDate) {
      alert('Seleziona una data di partenza')
      return
    }

    // add to cart
    const bookingDetails = {
      startDate: selectedDate,
      endDate: selectedDate, // tbd
      passengers: participants
    }

    addToCart(packageData, bookingDetails)

    // confirmation message
    alert(`Pacchetto aggiunto al carrello! Totale: €${packageData.price * participants}`)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: packageData.title,
        text: packageData.description,
        url: window.location.href
      })
    } else {
      // fallback: copia URL
      navigator.clipboard.writeText(window.location.href)
      alert('Link copiato negli appunti!')
    }
  }

  const addToFavorites = () => {
    // logic add to favorites
    console.log('Aggiunto ai preferiti:', id)
    alert('Pacchetto aggiunto ai preferiti!')
  }

  if (loading) {
    return (
      <div className='package-detail-container'>
        <div className='loading'>
          <h2>Caricamento...</h2>
          <div className='spinner' />
        </div>
      </div>
    )
  }

  if (!packageData) {
    return (
      <div className='package-detail-container'>
        <div className='not-found'>
          <h2>🚫 Pacchetto non trovato</h2>
          <p>Il pacchetto che stai cercando non esiste o è stato rimosso.</p>
          <button onClick={() => navigate('/')} className='btn-home'>
            Torna alla Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='package-detail-container'>
      <div className='package-hero'>
        <img src={packageData.image} alt={packageData.title} className='hero-image' />
        <div className='hero-overlay'>
          <div className='hero-content package-detail-hero'>
            <h1>{packageData.title}</h1>
            <p className='destination'>📍 {packageData.destination}</p>
            <div className='hero-stats'>
              <span className='rating'>⭐ {packageData.rating} ({packageData.reviews} recensioni)</span>
              <span className='duration'>⏰ {packageData.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='package-content'>
        <div className='main-content'>
          <section className='description-section'>
            <h2>📖 Descrizione</h2>
            <p>{packageData.description}</p>
          </section>

          <section className='services-section'>
            <h2>✅ Servizi Inclusi</h2>
            <div className='services-grid'>
              {packageData.services.map((service, index) => (
                <div key={index} className='service-item'>
                  <span className='service-icon'>✓</span>
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </section>

          <section className='itinerary-section'>
            <h2>🗓️ Itinerario Dettagliato</h2>
            <div className='itinerary-timeline'>
              {packageData.itinerary.map((day, index) => (
                <div key={index} className='timeline-item'>
                  <div className='timeline-marker'>
                    <span>{day.day}</span>
                  </div>
                  <div className='timeline-content'>
                    <h4>{day.title}</h4>
                    <p>{day.activities}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className='organizer-section'>
            <h2>👤 Organizzatore</h2>
            <div className='organizer-card'>
              <div className='organizer-avatar'>
                {packageData.organizer.name.charAt(0)}
              </div>
              <div className='organizer-info'>
                <h4>{packageData.organizer.name}</h4>
                <div className='organizer-stats'>
                  <span>⭐ {packageData.organizer.rating}</span>
                  <span>🎯 {packageData.organizer.toursCompleted} tour completati</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className='booking-sidebar'>
          <div className='booking-card'>
            <div className='price-section'>
              <h3>€{packageData.price}</h3>
              <span>a persona</span>
            </div>

            <div className='booking-form'>
              <div className='form-group'>
                <label>Data di partenza</label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className='date-select'
                >
                  <option value=''>Seleziona data</option>
                  {packageData.availableDates.map(date => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString('it-IT', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </option>
                  ))}
                </select>
              </div>

              <div className='form-group'>
                <label>Partecipanti</label>
                <div className='participants-selector'>
                  <button
                    type='button'
                    onClick={() => setParticipants(Math.max(1, participants - 1))}
                    className='btn-quantity'
                  >
                    -
                  </button>
                  <span className='participants-count'>{participants}</span>
                  <button
                    type='button'
                    onClick={() => setParticipants(Math.min(packageData.maxParticipants, participants + 1))}
                    className='btn-quantity'
                  >
                    +
                  </button>
                </div>
                <small>Max {packageData.maxParticipants} partecipanti</small>
              </div>

              <div className='total-price'>
                <strong>Totale: €{packageData.price * participants}</strong>
              </div>

              <button
                onClick={handleBooking}
                className='btn-book-now'
                disabled={!selectedDate}
              >
                🎯 Prenota Ora
              </button>
            </div>

            <div className='action-buttons'>
              <button onClick={handleShare} className='btn-action'>
                🔄 Condividi
              </button>
              <button onClick={addToFavorites} className='btn-action'>
                ❤️ Salva
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackageDetail
