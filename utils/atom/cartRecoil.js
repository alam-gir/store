import { atom } from "recoil";

export const toggleCartState = atom({
    key: 'toggleCartState',
    default: false, 
})
export const cartState = atom({
    key: 'cartState',
    default: [], 
})

