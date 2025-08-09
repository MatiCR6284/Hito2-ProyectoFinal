import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './packagesList.css'

const PackagesList = () => {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    destination: '',
    minPrice: '',
    maxPrice: '',
    duration: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    // test api call
    const fetchPackages = async () => {
      try {
        // test data
        const mockPackages = [
          {
            id: 1,
            title: 'Roma Classica',
            destination: 'Roma, Italia',
            description: 'Esplora la città eterna con un tour di 3 giorni',
            price: 299,
            image: '/src/assets/img/rome.jpg',
            duration: '3 giorni',
            rating: 4.8,
            reviews: 124
          },
          {
            id: 2,
            title: 'Toscana & Vino',
            description: 'Tour enogastronomico tra le colline toscane',
            destination: 'Toscana, Italia',
            price: 450,
            image: '/src/assets/img/tuscany.jpg',
            duration: '5 giorni',
            rating: 4.9,
            reviews: 89
          },
          {
            id: 3,
            title: 'Costa Amalfitana',
            description: 'Relax e bellezza sulla costiera più famosa d\'Italia',
            destination: 'Amalfi, Italia',
            price: 599,
            image: '/src/assets/img/amalfi.jpg',
            duration: '7 giorni',
            rating: 4.7,
            reviews: 156
          },
          {
            id: 4,
            title: 'Venezia Romantica',
            description: 'Un weekend romantico nella città dei canali',
            destination: 'Venezia, Italia',
            price: 349,
            image: '/src/assets/img/venice.jpg',
            duration: '2 giorni',
            rating: 4.6,
            reviews: 203
          },
          {
            id: 5,
            title: 'Sicilia Autentica',
            description: 'Scopri i tesori nascosti della Sicilia',
            destination: 'Sicilia, Italia',
            price: 520,
            image: '/src/assets/img/sicilia.jpg',
            duration: '6 giorni',
            rating: 4.8,
            reviews: 98
          },
          {
            id: 6,
            title: 'Dolomiti Adventure',
            description: 'Trekking e natura nelle montagne più belle',
            destination: 'Trentino, Italia',
            price: 380,
            image: '/src/assets/img/dolomiti.jpg',
            duration: '4 giorni',
            rating: 4.9,
            reviews: 67
          }
        ]

        // net delay
        setTimeout(() => {
          setPackages(mockPackages)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Errore nel caricamento dei pacchetti:', error)
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  const filteredPackages = packages.filter(pkg => {
    const matchesDestination = !filters.destination ||
      pkg.destination.toLowerCase().includes(filters.destination.toLowerCase())

    const matchesMinPrice = !filters.minPrice || pkg.price >= parseInt(filters.minPrice)
    const matchesMaxPrice = !filters.maxPrice || pkg.price <= parseInt(filters.maxPrice)

    const matchesDuration = !filters.duration || pkg.duration.includes(filters.duration)

    return matchesDestination && matchesMinPrice && matchesMaxPrice && matchesDuration
  })

  const clearFilters = () => {
    setFilters({
      destination: '',
      minPrice: '',
      maxPrice: '',
      duration: ''
    })
  }

  if (loading) {
    return (
      <div className='packages-container'>
        <div className='loading'>
          <h2>Caricamento pacchetti...</h2>
          <div className='spinner' />
        </div>
      </div>
    )
  }

  return (
    <div className='packages-container'>
      <div className='packages-header'>
        <h1>🧳 Tutti i Pacchetti</h1>
        <p>Trova il viaggio perfetto per te</p>
      </div>

      <div className='filters-section'>
        <h3>🔍 Filtra i risultati</h3>
        <div className='filters-grid'>
          <div className='filter-group'>
            <label>Destinazione</label>
            <input
              type='text'
              placeholder='es. Roma, Toscana...'
              value={filters.destination}
              onChange={(e) => handleFilterChange('destination', e.target.value)}
              className='filter-input'
            />
          </div>

          <div className='filter-group'>
            <label>Prezzo minimo (€)</label>
            <input
              type='number'
              placeholder='0'
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className='filter-input'
            />
          </div>

          <div className='filter-group'>
            <label>Prezzo massimo (€)</label>
            <input
              type='number'
              placeholder='1000'
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className='filter-input'
            />
          </div>

          <div className='filter-group'>
            <label>Durata</label>
            <select
              value={filters.duration}
              onChange={(e) => handleFilterChange('duration', e.target.value)}
              className='filter-select'
            >
              <option value=''>Tutte</option>
              <option value='2'>Weekend (2 giorni)</option>
              <option value='3'>Breve (3 giorni)</option>
              <option value='4'>Medio (4-5 giorni)</option>
              <option value='6'>Lungo (6-7 giorni)</option>
            </select>
          </div>

          <div className='filter-actions'>
            <button onClick={clearFilters} className='btn-clear-filters'>
              🗑️ Pulisci
            </button>
          </div>
        </div>

        <div className='results-count'>
          Trovati {filteredPackages.length} pacchetti
        </div>
      </div>

      <div className='packages-grid'>
        {filteredPackages.length === 0
          ? (
            <div className='no-results'>
              <h3>😕 Nessun pacchetto trovato</h3>
              <p>Prova a modificare i filtri di ricerca</p>
              <button onClick={clearFilters} className='btn-reset'>
                Mostra tutti i pacchetti
              </button>
            </div>
            )
          : (
              filteredPackages.map((pkg) => (
                <div key={pkg.id} className='package-card'>
                  <div className='package-image-container'>
                    <img src={pkg.image} alt={pkg.title} className='package-image' />
                    <div className='package-overlay'>
                      <button
                        className='btn-view-details'
                        onClick={() => navigate(`/package/${pkg.id}`)}
                      >
                        👁️ Dettagli
                      </button>
                    </div>
                  </div>

                  <div className='package-info'>
                    <h3>{pkg.title}</h3>
                    <p className='package-destination'>📍 {pkg.destination}</p>
                    <p className='package-description'>{pkg.description}</p>

                    <div className='package-meta'>
                      <span className='duration'>⏰ {pkg.duration}</span>
                      <span className='rating'>⭐ {pkg.rating} ({pkg.reviews})</span>
                    </div>

                    <div className='package-footer'>
                      <div className='package-price'>
                        <strong>€{pkg.price}</strong>
                        <small>a persona</small>
                      </div>
                      <button
                        className='btn-book'
                        onClick={() => navigate(`/package/${pkg.id}`)}
                      >
                        Prenota
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
      </div>
    </div>
  )
}

export default PackagesList
