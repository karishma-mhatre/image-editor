import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveImage } from '../../Actions';
import ImageContainer from '../ImageContainer/ImageContainer';
import './image-gallery.css';

class ImageGallery extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container image-gallery">
                {
                    this.props.images.map((imageInfo, index) => {
                        if(imageInfo.imgSrc == "") {
                            window.location.hash = "#/";
                        }
                        return <ImageContainer imageInfo={imageInfo} key={index}></ImageContainer>
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    images: state.imageInfo.resizedImages
})

export default connect(mapStateToProps)(ImageGallery);