import { atom } from "recoil";

export const cartState = atom({
    key: 'cartState',
    default: [], 
})

export const cartChangesState = atom({
    key: 'cartChangesState',
    default: true
})