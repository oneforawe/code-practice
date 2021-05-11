import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

// State Prep
const stateInitial = {
  searchText: '',
  isLoadingLocation: false,
  errorLocation: null,
  locationResult: null,
  isLoadingWeather: false,
  errorWeather: null,
  weatherResult: null,
}

// Action Constants
const RESET_STATE          = 'RESET_STATE';
const SET_SEARCH_TEXT      = 'SET_SEARCH_TEXT';
const GET_LOCATION_BEGIN   = 'GET_LOCATION_BEGIN';
const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';
const GET_LOCATION_ERROR   = 'GET_LOCATION_ERROR';
const GET_WEATHER_BEGIN    = 'GET_WEATHER_BEGIN';
const GET_WEATHER_SUCCESS  = 'GET_WEATHER_SUCCESS';
const GET_WEATHER_ERROR    = 'GET_WEATHER_ERROR';

// Action Creators
export function searchForWeatherReport(newSearchText) {
  /* Return a "thunk function" (thunkified function?) that immediately gets
  ** called and dispatching other actions, some immediately some eventually. */
  return (dispatch, getState) => {
    let state = getState()
    if (newSearchText !== state.searchText) {
      store.dispatch({type: SET_SEARCH_TEXT, newSearchText})
      if (newSearchText === '') { dispatch({type: RESET_STATE}) }
      else {
        let location;
        dispatch({type: GET_LOCATION_BEGIN})
        /* We'll fetch from weather.daveceddia.com, which gets its data from
        ** https://www.metaweather.com.  See https://www.metaweather.com/api/. */
        fetch('https://weather.daveceddia.com/' +
          `api/location/search/?query=${newSearchText}`)
          .then(response => response.json())
          .then(json => {
            if (json.length === 0) {
              location = {location_type: 'unknown', title: 'no search results'}
            }
            else {
              location = json[0]
              getWeatherReport(location, dispatch)
            }
            dispatch({type: GET_LOCATION_SUCCESS, location})
          })
          .catch(error => dispatch({type: GET_LOCATION_ERROR, error}))
      }
    }
  }
}

function getWeatherReport(location, dispatch) {
  dispatch({type: GET_WEATHER_BEGIN})
  fetch(`https://weather.daveceddia.com/api/location/${location.woeid}`)
    .then(response => response.json())
    .then(json => dispatch({type: GET_WEATHER_SUCCESS, weatherResult: json}) )
    .catch(error => dispatch({type: GET_WEATHER_ERROR, error}))
}


const reducer = (state = stateInitial, action) => {
  switch (action.type) {
    case RESET_STATE:
      return {
        ...stateInitial,
      }
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.newSearchText,
      }
    case GET_LOCATION_BEGIN:
      return {
        ...state,
        isLoadingLocation: true,
        errorLocation: null,
        errorWeather: null,
        weatherResult: null,
      }
     case GET_WEATHER_BEGIN:
      return {
        ...state,
        isLoadingWeather: true,
      }
    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        isLoadingLocation: false,
        locationResult: action.location,
      }
    case GET_WEATHER_SUCCESS:
      return {
        ...state,
        isLoadingWeather: false,
        weatherResult: action.weatherResult,
      }
    case GET_LOCATION_ERROR:
      return {
        ...state,
        isLoadingLocation: false,
        errorLocation: action.error,
      }
    case GET_WEATHER_ERROR:
      return {
        ...state,
        isLoadingWeather: false,
        errorWeather: action.error,
      }
    default:
      return state
  }
}

export const store = createStore(reducer, applyMiddleware(thunk))

//store.dispatch(getWeatherReport('san'))