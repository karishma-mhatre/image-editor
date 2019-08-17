import { UPLOAD_IMAGE, RESIZE_ALL_IMAGES } from '../Actions/index';
import { combineReducers } from 'redux';
import { convertImageToCanvas, convertCanvasToImage } from '../Utils';

let initialState = {
    currentImageSrc: "",
    resizedImages: [
        {
            type: "horizontal",
            width: 755,
            height: 450,
            imgSrc: ""
        },
        {
            type: "vertical",
            width: 365,
            height: 450,
            imgSrc: ""
        },
        {
            type: "horizontal_small",
            width: 365,
            height: 212,
            imgSrc: ""
        },
        {
            type: "gallery",
            width: 380,
            height: 380,
            imgSrc: ""
        }
    ]
}


const imageInfo = (state = initialState, action) => {
    switch(action.type) {
        case UPLOAD_IMAGE:
            console.log(action);
            return {
                ...state,
                currentImageSrc: action.imgSrc
            }
        case RESIZE_ALL_IMAGES:
            let resizedImages = [];
            let currentImage = new Image();
            currentImage.src = state.currentImageSrc;
            state.resizedImages.forEach((imageInfo) => {
                convertImageToCanvas(currentImage, imageInfo.width, imageInfo.height)
                    .then((canvas) => {
                        convertCanvasToImage(canvas)
                            .then((imgSrc) => {
                                resizedImages.push({
                                    ...imageInfo,
                                    imgSrc
                                });
                            });
                    });
            });

            console.log("resized", {
                ...state,
                resizedImages
            });
            return {
                ...state,
                resizedImages
            }
        default: 
            return state;
    }
}

const rootReducer = combineReducers({
    imageInfo
});

export default rootReducer;