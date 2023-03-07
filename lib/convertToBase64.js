// make an image to base64 data 

export const convertToBase64 = async (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload =  ((readerEvent) => {
        return readerEvent.target.result
    })
}