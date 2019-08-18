export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const RESIZE_ALL_IMAGES = "RESIZE_ALL_IMAGES";
export const RESIZE_IMAGE = "RESIZE_IMAGE";
export const CHANGE_DIMENSION = "CHANGE_DIMENSION";
export const SEND_SAVE_REQUEST = "SEND_SAVE_REQUEST";
export const RECEIVE_SAVE_RESPONSE = "RECEIVE_SAVE_RESPONSE";

export const uploadImage = (imgSrc) => ({
    type: UPLOAD_IMAGE,
    imgSrc
})

export const resizeAllImages = () => ({
    type: RESIZE_ALL_IMAGES
})

export const sendSaveRequest = (imageType) => ({
    type: SEND_SAVE_REQUEST,
    imageType
})

export const receiveSaveResponse = (imageType, imageLink) => ({
    type: RECEIVE_SAVE_RESPONSE,
    imageType,
    imageLink
})

export const saveImage = (imageType, imageSrc) => dispatch => {
    dispatch(sendSaveRequest(imageType))
    const formData = new FormData();
    fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], "File name")
            formData.append('image', file);
            return fetch("https://api.imgur.com/3/image", {
                method: 'POST',
                headers: {
                    Authorization: "Client-ID 7a775a29de38d93"
                },
                body: formData
            }).then((response) => response.json())
            .then((res) => {
                console.log(res)
                dispatch(receiveSaveResponse(imageType, res.data.link))
            });
        })
    console.log("inside save");
}
