import Container from './Container'
import WeatherDetails, { WeatherDetailsProps } from './WeatherDetails'
import WeatherIcon, { WeatherCondition } from './WeatherIcon'
import { toCelsius } from '@/utils/toCelsius';

export interface ForecastDetailProps extends WeatherDetailsProps {
  condition: WeatherCondition;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForecastDetail(props: ForecastDetailProps) {
  const {
    condition = 'Clouds',
    date = "31.12",
    day = "Sunday",
    temp,
    feels_like,
    temp_min,
    temp_max,
    description, 
  } = props


  return (
    <Container className="gap-4">
        <section className="flex gap-4 items-center px-4">
          <div className="flex flex-col gap-1 items-center">
            <WeatherIcon condition={condition} />
            <p>{date}</p>
            <p className="text-sm">{day}</p>
          </div>

          <div className="flex flex-col px-4">
            <span className="text-5xl">
                {toCelsius(temp ?? 0)}°C
            </span>
            <div className="text-xs space-x-1 whitespace-nowrap">
                <span className="ml-3">
                  Feels like:
                  {toCelsius(feels_like ?? 0)}°C
                </span>
            </div>
            <p className="capitalize ml-3">{description}</p>
          </div>
        </section>

        <section className=" overflow-x-auto flex justify-between gap-4 px-4  w-full pr-10">
         <WeatherDetails {...props} />
        </section>
    </Container>
  )
}