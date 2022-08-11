import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TopButtons from '../components/TopButtons'
import Inputs from '../components/Inputs'
import TimeAndLocation from '../components/TimeAndLocation'
import TemperatureAndDetails from '../components/TemperatureAndDetails'
import Forecast from '../components/Forecast'

import { getFormattedWeatherData } from '../helpers/utils'

export async function getStaticProps() {
  const weatherData = await getFormattedWeatherData({q: 'tokyo'})

  return {
    props: {
      weatherData,
    },
    revalidate: 5,
  }
}

export default function Home({weatherData}) {

  const [query, setQuery] = useState({q: 'tokyo'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(weatherData)

  const formatBGByTemp = () => {
    if(!weather) return 'from-cyan-700 to-blue-700'
    switch (weather.details) {
      case "Clouds":
      case "Clear":
        return 'from-cyan-700 to-blue-700'
      case "Thunderstorm":
      case "Drizzle":
      case "Rain":
      case "Snow":
      case "Mist":
        return 'from-gray-200 from-gray-700'
      default:
        return 'from-yellow-700 to-orange-700'
    }
  }

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({...query, units})
        .then(data => {
        toast.success(`Successfully retrieved the weather for ${data.name}, ${data.country}`)
        setWeather(data)
        })
        .catch(e => {
          setWeather(null)
        })
    }
    
    fetchWeather()
  }, [query, units])

  return (
    <>
      <Head>
        <title>Weather Forecast</title>
        <meta name="description" content="Weather Forecast" />
        <link rel="icon" href="/Jett-Chibi.ico" />
      </Head>
      <main className={`mx-auto max-w-screen-md xs:mt-0 sm:mt-4 py-5 xs:px-5 sm:px-32 bg-gradient-to-br h-fit shadow-gray-400 ${formatBGByTemp()}`}>
        { weather ? (
          <>
            <TopButtons selectedCountry={weather.name} setQuery={(val) => setQuery({q: val})} />
            <Inputs 
              units={units}
              setQuery={(val) => setQuery(val)} 
              setUnits={(val) => setUnits(val)}
            />

            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />
            <Forecast title="Hourly Forecast" items={weather.hourly} />
            <Forecast title="Daily Forecast" items={weather.daily} />
          </>
        ) : (
          <p className="text-center">
            City not found. Click 
            <Link href="/" passHref>
              <a 
                className="underline ml-1"
                onClick={() => setQuery({q: 'tokyo'})}
              >here</a>
            </Link> to return
          </p>
        )
      }
        
      </main>
      <footer className="flex items-center justify-center bg-black py-3 border-t-2 border-white xs:mt-0 sm:mt-4">
          © 2022 JThan
      </footer>
      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </>
  )
}
