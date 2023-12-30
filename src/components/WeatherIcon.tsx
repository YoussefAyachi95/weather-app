import Image from 'next/image'
import React from 'react'
import cloudSun from '../../public/cloud-sun.svg'
import rain from '../../public/rain.svg'
import snow from '../../public/snow.svg'
import sunny from '../../public/sunny.svg'
import thunder from '../../public/thunder.svg'
import windy from '../../public/windy.svg'
import cloudy from '../../public/cloudy.svg'
import fog from '../../public/fog.svg'
import drizzle from '../../public/drizzle.svg'
import { cn } from '@/utils/cn'

export type WeatherCondition = 'Rain' | 'Snow' | 'Clear' | 'Windy' | 'Clouds' | 'Thunderstorm' | 'CloudSun' | 'Drizzle' | 'Fog' ;

interface WeatherIconProps extends React.HTMLProps<HTMLDivElement> {
    condition: WeatherCondition;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, ...props }) => {
    const getWeatherIcon = (condition: WeatherCondition) => {
        switch (condition) {
            case 'Rain':
              return <Image width={100} height={100} alt="Rain Icon" src={rain} />;
            case 'Snow':
              return <Image width={100} height={100} alt="Snow Icon" src={snow} />;
            case 'Clear':
              return <Image width={100} height={100} alt="Sunny Icon" src={sunny} />;
            case 'Windy':
              return <Image width={100} height={100} alt="Windy Icon" src={windy} />;
            case 'Clouds':
              return <Image width={100} height={100} alt="Cloudy Icon" src={cloudy} />;
            case 'Thunderstorm':
              return <Image width={100} height={100} alt="Thunder Icon" src={thunder} />;
            case 'CloudSun':
              return <Image width={100} height={100} alt="CloudSun Icon" src={cloudSun} />;
            case 'Drizzle':
              return <Image width={100} height={100} alt="Drizzle Icon" src={drizzle} />;
            case 'Fog':
              return <Image width={100} height={100} alt="Fog Icon" src={fog} />;
            default:
              return null;
          }
        };
  
    return (
      <div {...props} className={cn('relative h-20 w-20')}>
        {getWeatherIcon(condition)}
      </div>
    );
  };
  
  export default WeatherIcon;