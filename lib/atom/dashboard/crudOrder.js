import { atom } from "recoil";

export const crudOrderState = atom({
    key: 'crudOrderState',
    default: false,
})

//if any of crud order action run then this will change , for re fetching data from db. by this we will get real time data.