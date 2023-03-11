export const getFromLocalstorage = (key, setState) => {
    const items = JSON.parse(localStorage.getItem('key'))
    
    if(items) setState(items)
}