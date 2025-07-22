function calculateWindChill(temperature, wind_speed) {
    return 35.74 + (0.6215 * temperature) - (35.75 * wind_speed ** 0.16) + (0.4275 * temperature * wind_speed ** 0.16);
}
function convertFahrToCels(temperature_in_fahr) {
    return (temperature_in_fahr - 32) * (5/9);
}
function convertMphToKph(mph) {
    return mph * 1.6093;
}
const current_temperature_fahr = 49;
const current_wind_speed_mph = 7;
const temperature_span = document.getElementById('temperature');
if(temperature_span) {
    temperature_span.textContent = (Math.round(convertFahrToCels(current_temperature_fahr) * 10) / 10).toString() + '°C';
}
const wind_speed_span = document.getElementById('wind-speed');
if(wind_speed_span) {
    wind_speed_span.textContent = (Math.round(convertMphToKph(current_wind_speed_mph) * 10) / 10).toString() + ' km/h';
}
const wind_chill_span = document.getElementById('wind-chill');
if(wind_chill_span) {
    if(current_temperature_fahr <= 50 && current_wind_speed_mph > 3) {
        wind_chill_span.textContent = (Math.round(convertFahrToCels(calculateWindChill(current_temperature_fahr, current_wind_speed_mph)) * 10) / 10).toString() + '°C';
    } else {
        wind_chill_span.textContent = 'N/A';
    }
}
