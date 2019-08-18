import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resizeAllImages } from '../../Actions';
import ImageSelector from '../ImageSelector/ImageSelector';
import {Link} from 'react-router-dom';
import './image-resizer.css';

class ImageResizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isImageResized: false,
            error: ""
        }
    }

    handleResize = () => {
        if(this.props.currentImageSrc) {
            this.props.dispatch(resizeAllImages());
            this.setState({isImageResized: true});
        }
    }

    render() {
        console.log("image resizer rendering");
        return (
            <div class="container image-resizer">
                <div class="container image-selectors--actions">
                    <ImageSelector requiredWidth={1024} requiredHeight={1024}></ImageSelector>
                    {
                        this.props.currentImageSrc &&
                        <button className="btn" onClick={this.handleResize}>Resize</button>
                    }
                    {
                        this.state.isImageResized &&
                        <button className="btn"><Link to="/gallery">View Resized Images</Link></button>
                    }
                </div>
                {
                    this.props.currentImageSrc &&
                    <div>
                        <img src={this.props.currentImageSrc}></img>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentImageSrc: state.imageInfo.currentImageSrc
})

export default connect(mapStateToProps)(ImageResizer);