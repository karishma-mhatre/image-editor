import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageContainer from '../ImageContainer/ImageContainer';
import './image-gallery.css';
import ImageCropper from '../ImageCropper/ImageCropper';

class ImageGallery extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="container image-gallery">
                    {
                        this.props.images.map((imageInfo, index) => {
                            if (imageInfo.imgSrc == "") {
                                window.location.hash = "#/";
                            }
                            return <ImageContainer imageInfo={imageInfo} key={index}></ImageContainer>
                        })
                    }
                </div>
                <ImageCropper imgSrc={this.props.currentImageSrc} width={1024} height={1024}></ImageCropper>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    images: state.imageInfo.resizedImages,
    currentImageSrc : state.imageInfo.currentImageSrc
})

export default connect(mapStateToProps)(ImageGallery);