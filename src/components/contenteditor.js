/* eslint-disable */

import { Editor } from '@tinymce/tinymce-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ContentEditor extends Component {
  render() {
    return (
      <Editor
        value={this.props.content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen link visualblocks',
            'insertdatetime media table paste code help wordcount code textcolor image paste table',
          ],
          toolbar:
            'undo redo | formatselect | visualblocks' +
            'bold italic underline forecolor backcolor | fontselect | fontsizeselect | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | link | table | code | image | paste | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          images_upload_url: 'postAcceptor.php',
          file_picker_types: 'file image media',
          fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
          visualblocks_default_state: true,
        }}
        id={`content-${this.props.id}`}
        onEditorChange={this.props.onChange}
        apiKey="gtfc54ziqkg4zxfs7ygx30ddnkzks6abnkds81zs3h6p2ftm"
      />
    )
  }
}

ContentEditor.propTypes = {
  content: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
