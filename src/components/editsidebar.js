import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

function EditSideBar({ content }) {
  return <>{content}</>
}

const mapState = (state) => ({
  posts: state.post.posts,
})

export default connect(mapState)(EditSideBar)
