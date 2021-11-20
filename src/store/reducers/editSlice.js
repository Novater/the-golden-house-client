const EDIT_CONSTANTS = require('../../constants/editConstants')

const initialState = {
  inEditMode: false,
  isEditing: false,
  showEditModal: false,
  showSideBar: false,
  editorId: null,
  editorType: null,
  editorData: null,
}

export default function editReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_CONSTANTS.ENTER_EDIT_MODE: {
      return {
        ...state,
        inEditMode: true,
        isEditing: false,
        showEditModal: false,
        showSideBar: false,
        editorId: null,
        editorType: null,
        editorData: null,
      }
    }
    case EDIT_CONSTANTS.LEAVE_EDIT_MODE: {
      return {
        ...state,
        inEditMode: false,
        isEditing: false,
        showEditModal: false,
        showSideBar: false,
        editorId: null,
        editorType: null,
        editorData: null,
      }
    }
    case EDIT_CONSTANTS.START_EDITING: {
      return { ...state, isEditing: true }
    }
    case EDIT_CONSTANTS.SHOW_EDIT_MODAL: {
      return { ...state, showEditModal: true }
    }
    case EDIT_CONSTANTS.CLOSE_EDIT_MODAL: {
      return { ...state, showEditModal: false }
    }
    case EDIT_CONSTANTS.CHANGE_EDIT_MODE: {
      return {
        ...state,
        inEditMode: !state.inEditMode,
        showEditModal: false,
        showSideBar: false,
        editorId: null,
        editorType: null,
        editorData: null,
      }
    }
    case EDIT_CONSTANTS.TOGGLE_EDIT_SIDEBAR: {
      return {
        ...state,
        showSideBar: true,
        editorId: action.payload.editorId,
        editorType: action.payload.type,
        editorData: action.payload.data,
      }
    }
    case EDIT_CONSTANTS.CLOSE_SIDEBAR: {
      return {
        ...state,
        showSideBar: false,
        editorType: null,
        editorId: null,
        editorData: null,
      }
    }
    case EDIT_CONSTANTS.UPDATE_SIDEBAR: {
      if (state.showSideBar) {
        return { ...state, editorData: action.payload.data }
      }
      return { ...state }
    }
    default:
      return { ...state }
  }
}
