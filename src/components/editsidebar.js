import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import TableEditor from './table/edittable'
import ContentSelector from './contentselector'
import store from '../store/store'
const EDIT_CONSTANTS = require('../constants/editConstants')

function EditSideBar({ type, content, editorId }) {
  const TYPES = {
    TABLE: 'table',
    NEWCONTENT: 'new-content',
  }

  function finishEdit() {
    store.dispatch({ type: EDIT_CONSTANTS.CLOSE_SIDEBAR })
  }

  function renderSidebar({ type, content }) {
    switch (type) {
      case TYPES.TABLE:
        return (
          <TableEditor
            key={editorId}
            row={content.row}
            col={content.col}
            searchable={content.searchable}
            headers={content.headers}
            dataUrl={content.dataUrl}
            dataSource={content.dataSource}
            finishEdit={finishEdit}
            pagination={content.pagination}
          />
        )
      case TYPES.NEWCONTENT:
        return <ContentSelector tab={content.tab} position={content.direction} />
      default:
        return <div>No content type avail.</div>
    }
  }

  return <>{renderSidebar({ type, content })}</>
}

const mapState = (state) => ({
  posts: state.post.posts,
  editorId: state.edit.editorId,
})

export default connect(mapState)(EditSideBar)
