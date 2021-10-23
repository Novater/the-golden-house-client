import React, { Component } from 'react';
import Table from './table';
import axios from 'axios';

export default class Page extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tabName: ''
    }
  }

  // This method will get the data from the database
  componentDidMount() {
    // TODO: implement what needs to do when the page loads
    this.setState({ tabName: this.props.tabName })
  }

  // This will display the table with all records

  render() {
    console.log('state', this.state);
    const isTableTab = this.state.tabName === 'table';
    const isHomeTab = this.state.tabName === 'home';
    const isAboutTab = this.state.tabName === 'about';

    return (
      <div className="pageContainer">
        {isHomeTab ?
          <div className="blog-section">
            <div className="banner-img">
            </div>
            <h3>Welcome to the Golden House!</h3>
            <a href="#">Click here to join our discord server!</a>
            <div class="blog-post">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta ullamcorper finibus. In aliquam nulla at luctus mollis. Donec tincidunt tellus metus, vel commodo ipsum consectetur at. Donec congue tincidunt semper. Duis nulla augue, luctus non quam sit amet, sagittis viverra nulla. Donec accumsan consectetur lacinia. Praesent sollicitudin varius lacus a egestas. Pellentesque ut nulla egestas, maximus mi a, dignissim massa. Praesent euismod eros vel fermentum fermentum. Vestibulum non nisl dui. Sed accumsan ultricies nibh, et blandit lacus ultricies eget. Cras varius scelerisque magna et gravida. Aenean sollicitudin at nibh vel ullamcorper. Aenean dapibus turpis id vehicula dapibus. Sed tempus vitae lectus nec luctus.</div>
            <div class="blog-post">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta ullamcorper finibus. In aliquam nulla at luctus mollis. Donec tincidunt tellus metus, vel commodo ipsum consectetur at. Donec congue tincidunt semper. Duis nulla augue, luctus non quam sit amet, sagittis viverra nulla. Donec accumsan consectetur lacinia. Praesent sollicitudin varius lacus a egestas. Pellentesque ut nulla egestas, maximus mi a, dignissim massa. Praesent euismod eros vel fermentum fermentum. Vestibulum non nisl dui. Sed accumsan ultricies nibh, et blandit lacus ultricies eget. Cras varius scelerisque magna et gravida. Aenean sollicitudin at nibh vel ullamcorper. Aenean dapibus turpis id vehicula dapibus. Sed tempus vitae lectus nec luctus.</div>
            <div class="blog-post">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta ullamcorper finibus. In aliquam nulla at luctus mollis. Donec tincidunt tellus metus, vel commodo ipsum consectetur at. Donec congue tincidunt semper. Duis nulla augue, luctus non quam sit amet, sagittis viverra nulla. Donec accumsan consectetur lacinia. Praesent sollicitudin varius lacus a egestas. Pellentesque ut nulla egestas, maximus mi a, dignissim massa. Praesent euismod eros vel fermentum fermentum. Vestibulum non nisl dui. Sed accumsan ultricies nibh, et blandit lacus ultricies eget. Cras varius scelerisque magna et gravida. Aenean sollicitudin at nibh vel ullamcorper. Aenean dapibus turpis id vehicula dapibus. Sed tempus vitae lectus nec luctus.</div>
            <div class="blog-post">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta ullamcorper finibus. In aliquam nulla at luctus mollis. Donec tincidunt tellus metus, vel commodo ipsum consectetur at. Donec congue tincidunt semper. Duis nulla augue, luctus non quam sit amet, sagittis viverra nulla. Donec accumsan consectetur lacinia. Praesent sollicitudin varius lacus a egestas. Pellentesque ut nulla egestas, maximus mi a, dignissim massa. Praesent euismod eros vel fermentum fermentum. Vestibulum non nisl dui. Sed accumsan ultricies nibh, et blandit lacus ultricies eget. Cras varius scelerisque magna et gravida. Aenean sollicitudin at nibh vel ullamcorper. Aenean dapibus turpis id vehicula dapibus. Sed tempus vitae lectus nec luctus.</div>
            <div class="blog-post">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta ullamcorper finibus. In aliquam nulla at luctus mollis. Donec tincidunt tellus metus, vel commodo ipsum consectetur at. Donec congue tincidunt semper. Duis nulla augue, luctus non quam sit amet, sagittis viverra nulla. Donec accumsan consectetur lacinia. Praesent sollicitudin varius lacus a egestas. Pellentesque ut nulla egestas, maximus mi a, dignissim massa. Praesent euismod eros vel fermentum fermentum. Vestibulum non nisl dui. Sed accumsan ultricies nibh, et blandit lacus ultricies eget. Cras varius scelerisque magna et gravida. Aenean sollicitudin at nibh vel ullamcorper. Aenean dapibus turpis id vehicula dapibus. Sed tempus vitae lectus nec luctus.</div>
            <div class="blog-post">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta ullamcorper finibus. In aliquam nulla at luctus mollis. Donec tincidunt tellus metus, vel commodo ipsum consectetur at. Donec congue tincidunt semper. Duis nulla augue, luctus non quam sit amet, sagittis viverra nulla. Donec accumsan consectetur lacinia. Praesent sollicitudin varius lacus a egestas. Pellentesque ut nulla egestas, maximus mi a, dignissim massa. Praesent euismod eros vel fermentum fermentum. Vestibulum non nisl dui. Sed accumsan ultricies nibh, et blandit lacus ultricies eget. Cras varius scelerisque magna et gravida. Aenean sollicitudin at nibh vel ullamcorper. Aenean dapibus turpis id vehicula dapibus. Sed tempus vitae lectus nec luctus.</div>
            <div class="blog-post">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta ullamcorper finibus. In aliquam nulla at luctus mollis. Donec tincidunt tellus metus, vel commodo ipsum consectetur at. Donec congue tincidunt semper. Duis nulla augue, luctus non quam sit amet, sagittis viverra nulla. Donec accumsan consectetur lacinia. Praesent sollicitudin varius lacus a egestas. Pellentesque ut nulla egestas, maximus mi a, dignissim massa. Praesent euismod eros vel fermentum fermentum. Vestibulum non nisl dui. Sed accumsan ultricies nibh, et blandit lacus ultricies eget. Cras varius scelerisque magna et gravida. Aenean sollicitudin at nibh vel ullamcorper. Aenean dapibus turpis id vehicula dapibus. Sed tempus vitae lectus nec luctus.</div>
            <div class="blog-post">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta ullamcorper finibus. In aliquam nulla at luctus mollis. Donec tincidunt tellus metus, vel commodo ipsum consectetur at. Donec congue tincidunt semper. Duis nulla augue, luctus non quam sit amet, sagittis viverra nulla. Donec accumsan consectetur lacinia. Praesent sollicitudin varius lacus a egestas. Pellentesque ut nulla egestas, maximus mi a, dignissim massa. Praesent euismod eros vel fermentum fermentum. Vestibulum non nisl dui. Sed accumsan ultricies nibh, et blandit lacus ultricies eget. Cras varius scelerisque magna et gravida. Aenean sollicitudin at nibh vel ullamcorper. Aenean dapibus turpis id vehicula dapibus. Sed tempus vitae lectus nec luctus.</div>
          </div>
          : ''}
        {
          isTableTab ? <Table></Table> : ''
        }
        {
          isAboutTab ? <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta ullamcorper finibus. In aliquam nulla at luctus mollis. Donec tincidunt tellus metus, vel commodo ipsum consectetur at. Donec congue tincidunt semper. Duis nulla augue, luctus non quam sit amet, sagittis viverra nulla. Donec accumsan consectetur lacinia. Praesent sollicitudin varius lacus a egestas. Pellentesque ut nulla egestas, maximus mi a, dignissim massa. Praesent euismod eros vel fermentum fermentum. Vestibulum non nisl dui. Sed accumsan ultricies nibh, et blandit lacus ultricies eget. Cras varius scelerisque magna et gravida. Aenean sollicitudin at nibh vel ullamcorper. Aenean dapibus turpis id vehicula dapibus. Sed tempus vitae lectus nec luctus.</div> : ''
        }
      </div>
    )
  }
};
