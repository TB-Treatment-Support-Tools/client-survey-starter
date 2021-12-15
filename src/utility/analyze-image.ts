import rgbToHsl from "./rgb-to-hsl";

function analyzeImage(canvasRef: React.RefObject<HTMLCanvasElement>) {

    if (canvasRef && canvasRef.current) {
        let canvas = canvasRef.current.getContext("2d");
        let imageData = canvas?.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        let data = imageData?.data

        //   canvasRef.current.height = imageData?.height ||  0;
        //   can

        const height = imageData?.height;
        const width = imageData?.width;

        let rHeight = 0;
        let list: number[] = [];

        if (data) {

            let rowTotal = 0;

            for (let i = data.length; i >= 0; i -= 4) {
                
                if (data[i + 3] > 0) {
                    const red = data[i];
                    const green = data[i + 1];
                    const blue = data[i + 2];
                    const [h, s, l] = rgbToHsl(red, green, blue);
                    
                    rowTotal += l || 0;

                    if (width && i % width === 0) {
                        list.push(rowTotal / width)
                        rowTotal = 0;
                    }
                }
            }
        }
        console.log("done")
        return list
    }

}

//Taken from https://stackoverflow.com/questions/10521978/html5-canvas-image-contrast

function contrastImage(imageData : ImageData, contrast: number) {  // contrast as an integer percent  
    let data = imageData.data;  // original array modified, but canvas not updated
    contrast *= 2.55; // or *= 255 / 100; scale integer percent to full range
    let factor = (255 + contrast) / (255.01 - contrast);  //add .1 to avoid /0 error

    for(let i=0;i<data.length;i+=4)  //pixel values in 4-byte blocks (r,g,b,a)
    {
        data[i] = factor * (data[i] - 128) + 128;     //r value
        data[i+1] = factor * (data[i+1] - 128) + 128; //g value
        data[i+2] = factor * (data[i+2] - 128) + 128; //b value

    }
    return imageData;  //optional (e.g. for filter function chaining)
}

export {contrastImage, analyzeImage}
