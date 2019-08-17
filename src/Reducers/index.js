import { UPLOAD_IMAGE, RESIZE_ALL_IMAGES, SEND_SAVE_REQUEST, RECEIVE_SAVE_RESPONSE } from '../Actions/index';
import { combineReducers } from 'redux';
import { convertImageToCanvas, convertCanvasToImage } from '../Utils';
import { saveImage } from '../Actions';

let initialState = {
    currentImageSrc: "",
    resizedImages: [
        {
            type: "horizontal",
            width: 755,
            height: 450,
            imgSrc: "",
            link: "",
            isSaving: false
        },
        {
            type: "vertical",
            width: 365,
            height: 450,
            imgSrc: "",
            link: "",
            isSaving: false
        },
        {
            type: "horizontal_small",
            width: 365,
            height: 212,
            imgSrc: "",
            link: "",
            isSaving: false
        },
        {
            type: "gallery",
            width: 380,
            height: 380,
            imgSrc: "",
            link: "",
            isSaving: false
        }
    ]
}


const imageInfo = (state = initialState, action) => {
    let resizedImages = [];
    switch(action.type) {
        case UPLOAD_IMAGE:
            console.log(action);
            return {
                ...state,
                currentImageSrc: action.imgSrc
            }
        case RESIZE_ALL_IMAGES:
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

            console.log("resized", resizedImages)
            return {
                ...state,
                resizedImages
            }
        case SEND_SAVE_REQUEST:
            resizedImages = [];
            state.resizedImages.forEach((imageInfo) => {
                if(imageInfo.type === action.imageType) {
                    saveImage(imageInfo);
                    resizedImages.push({
                        ...imageInfo,
                        isSaving: true
                    })
                }else {
                    resizedImages.push(imageInfo);
                }
            });

            return {
                ...state,
                resizedImages
            };
        case RECEIVE_SAVE_RESPONSE:
            resizedImages = [];
            state.resizedImages.forEach((imageInfo) => {
                if (imageInfo.type === action.imageType) {
                    resizedImages.push({
                        ...imageInfo,
                        isSaving: false,
                        link: action.imageLink
                    })
                } else {
                    resizedImages.push(imageInfo);
                }
            });

            return {
                ...state,
                resizedImages
            };

        default: 
            return state;
    }
}

const rootReducer = combineReducers({
    imageInfo
});

export default rootReducer;