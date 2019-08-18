import {
    SECTIONS_ADD_SECTION,
    SECTIONS_REMOVE_SECTION,
    SECTIONS_TOGGLE_SECTION,
    FETCH_SAVED_SECTIONS_SUCCESS
  } from '../actions/sectionActions'
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'RESET_APP':
        return initialState
      case SECTIONS_ADD_SECTION:
        return [
          ...state.filter(section => section.id !== action.payload.id),
          action.payload
        ]

      case FETCH_SAVED_SECTIONS_SUCCESS:
        return [].concat(action.payload)

      case SECTIONS_REMOVE_SECTION:
        return state.filter(stateItem => {
          let payload = Array.isArray(action.payload) ? action.payload : [action.payload]
          return payload.filter((payloadItem) => (payloadItem.id === stateItem.id)).length === 0
        })
  
      case SECTIONS_TOGGLE_SECTION:
        return state.map(section => section.id === action.payload.id ? { ...section, muted: !section.muted || false } : section)
  
      default:
        return state
    }
  }
  
  const initialState = [
    {
    id: 'politics',
    name: 'politics',
    muted: false
    },
    {
    id: 'horoscope',
    name: 'horoscope',
    muted: false
    },
    {
    id: 'classifieds',
    name: 'classifieds'
    },
    {
    id: 'world',
    name: 'world'
    },
    {
    id: 'business',
    name: 'business'
    },
    {
    id: 'technology',
    name: 'technology'
    },
    {
    id: 'variety',
    name: 'variety'
    }
]
  