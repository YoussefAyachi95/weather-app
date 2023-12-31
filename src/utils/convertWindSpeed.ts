export function convertWindSpeed(speedInMetersPerSecond: number): string {
    const speedInKmsPerHour = speedInMetersPerSecond * 3.6;
    return `${speedInKmsPerHour.toFixed(0)} km/h`
}