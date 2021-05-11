import React from 'react'
import {connect} from 'react-redux'
import {searchForWeatherReport} from './state-action-store'
import './Weather.css'


class Unconnected_WeatherReport extends React.Component {
  handleInput = (e) => {
    e.preventDefault()
    this.props.searchForWeatherReport(e.target[0].value)
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Current Weather</div>
        <div className="input-form">
          <form onSubmit={this.handleInput}>
            <input
              id="searchText"
              size="30"
              placeholder="Enter location name or coordinates"/>
          </form>
        </div>
        <WeatherReportDisplay/>
      </div>
    )
  }
}

class Unconnected_WeatherReportDisplay extends React.Component {
  render() {
    const {isLoadingLocation, errorLocation, locationResult} = this.props
    if (isLoadingLocation) return <div>Loading...</div>
    if (errorLocation) return <div>{errorLocation.message}</div>
    if (locationResult === null) return <div></div>
    return (
      <div className="weather-report-display">
        <div className="location">
          {locationResult.location_type}: {locationResult.title}
        </div>
        <WeatherResult/>
      </div>
    )
  }
}

class Unconnected_WeatherResult extends React.Component {
  render() {
    const {isLoadingWeather, errorWeather, weatherResult} = this.props
    if (isLoadingWeather) return <div>Loading...</div>
    if (errorWeather) return <div>{errorWeather.message}</div>
    if (weatherResult === null) return <div></div>
    let region = weatherResult.parent
    let currentWeatherDesc =
      weatherResult.consolidated_weather[0].weather_state_name
    let currentWeatherCode =
      weatherResult.consolidated_weather[0].weather_state_abbr
    return (
      <div className="weather-result">
        <div className="location-detail">
          Timezone: {weatherResult.timezone} <br/>
          {region.location_type}: {region.title}
        </div>
        <div className="weather-description">
          {currentWeatherDesc}
        </div>
        <div className="weather-image">
          <embed src={'https://www.metaweather.com/' +
            `static/img/weather/${currentWeatherCode}.svg`}
            type="image/svg+xml"
            title={currentWeatherDesc}
            className="svg"/>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  searchText:        state.searchText,
  isLoadingLocation: state.isLoadingLocation,
  errorLocation:     state.errorLocation,
  locationResult:    state.locationResult,
  isLoadingWeather:  state.isLoadingWeather,
  errorWeather:      state.errorWeather,
  weatherResult:     state.weatherResult,
})

const mapDispatchToProps = {searchForWeatherReport}

const WeatherReport =
  connect(mapStateToProps, mapDispatchToProps)(Unconnected_WeatherReport)

const WeatherReportDisplay =
  connect(mapStateToProps)(Unconnected_WeatherReportDisplay)

const WeatherResult =
  connect(mapStateToProps)(Unconnected_WeatherResult)

export {WeatherReport};