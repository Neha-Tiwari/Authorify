import React, { Component, ComposedComponent } from 'react';
import { Image } from 'cloudinary-react';
import { CloudinaryContext, Transformation } from 'cloudinary-react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

// import BookCover1 from './BookCover1.jpg';

import Cover1 from '../Cover1.png';

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      upload: false,
      imageUploadId: '123',
      imageUrl: 'user/upload.png',
      bookTitle: 'Book Title goes here',
      value: 'Book Title ',
      author: 'Author of Book',
      spine: 'Spine for book',
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.handleBookChange = this.handleBookChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = () => {
    console.log(this.state.selectedFile);
  };
  handleClose() {
    console.log('Hello');
  }

  handleUpload() {
    const newLocal = this;
    console.log('win', window);
    window.cloudinary.openUploadWidget(
      {
        cloud_name: 'dtt2cdx79',
        sources: [
          'local',
          'url',
          'camera',
          'image_search',
          'facebook',
          'dropbox',
          'google_photos',
        ],
        upload_preset: 'vr2jxj7j',
      },
      function(error, result) {
        console.log(error, result);
        // console.log(result);
        console.log('img', newLocal.state.imageUrl);
        var img = newLocal.state.imageUrl;

        newLocal.setState({
          upload: true,
          imageUrl: result[0].eager[0].url,
          gravity: 'face',
          radius: '140',
          crop: 'thumb',
        });
      }
    );
  }

  setBookTitle() {
    this.setState({
      bookTitle: 'title',
    });
  }

  getSvgTag() {
    const svgTag = document.getElementById('svgTag');
    //const reqSVG  = JSON.stringify(svgTag);

    var reqSVG = svgTag.outerHTML;
    console.log('svg', reqSVG);
    axios
      .post('http://127.0.0.1:3002/createcover', {
        svg: reqSVG,
      })
      .then(function(response) {
        console.log(response);
        console.log(response.data);
        window.open(response.data);
      })
      .catch(function(error) {
        console.log(error);
        alert(error);
      });
  }

  handleBookChange(event) {
    this.setState({ value: event.target.value });
    console.log(this.state.value);
  }

  handleAuthorChange(event) {
    this.setState({ author: event.target.value });
    console.log(this.state.author);
  }
  handleSpineChange(event) {
    this.setState({ spine: event.target.value });
    console.log(this.state.spine);
  }
  handleSubmit(event) {
    alert('Book title' + this.state.bookTitle);

    event.preventDefault();
  }

  render() {
    console.log('img url=', this.state.imageUrl);
    const { height, width, ...other } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Book Title:
            <input
              value={this.state.value}
              name="book"
              onChange={this.handleBookChange}
            />
          </label>
          &nbsp;&nbsp;
          <label>
            Author Name:
            <input
              value={this.state.author}
              onChange={this.handleAuthorChange}
            />
          </label>
          {/* &nbsp;&nbsp; */}
          {/* <label>
            Spine Text:
            <input
              value={this.state.spine}
              name="spine"
              onChange={this.handleSpineChange}
            />
          </label> */}
        </form>
        {/* <br /> */}
        <Button onClick={this.handleUpload}>Upload</Button>
        <svg id="svgTag" viewBox="0 0 400 275">
          {this.state.upload ? (
            <image
              // href="user/upload.png"
              href={this.state.imageUrl}
              x="35"
              y="130"
              width="55"
              height="55"
              radius="180"
            />
          ) : null}
          <image
            x="20"
            y="0"
            height="246"
            width="300"
            fill="white"
            href={Cover1}
          />
          <text
            x="70"
            y="40"
            // font-family="Courier"
            fontFamily="Noto Sans CJK TC BOLD"
            font-size="10"
            fill="orange"
            class="large"
          >
            {this.state.value}
          </text>
          {this.state.upload ? (
            <image
              // href="user/upload.png"
              href={this.state.imageUrl}
              x="198"
              y="113"
              width="90"
              height="90"
              // radius="180"
            />
          ) : null}
          }
          <text
            x="190"
            y="85"
            // font-family="Courier"
            fontFamily="Noto Sans CJK TC BOLD"
            font-size="14"
            fill="orange"
            class="large"
          >
            {this.state.value}
          </text>
          <text
            x="205"
            y="220"
            // font-family="Helvetica"
            fontFamily="Noto Sans CJK TC BOLD"
            font-size="10"
            fill="orange"
            class="large"
          >
            {this.state.author}
          </text>
        </svg>
        {/* {this.state.upload ? (
          <div>
            <CloudinaryContext cloudName="dtt2cdx79">
              <Image publicId={this.state.imageUrl}>
                <Transformation
                  width="200"
                  height="200"
                  gravity="face"
                  radius="max"
                  crop="fill"
                  background_removal="remove_the_background"
                />
              </Image>
            </CloudinaryContext>
          </div>
        ) : null} */}
        <Button
          variant="raised"
          className="rounded-btn rounded-btn--squarish"
          color="secondary"
          size="large"
          onClick={this.getSvgTag}
        >
          Approve and send for Printing
        </Button>
        <br /> <br /> <br />
      </div>
    );
  }
}
