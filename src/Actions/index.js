export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const RESIZE_ALL_IMAGES = "RESIZE_ALL_IMAGES";
export const RESIZE_IMAGE = "RESIZE_IMAGE";
export const CHANGE_DIMENSION = "CHANGE_DIMENSION";

export const uploadImage = (imgSrc) => ({
    type: UPLOAD_IMAGE,
    imgSrc
})

export const resizeAllImages = () => ({
    type: RESIZE_ALL_IMAGES
})
