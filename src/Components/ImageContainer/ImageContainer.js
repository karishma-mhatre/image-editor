import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveImage } from '../../Actions';
import './image-container.css';

class ImageContainer extends Component {

    handleSave = (imageType, imageSrc) => {
        this.props.dispatch(saveImage(imageType, imageSrc))
    }

    render() {
        let { imageInfo } = this.props;
        return (
            <div className="container image-container">
                <div className="image-container--image">
                    <img src={imageInfo.imgSrc}></img>
                </div>
                <div class="image-container--save">
                    <button className="btn" onClick={() => { this.handleSave(imageInfo.type, imageInfo.imgSrc) }}>Save</button>
                </div>
                <div class="image-container--link">
                    <p>{imageInfo.link}</p>
                </div>
                <div class="loader">
                    {
                        imageInfo.isSaving &&
                        <p>saving image..</p>
                    }
                </div>
            </div>
        )
    }
}

export default connect()(ImageContainer);