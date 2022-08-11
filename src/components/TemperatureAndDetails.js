import React from 'react'
import Image from 'next/image'

import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from '@iconscout/react-unicons'
import { iconUrlFromData, formatToLocalTime } from '../helpers/utils';

function TemperatureAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone
  }
}) {

  const loader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      {/* <div className="flex items-center justify-center py-6 xs:text-sm sm:text-xl text-cyan-300">
        <p>{details}</p>
      </div> */}
      <div className="flex flex-row items-center justify-between text-white py-3">
        <span className="w-20">
          <Image
            loader={loader}
            src={iconUrlFromData(icon)}
            alt="weather Icon"
            width={100}
            height={100}
          />
        </span>
        <p className="xs:text-3xl sm:text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            <label className="xs:text-xs sm:text-sm">Real fell:</label>
            <span className="font-medium ml-1 xs:text-xs sm:text-sm">{feels_like.toFixed()}°</span>
          </div>

          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            <label className="xs:text-xs sm:text-sm">Humidity:</label>
            <span className="font-medium ml-1 xs:text-xs sm:text-sm">{humidity.toFixed()}%</span>
          </div>

          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            <label className="xs:text-xs sm:text-sm">Wind:</label>
            <span className="font-medium ml-1 xs:text-xs sm:text-sm">{speed.toFixed()} km/h</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <UilSun />
        <p className="font-light xs:text-xs sm:text-lg">Rise: <span className="font-medium xs:text-2xs sm:text-lg">{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span></p>
        <p className="font-light">|</p>

        <UilSunset />
        <p className="font-light xs:text-xs sm:text-lg">Set: <span className="font-medium xs:text-2xs sm:text-lg">{formatToLocalTime(sunset, timezone, "hh:mm a")}</span></p>
        <p className="font-light">|</p>

        <UilSun />
        <p className="font-light xs:text-xs sm:text-lg">High: <span className="font-medium xs:text-xs sm:text-lg">{temp_max.toFixed()}°</span></p>
        <p className="font-light">|</p>

        <UilSun />
        <p className="font-light xs:text-xs sm:text-lg">Low: <span className="font-medium xs:text-xs sm:text-lg">{temp_min.toFixed()}°</span></p>
      </div>
    </>
  )
}

export default TemperatureAndDetails