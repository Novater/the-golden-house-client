const POST_CONSTANTS = require('../../constants/postConstants')
import _generate from '../../functions/index'
import SampleDataGenerator from '../../config/sampleData'
import _ from 'lodash'
import axios from 'axios'

const ObjectId = require('bson-objectid')

axios.defaults.withCredentials = true

const initialState = {
  posts: [],
  savingPosts: false,
  loadingPosts: false,
  tab: '',
  showSaveModal: false,
  saveFailed: false,
}

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case POST_CONSTANTS.SET_TAB: {
      return {
        ...state,
        tab: action.payload.tab,
      }
    }
    case POST_CONSTANTS.LOADING_POSTS: {
      return {
        ...state,
        loadingPosts: true,
        posts: [],
      }
    }
    case POST_CONSTANTS.LOADING_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.payload.posts,
        loadingPosts: false,
      }
    }
    case POST_CONSTANTS.LOADING_POSTS_FAILURE: {
      console.error(action.payload.error)
      return {
        ...state,
        loadingPosts: false,
      }
    }
    case POST_CONSTANTS.INSERT_POST: {
      const newRow = action.payload.newRow
      const row = action.payload.row
      const col = action.payload.col

      action.payload.post._id = new ObjectId()
      let copiedPosts = []

      for (let i = 0; i < state.posts.length; i += 1) {
        copiedPosts[i] = state.posts[i].slice()
      }

      if (newRow) {
        copiedPosts.splice(row, 0, [action.payload.post])
        return {
          ...state,
          posts: copiedPosts,
        }
      }

      copiedPosts[row].splice(col, 0, action.payload.post)
      return {
        ...state,
        posts: copiedPosts,
      }
    }
    case POST_CONSTANTS.EDIT_POST: {
      const { row, col, post } = action.payload
      let copiedPosts = []

      for (let i = 0; i < state.posts.length; i += 1) {
        copiedPosts[i] = state.posts[i].slice()
      }

      let copiedPost = { ...copiedPosts[row][col] }
      _.keys(post).map((editKey) => {
        copiedPost[editKey] = post[editKey]
      })
      copiedPosts[row][col] = copiedPost
      return {
        ...state,
        posts: copiedPosts,
      }
    }
    case POST_CONSTANTS.DELETE_POST: {
      const row = action.payload.row
      const col = action.payload.col
      let copiedPosts = []

      for (let i = 0; i < state.posts.length; i += 1) {
        copiedPosts[i] = state.posts[i].slice()
      }

      copiedPosts[row].splice(col, 1)

      if (copiedPosts[row].length === 0) copiedPosts.splice(row, 1)

      return {
        ...state,
        posts: copiedPosts,
      }
    }
    case POST_CONSTANTS.SHOW_SAVE_MODAL: {
      return {
        ...state,
        showSaveModal: true,
      }
    }
    case POST_CONSTANTS.CLOSE_SAVE_MODAL: {
      return {
        ...state,
        showSaveModal: false,
      }
    }
    case POST_CONSTANTS.SAVING_POSTS: {
      return {
        ...state,
        savingPosts: true,
        showSaveModal: false,
      }
    }
    case POST_CONSTANTS.SAVING_POSTS_SUCCESS: {
      return {
        ...state,
        savingPosts: false,
      }
    }
    case POST_CONSTANTS.SAVING_POSTS_FAILURE: {
      console.error(action.payload.error)
      return {
        ...state,
        savingPosts: false,
        saveFailed: true,
      }
    }
    case POST_CONSTANTS.CLOSE_SAVE_POST_FAILURE: {
      return {
        ...state,
        saveFailed: false,
      }
    }
    case POST_CONSTANTS.WIPE_POSTS: {
      return {
        ...state,
        posts: [],
      }
    }
    default: {
      return { ...state }
    }
  }
}

export async function loadPosts(dispatch, getState) {
  dispatch({ type: POST_CONSTANTS.LOADING_POSTS })

  const SERVER_URL = _generate.serverFunctions.getServerURL()
  const tabName = getState().post.tab

  try {
    const postData = await axios.get(`${SERVER_URL}/post/${tabName}`)
    dispatch({
      type: POST_CONSTANTS.LOADING_POSTS_SUCCESS,
      payload: {
        posts: postData.data, // SampleDataGenerator.samplePostData(),
      },
    })
  } catch (error) {
    dispatch({
      type: POST_CONSTANTS.LOADING_POSTS_FAILURE,
      error,
    })
  }
}

export async function savePosts(dispatch, getState) {
  dispatch({ type: POST_CONSTANTS.SAVING_POSTS })

  const SERVER_URL = _generate.serverFunctions.getServerURL()
  const posts = getState().post.posts
  const tab = getState().post.tab
  try {
    const savePostRes = await axios.post(`${SERVER_URL}/post/submit`, {
      posts,
      tab,
    })
    console.log(savePostRes.status)
    if (savePostRes.status != 200)
      throw Error({ message: 'Something went wrong updating posts.' })
    dispatch({
      type: POST_CONSTANTS.SAVING_POSTS_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: POST_CONSTANTS.SAVING_POSTS_FAILURE,
      payload: {
        error,
      },
    })
  }
}
