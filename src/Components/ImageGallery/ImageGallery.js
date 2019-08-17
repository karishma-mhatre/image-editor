import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendSaveRequest, saveImage } from '../../Actions';

class ImageGallery extends Component {
    constructor(props) {
        super(props);
    }
    handleSave = (imageType, imageSrc) => {
        this.props.dispatch(saveImage(imageType, imageSrc))
    }

    render() {
        return (
            <div>
                {
                    this.props.images.map((imageInfo, index) => (
                        <div key={index}>
                            <img src={imageInfo.imgSrc}></img>
                            <div>
                                <button onClick={() => {this.handleSave(imageInfo.type, imageInfo.imgSrc)}}>Save</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    images: state.imageInfo.resizedImages
})

export default connect(mapStateToProps)(ImageGallery);