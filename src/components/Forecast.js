import Image from 'next/image'
import { iconUrlFromData } from '../helpers/utils';

function Forecast({ title = "", items }) {

  const loader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <div className="flex items-center justify-start mt-6">
        <label className="text-white font-medium uppercase">{title}</label>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white">
        {items.map(({title, temp, icon}, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <p className="font-light xs:text-xs sm:text-base">
              {title}
            </p>
            <span className="w-12 my-1">
              <Image
                loader={loader}
                src={iconUrlFromData(icon)}
                alt="weather Icon 00"
                width={100}
                height={100}
              />
            </span>
            <p className="font-medium xs:text-lg">{temp.toFixed()}°</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Forecast