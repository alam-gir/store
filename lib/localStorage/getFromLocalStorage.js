const getFromLocalStorage = (key) => {
    const result = JSON.parse(localStorage.getItem(key)) || []
    return result
}
export {getFromLocalStorage}