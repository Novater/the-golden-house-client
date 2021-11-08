const EDIT_CONSTANTS = require('../../constants/editConstants')

const initialState = {
  inEditMode: false,
  isEditing: false,
  showEditModal: false,
}

export default function editReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_CONSTANTS.ENTER_EDIT_MODE: {
      return {
        ...state,
        inEditMode: true,
        isEditing: false,
        showEditModal: false,
      }
    }
    case EDIT_CONSTANTS.LEAVE_EDIT_MODE: {
      return {
        ...state,
        inEditMode: false,
        isEditing: false,
        showEditModal: false,
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
      return { ...state, inEditMode: !state.inEditMode, showEditModal: false }
    }
    default:
      return { ...state }
  }
}