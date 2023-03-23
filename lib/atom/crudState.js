import { atom } from "recoil";

export const crudState = atom({
    key: 'crudState',
    default: false,
})

//if any of crud action run then this will change , for re fetching data from db. by this we will get real time data.