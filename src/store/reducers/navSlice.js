const NAV_CONSTANTS = require('../../constants/navConstants')
import _generate from '../../functions/index'
import SampleDataGenerator from '../../config/sampleData'
import axios from 'axios'

const initialState = {
  data: [],
  loading: false,
  saving: false,
}

export default function navReducer(state = initialState, action) {
  switch (action.type) {
    case NAV_CONSTANTS.LOADING_NAV:
      return { ...state, loading: true }
    case NAV_CONSTANTS.NAV_LOAD_SUCCESS:
      return { ...state, data: action.payload.data }
    case NAV_CONSTANTS.NAV_LOAD_FAIL: {
      console.log(action.payload.error)
      return { ...state, loading: false }
    }
    case NAV_CONSTANTS.SAVING_NAV:
      return { ...state, saving: true }
    case NAV_CONSTANTS.SAVING_NAV_SUCCESS:
      return { ...state, saving: false }
    case NAV_CONSTANTS.SAVING_NAV_FAIL: {
      console.log(action.payload.error)
      return { ...state, saving: false }
    }
    case NAV_CONSTANTS.ADD_NAV_ELEMENT: {
      const copyData = [...state.data]
      copyData.push({ title: 'New Element', titleTarget: '/', paths: [] })
      return { ...state, data: copyData }
    }
    default:
      return { ...state }
  }
}

export async function loadNav(dispatch, getState) {
  // THIS NEEDS TO BE HOOKED UP WITH BACKEND
  dispatch({ type: NAV_CONSTANTS.LOADING_NAV })

  try {
    dispatch({
      type: NAV_CONSTANTS.NAV_LOAD_SUCCESS,
      payload: { data: SampleDataGenerator.sampleNavData() },
    })
  } catch (error) {
    dispatch({ type: NAV_CONSTANTS.NAV_LOAD_FAIL, payload: { error } })
  }
}

export async function saveNav(navJSON) {
  return function (dispatch, getState) {
    dispatch({ type: NAV_CONSTANTS.SAVING_NAV })

    try {
    } catch (error) {}
  }
}
