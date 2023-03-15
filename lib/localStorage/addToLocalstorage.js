export const addToLocalstorage = (key,items) => {
    localStorage.setItem(key,JSON.stringify(items))
  }