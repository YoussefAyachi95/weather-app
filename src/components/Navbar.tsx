"use client"

import { useState } from "react"
import axios from "axios"
import Image from "next/image"
import weatherSvg from '../../public/weatherIcon.svg'
import currentLocationSvg from '../../public/currentLocation.svg'
import SearchBox from "./SearchBox"
import SuggestionBox from "./SuggestionBox"
import { useAtom } from "jotai"
import { loadingCityAtom, placeAtom } from "@/app/atom"

type Props = { location? :  string }


export default function Navbar({
    location
}: Props) {
    const [city, setCity] = useState("")
    const [error, setError] = useState("")
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [place, setPlace] = useAtom(placeAtom)
    const [_, setLoadingPlace] = useAtom(loadingCityAtom)

    async function handleInputChange(value: string) {
        setCity(value)
        if (value.length >= 3) {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
                )

                const suggestions = response.data.list.map((items: any) => items.name)
                setSuggestions(suggestions) 
                setError("")
                setShowSuggestions(true)

            } catch (e) {
                setSuggestions([])
                setShowSuggestions(false)
            }
        } else {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }

    function handleSuggestionClick(value: string) {
        setCity(value)
        setShowSuggestions(true)
    }

    function handleSubmitSearch (e: React.FormEvent<HTMLFormElement>) {
        setLoadingPlace(true)
        e.preventDefault()

        if(suggestions.length === 0) {
            setError("Location not found")
            setLoadingPlace(false)
        } else {
            setError("")
            setTimeout(() => {
                setLoadingPlace(false)
                setPlace(city)
                setShowSuggestions(false)
            }, 500)
        }
    }

    function handleCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords
                try {
                    setLoadingPlace(true)
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)
                    setTimeout(() => {
                        setLoadingPlace(false)
                        setPlace(response.data.name)
                    }, 500)
                } catch (error) {
                    setLoadingPlace(false)
                }
            })
        }
    }

    return (
        <>
            <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
                <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
                    <div className="flex items-center justify-center gap-2">
                        <h2 className="text-gray-500 text-3xl">Weather App</h2>
                        <Image 
                            src={weatherSvg}
                            alt="Weather App SVG"
                            width={50}
                            height={50}
                            className="mt-1"
                        />
                    </div>
                    {/*      */}
                    <section className="flex gap-2 items-center">
                        <Image 
                            title="Your current location"
                            onClick={handleCurrentLocation}
                            src={currentLocationSvg}
                            alt="Location SVG"
                            width={40}
                            height={40}
                            className="hover:opacity-80 cursor-pointer"
                        />
                        <p className="text-slate-900/80 text-sm">{location}</p>
                        <div className="relative hidden md:flex">
                            <SearchBox value={city} onChange={(e) => handleInputChange(e.target.value)} onSubmit={handleSubmitSearch} />
                            <SuggestionBox {...{showSuggestions, suggestions, handleSuggestionClick, error}} />
                        </div>
                    </section>
                </div>
            </nav>
            <section className="flex max-w-7xl px-3 md:hidden">
                <div className="relative">
                                <SearchBox value={city} onChange={(e) => handleInputChange(e.target.value)} onSubmit={handleSubmitSearch} />
                                <SuggestionBox {...{showSuggestions, suggestions, handleSuggestionClick, error}} />
                </div>
            </section>
        </>
    )
}


