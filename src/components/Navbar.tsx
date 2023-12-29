import Image from "next/image"
import weatherSvg from '../../public/weatherIcon.svg'
import currentLocationSvg from '../../public/currentLocation.svg'
import SearchBox from "./SearchBox"


export default function Navbar() {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
            <p className="flex items-center justify-center gap-2">
                <h2 className="text-gray-500 text-3xl">Weather App</h2>
                <Image 
                    src={weatherSvg}
                    alt="Weather App SVG"
                    width={50}
                    height={50}
                    className="mt-1"
                />
            </p>
            {/*      */}
            <section className="flex gap-2 items-center">
                <Image 
                    src={currentLocationSvg}
                    alt="Location SVG"
                    width={40}
                    height={40}
                    className="hover:opacity-80 cursor-pointer"
                />
                <p className="text-slate-900/80 text-sm">Germany</p>
                <div>
                    <SearchBox />
                </div>
            </section>
        </div>
    </nav>
  )
}
