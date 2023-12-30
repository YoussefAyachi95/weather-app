"use client"

import Container from '@/components/Container';
import Navbar from '@/components/Navbar'
import WeatherIcon, { WeatherCondition } from '@/components/WeatherIcon';
import { toCelsius } from '@/utils/toCelsius';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { useQuery } from 'react-query';

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherListItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

interface WeatherListItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}


export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>('repoData', async () => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=bonn&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`)
    return data
  })

  const firstData = data?.list[0]

  console.log(data)

  if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">
        Loading...
      </p>
    </div>
  )

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="flex gap-1 text-2xl items-end">
                  {
                    format(parseISO(firstData?.dt_txt ?? ""), "EEEE")
                  },
                  <span>
                  {
                    format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")
                  }
                </span>
              </h2>
              <Container className="gap-10 px-6 items-center">
                {/* TEMPERATURE */}
                  <div className="flex flex-col px-4 w-1/5">
                    <span className="text-5xl">
                        { toCelsius(firstData?.main.temp  ?? 0)} °C
                    </span>
                    <p className="text-xs space-x-1 whitespace-nowrap">
                        <span className="ml-3">Feels like: { toCelsius(firstData?.main.feels_like ?? 0)} °C</span>
                    </p>
                    <p className="text-xs space-x-2">
                      <span className="ml-3">{ toCelsius(firstData?.main.temp_max ?? 0)} °C ↑{" "}</span>
                      <span className="ml-3">{ toCelsius(firstData?.main.temp_min ?? 0)} °C ↓{" "}</span>
                    </p>
                  </div>
                {/* TIME AND WEATHER ICON */}
                  <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                      {
                        data?.list.map((d, index) => 
                          <div key={index} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                              <p className="whitespace-nowrap">
                                {format(parseISO(d.dt_txt), "HH:mm")}
                              </p>
                              <WeatherIcon condition={d.weather[0].main as WeatherCondition} />
                              <p>
                                {toCelsius(d?.main.temp ?? 0)}°C
                              </p>
                          </div>
                        )
                      }
                  </div>
              </Container>
            </div>
          </section>
          {/* 7 DAYS FORECAST */}
          <section className="flex w-full">
            <p></p>
          </section>
      </main>
    </div>
  )
}
