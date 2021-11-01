import { Editor } from '@tinymce/tinymce-react';
import React, { Component } from 'react';

export default class ContentEditor extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <Editor
        value={this.props.content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount code textcolor image paste'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic forecolor backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | code | image | paste | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          images_upload_url: 'postAcceptor.php',
          file_picker_types: 'file image media'
        }}
        id={`content-${this.props.id}`}
        onEditorChange={this.props.onChange}
        apiKey='gtfc54ziqkg4zxfs7ygx30ddnkzks6abnkds81zs3h6p2ftm'
      />
    );
  }
}