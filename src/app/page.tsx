"use client"

import Container from '@/components/Container';
import ForecastDetail from '@/components/ForecastDetail';
import Navbar from '@/components/Navbar'
import WeatherDetails from '@/components/WeatherDetails';
import WeatherIcon, { WeatherCondition } from '@/components/WeatherIcon';
import { convertWindSpeed } from '@/utils/convertWindSpeed';
import { toCelsius } from '@/utils/toCelsius';
import { toKM } from '@/utils/toKM';
import axios from 'axios';
import { format, fromUnixTime, parseISO } from 'date-fns';
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


  const uniqueDates = [
    ...new Set(
      data?.list.map((entry) => new Date(entry.dt * 1000).toISOString().split("T")[0])
    )
  ]

  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    })
  })

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
            <div className="flex gap-4">
              {/* LEFT CONTAINER */}
                  <Container className="w-fit justify-center flex-col px-4 items-center">
                    <p className="capitalize text-center">
                      {firstData?.weather[0].description}
                    </p>
                    <WeatherIcon condition={firstData?.weather[0].main as WeatherCondition} />
                  </Container>
              {/* RIGHT CONTAINER */}
                  <Container className="bg-yellow-400/80 px-6 gap-4 justify-between">
                        <WeatherDetails
                          visibility={toKM(firstData?.visibility ?? 10000)} 
                          humidity={`${firstData?.main.humidity} %`}
                          windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
                          airPressure={`${firstData?.main.pressure} hPa`}
                          sunrise={format(
                            fromUnixTime(data?.city.sunrise ?? 1704008013),
                            "H:mm"
                          )}
                          sunset={format(
                            fromUnixTime(data?.city.sunset ?? 1704036895),
                            "H:mm"
                          )}
                          />
                  </Container>      
            </div>
          </section>
          {/* 7 DAYS FORECAST */}
          <section className="flex w-full flex-col gap-4">
            <p className="text-2xl">
              Forecast (7 days)
            </p>
            {
              firstDataForEachDate.map((d) => (
                <ForecastDetail 
                  key={d?.weather[0].id}
                  condition={d?.weather[0].main as WeatherCondition}
                  date={format(parseISO(d?.dt_txt ?? ""), "dd.MM")}
                  day={format(parseISO(d?.dt_txt ?? ""), "EEEE")}
                  feels_like={d?.main.feels_like ?? 0}
                  temp={d?.main.temp ?? 0}
                  temp_max={d?.main.temp_max ?? 0}
                  temp_min={d?.main.temp_min ?? 0}
                  description={d?.weather[0].description ?? ""}
                  visibility={toKM(d?.visibility ?? 10000)} 
                  humidity={`${d?.main.humidity} %`}
                  windSpeed={convertWindSpeed(d?.wind.speed ?? 1.64)}
                  airPressure={`${d?.main.pressure} hPa`}
                  sunrise={format(
                    fromUnixTime(data?.city.sunrise ?? 1704008013),
                    "H:mm"
                  )}
                  sunset={format(
                    fromUnixTime(data?.city.sunset ?? 1704036895),
                    "H:mm"
                  )}
                />
              ))
            }
          </section>
      </main>
    </div>
  )
}
