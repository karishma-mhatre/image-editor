import React, { Component } from 'react';
import { connect } from 'react-redux';

class ImageGallery extends Component {
    render() {
        return (
            <div>
                {
                    this.props.images.map((imageInfo) => (
                        <div>
                            <img src={imageInfo.imgSrc}></img>
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