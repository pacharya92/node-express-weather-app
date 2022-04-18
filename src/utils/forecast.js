import request from 'postman-request'

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=99050b105548f98866954f833813d6c9&query=${latitude},${longitude}&units=f`
  request({url, json: true}, (err, {body}) => {
    if (err) {
      callback('Unable to connect to location services!', undefined)
    } else if (body.error) {
      callback(res, undefined)
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`,
      )
    }
  })
}

export default forecast
