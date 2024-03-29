import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadImage } from '../../Actions';
import { convertFileToImageSrc } from '../../Utils';
import './image-selector.css';

class ImageSelector extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isValidImage: ""
        }
    }

    handleChange = (e) => {
        convertFileToImageSrc(e.target.files[0])
            .then((imgSrc) => {
                this.validateImage(imgSrc)
                .then((isValid)=> {
                    if(isValid) {
                        this.setState({isValidImage: true})
                        this.props.dispatch(uploadImage(imgSrc));
                    }
                })
                .catch((error) => {
                    this.setState({isValidImage: false})
                    this.props.dispatch(uploadImage(""));
                });        
            });
    }

    validateImage = (imgSrc) => {
        let currentImg = new Image();
        return new Promise((resolve, reject) => {
            currentImg.src = imgSrc;
            currentImg.onload = () => {
                if(currentImg.width !== this.props.requiredWidth || currentImg.height !== this.props.requiredHeight) {
                    reject(false);
                }else {
                    console.log("valid size")
                    resolve(true);
                }
            }
        });
    }

    render() {
        console.log("image selector rendering");
        return (
            <div className="container image-selector">
                <div className="file-upload-wrapper">
                    <button className="btn">Upload an Image</button>
                    <input type="file" name="image" className="image-selector__input" 
                        accept="image/*" onChange={(e) => {e.persist(); this.handleChange(e)}}></input>
                </div>
                {
                    this.state.isValidImage === false &&
                    <div className="error-msg">Image size should be {this.props.requiredWidth} X {this.props.requiredHeight}</div>
                }
            </div>
        )
    }
}

export default connect()(ImageSelector);