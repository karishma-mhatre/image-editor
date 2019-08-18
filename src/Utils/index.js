export const convertFileToImageSrc = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = (event) => {
            resolve(event.target.result);
        }
        reader.readAsDataURL(file);
    })
}

export const convertImageToCanvas = (img, width, height, x = 0, y = 0) => {
    return new Promise((resolve,reject) => {
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, x, y);
        resolve(canvas);
    })
}

export const convertCanvasToImage = (canvas) => {
    return new Promise((resolve, reject) => {
        let imgSrc = canvas.toDataURL("image/png");
        resolve(imgSrc)
    })
}

export const convertImageSrcToFile = (imgSrc) => {
    return new Promise((resolve, reject) => {
        fetch(imgSrc)
        .then(res => res.blob())
        .then(blob => {
            let file = new File([blob], "File name")
            resolve(file)
        })
        .catch((error) => {
            reject(error)
        })
    })
}