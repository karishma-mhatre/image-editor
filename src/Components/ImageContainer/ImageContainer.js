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
                <div className="image-container__image">
                    <img src={imageInfo.imgSrc}></img>
                </div>
                <div className="image-container__save">
                    <button className={imageInfo.isSaving ? "btn btn_disabled" : "btn"} onClick={() => { this.handleSave(imageInfo.type, imageInfo.imgSrc) }}>Save</button>
                </div>
                {
                    imageInfo.link &&
                    <div className="image-container__link">
                        Image Link: <a href={imageInfo.link}>{imageInfo.link}</a>
                    </div>
                }
                {
                    imageInfo.isSaving &&
                    <div className="loader">
                        <p>Saving Image...</p>
                    </div>
                }
            </div>
        )
    }
}

export default connect()(ImageContainer);