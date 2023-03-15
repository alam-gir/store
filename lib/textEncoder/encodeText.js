const textEncode = (text) => {
    const encoder = new TextEncoder()
    return encoder.encode(text)
}

export {textEncode}