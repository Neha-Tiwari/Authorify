import React, { Component } from 'react';
// import { Image } from 'cloudinary-react';
// import { CloudinaryContext, Transformation } from 'cloudinary-react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      upload: false,
      imageUploadId: '123',
      imageUrl: 'user/upload.png',
      bookTitle: 'Book Title goes here',
      value: 'Book Title',
      author: 'Author goes here',
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
      function (error, result) {
        console.log(error, result);
        // function(error, result) {
        console.log(result);
        console.log('img', newLocal.state.imageUrl);
        //var img = newLocal.state.imageUrl;
        // console.log('win1', window.cloudinary);
        // cloudinary
        //   .imageTag(
        //     { img },
        //     {
        //       transformation: [
        //         { effect: 'cartoonify' },
        //         { radius: 'max' },
        //         { effect: 'outline:100', color: 'lightblue' },
        //         { background: 'lightblue' },
        //         { height: 300, crop: 'scale' },
        //       ],
        //     }
        //   )
        //   .toHtml();

        newLocal.setState({
          upload: true,
          imageUrl: result[0].url,
          gravity: 'face',
          radius: '140',
          crop: 'thumb',

          // imageUrl: 'user/' + newLocal.state.imageUploadId + '.png',
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
        // image:
        // 'http://res.cloudinary.com/dtt2cdx79/image/upload/c_fill,g_face,h_400,r_max,w_600/v1/user/upload.png',

        // 'http://res.cloudinary.com/dtt2cdx79/image/upload/c_fill,g_face,h_200,r_max,w_200/v1/user/upload.png',
      })
      .then(function (response) {
        console.log(response);
        console.log(response.data);
        window.open(response.data);
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  }

  handleBookChange(event) {
    this.setState({ value: event.target.value });
    console.log(this.state.value);
    //this.setState({author: event.target.author});
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
    //alert('Author' + this.state.author);
    event.preventDefault();
  }

  render() {
    console.log(this.state.imageUrl);
    //const { height, width, ...other } = this.props;
    return (
      <div>
        {/* <Image cloudName="dtt2cdx79" publicId="book_cover" width="500" crop="scale"/>      
                <CloudinaryContext cloudName="dtt2cdx79">
                    <Image publicId="book_cover">
                        <Transformation width="200" height="200" gravity="face" radius="max" crop="fill"/>
                    </Image>
            </CloudinaryContext>
       <input type="file" onChange={this.fileChangedHandler}/>
       <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              UNDO
        </Button> */}
        <form onSubmit={this.handleSubmit}>
          <label>
            Book Title:
            <input
              value={this.state.value}
              name="book"
              onChange={this.handleBookChange}
            />
          </label>
          <label>
            Author Name:
            <input
              value={this.state.author}
              onChange={this.handleAuthorChange}
            />
          </label>
          <label>
            Spine Text:
            <input
              value={this.state.spine}
              name="spine"
              onChange={this.handleSpineChange}
            />
          </label>
        </form>
        <Button 
         variant="raised"
         className="rounded-btn rounded-btn--squarish"
         color="primary"
         size="large"
        onClick={this.handleUpload}
        
        >Upload</Button>
        <svg id="svgTag" viewBox="0 0 331 246">
          <rect width="331" height="331" fill="black" />
          <rect x="165" y="0" width="15" height="331" fill="white" />
          <circle
            cx="50"
            cy="150"
            r="20"
            stroke="black"
            strokeWidth="1"
            fill="yellow"
          />

          {this.state.upload ? (
            <image
              href={this.state.imageUrl}
              // href="https://www.google.com/photos/about/static/images/google.svg"
              x="230"
              y="70"
              width="50px"
              height="30px"
              radius="140"
            />
          ) : null}



          <text
            x="220"
            y="45"
            fontamily="Courier"
            fontSize="10"
            fill="red"
            className="large"
          >
            {this.state.value}
          </text>
          <text
            x="220"
            y="180"
            fontFamily="Helvetica"
            fontSize="9"
            fill="white"
            className="large"
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

        {/*  */}
      </div>
    );
  }
}
