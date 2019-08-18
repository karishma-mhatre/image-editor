import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { convertImageToCanvas, convertCanvasToImage } from '../../Utils';
import './image-cropper.css';

class ImageCropper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crop: {
                unit: 'px', // default, can be 'px' or '%'
                x: 0,
                y: 0,
                width: 400,
                height: 400,
            },
            isSaving: false,
            link: ""
        }
    }

    handleCrop = (crop) => {
        this.setState({crop});
    }

    cropImage = () => {
        let customImage = new Image();
        customImage.src = this.props.imgSrc;
        convertImageToCanvas(customImage, this.state.crop.width, this.state.crop.height, this.state.crop.x, this.state.crop.y).
            then((canvas) => {
                convertCanvasToImage(canvas)
                    .then((imgSrc) => {
                        let img = document.getElementById("cropped");
                        img.src = imgSrc;
                })
        })
    }

    handleSave = () => {
        let img = document.getElementById("cropped");
        this.setState({isSaving: true});
        const formData = new FormData();
        fetch(img.src)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], "File name")
            formData.append('image', file);
            return fetch("https://api.imgur.com/3/image", {
                method: 'POST',
                headers: {
                    Authorization: "Client-ID 7a775a29de38d93"
                },
                body: formData
            }).then((response) => response.json())
            .then((res) => {
                this.setState({
                    isSaving: false,
                    link: res.data.link
                });
                console.log(res)
            });
        })
    }

    render() {
         let { imgSrc } = this.props;
         this.cropImage();
        return (
            <div className="image-cropper">
                    <ReactCrop src={imgSrc} crop={this.state.crop} onChange={this.handleCrop}></ReactCrop>
                    <img src="" id="cropped"></img>
                {
                    <div>
                        <button className="btn" onClick={this.handleSave}>Save Image</button>
                    </div>
                }
                {
                    this.state.link &&
                    <div>
                        Image Link : {this.state.link}
                    </div>
                }
                {
                    this.state.isSaving && 
                    <div class="loader">
                        Saving image...
                    </div>
                }
            </div>
        )
    } 
}

export default connect()(ImageCropper);