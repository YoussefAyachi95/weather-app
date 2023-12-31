import { Eye, Droplets, Wind, GaugeCircle, Sunrise, Sunset } from 'lucide-react';

export interface WeatherDetailsProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

export default function WeatherDetails(props: WeatherDetailsProps) {
    const {
        visibility = "25 km",
        humidity = "61%",
        windSpeed = "7 km/h",
        airPressure = "1012 hPa",
        sunrise = "6:20",
        sunset ="18:48",
    } = props;


    return (
        <>
            <SingleWeatherDetail icon={<Eye />} information="Visibility" value={visibility} />
            <SingleWeatherDetail icon={<Droplets />} information="Humidity" value={humidity} />
            <SingleWeatherDetail icon={<Wind />} information="Wind Speed" value={windSpeed} />
            <SingleWeatherDetail icon={<GaugeCircle />} information="Air Pressure" value={airPressure} />
            <SingleWeatherDetail icon={<Sunrise />} information="Sunrise" value={sunrise} />
            <SingleWeatherDetail icon={<Sunset />} information="Sunset" value={sunset} />
        </>
    )
}

export interface SingleWeatherDetailProps {
    information: string;
    icon: React.ReactNode;
    value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
    return (
        <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
            <p className="whitespace-nowrap">{props.information}</p>
            <div className="text-3xl">{props.icon}</div>
            <p>{props.value}</p>
        </div>
    )
}