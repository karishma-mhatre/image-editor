import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resizeAllImages } from '../../Actions';
import ImageSelector from '../ImageSelector/ImageSelector';
import {Link} from 'react-router-dom'

class ImageResizer extends Component {
    constructor(props) {
        super(props)
    }

    handleResize = () => {
        this.props.dispatch(resizeAllImages());
    }

    render() {
        console.log("image resizer rendering");
        return (
            <div>
                <div>Hello</div>
                <ImageSelector requiredWidth={1024} requiredHeight={1024}></ImageSelector>
                <div>
                    <button onClick={this.handleResize}>Resize</button>
                    <button><Link to="/gallery">View Gallery</Link></button>
                </div>
            </div>
        )
    }
}

export default connect()(ImageResizer);