import { atom } from "recoil";

export const productModalOpenState = atom({
    key: 'productModalOpenState',
    default: false
})
export const productUpdateConfirmationModalState = atom({
    key: 'productUpdateConfirmationModalState',
    default: false
})