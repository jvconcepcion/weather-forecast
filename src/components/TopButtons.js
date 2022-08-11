import React from 'react'

function TopButtons({selectedCountry, setQuery}) {

  const cities = [
    {
      id: 1,
      title: 'Tokyo'
    },
    {
      id: 2,
      title: 'Shanghai'
    },
    {
      id: 3,
      title: 'Seoul'
    },
    {
      id: 4,
      title: 'Manila'
    },
    {
      id: 5,
      title: 'Singapore'
    }
  ]
  
  return (
    <div className="flex items-center justify-around my-6">
      {cities.map(({ id, title }) => (
        <button 
          key={id} 
          className={`text-white xs:text-sm sm:text-lg font-medium ${selectedCountry.toLowerCase() === title.toLowerCase() ? 'opacity-50 pointer-events-none' : ''}`}
          onClick={() => setQuery(title)}
        >{title}</button>
      ))}
    </div>
  )
}

export default TopButtons