import { DateTime } from "luxon"

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(process.env.BASE_URL + "/" + infoType)
  url.search = new URLSearchParams({...searchParams, appid: process.env.API_KEY})

  return fetch(url)
    .then(res => res.json())
    .catch(e => console.log(e))
}

export const formatToLocalTime = (
  secs, 
  zone, 
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime
  .fromSeconds(secs)
  .setZone(zone)
  .toFormat(format)

export const iconUrlFromData = data => `http://openweathermap.org/img/wn/${data}@2x.png`

const formatCurrentWeather = data => {
  // console.log(data)
  if (data.cod !== 200) return
  const {
    coord: {lat, lon},
    main: {
      temp,
      feels_like,
      temp_min,
      temp_max,
      humidity
    },
    name,
    dt,
    sys: {country, sunrise, sunset},
    weather,
    wind: { speed }
  } = data

  const { main: details, icon} = weather[0]

  return {
    lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt,
    country, sunrise, sunset, details, icon, speed
  }
}

const formatForeCastWeaher = data => {
  let { timezone, daily, hourly } = data
  daily = daily.slice(1, 6).map(d => {
    return {
      title: formatToLocalTime(d.dt, timezone, 'ccc'),
      temp: d.temp.day,
      icon: d.weather[0].icon
    }
  })

  hourly = hourly.slice(1, 6).map(d => {
    return {
      title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
      temp: d.temp,
      icon: d.weather[0].icon
    }
  })

  return {timezone, daily, hourly}
}

export const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData('weather', searchParams)
    .then(formatCurrentWeather)

  const { lat, lon } = formattedCurrentWeather

  const formattedForecastWeather = await getWeatherData('onecall', {
    lat,
    lon,
    exclude: "current, minutely, alerts",
    units: searchParams.units,
  })
  .then(formatForeCastWeaher)
  .catch(e => console.log(e))

  return {...formattedCurrentWeather, ...formattedForecastWeather}
}