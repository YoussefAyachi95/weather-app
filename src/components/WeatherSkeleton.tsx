import React from 'react'

type Props = {}

function WeatherSkeleton({}: Props) {
  return (
    <section className="space-y-8">
      <div className="space-y-4 animate-pulse">
        <div className="flex gap-1 text-2xl items-end">
          <div className="h-8 w-36 bg-gray-300 rounded"></div>
          <div className="h-8 w-36 bg-gray-300 rounded"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="h-12 w-24 bg-gray-300 rounded"></div>
              <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
              <div className="h-12 w-24 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 animate-pulse">
        <p className="text-2xl h-10 w-48 bg-gray-300 rounded"></p>

        {[1, 2, 3, 4, 5, 6, 7].map((index) => (
          <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-10 w-40 bg-gray-300 rounded"></div>
            <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
            <div className="h-10 w-40 bg-gray-300 rounded"></div>
            <div className="h-10 w-40 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeatherSkeleton