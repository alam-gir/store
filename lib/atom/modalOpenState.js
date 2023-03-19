import { atom } from "recoil";

export const productUpdatemodalState = atom({
    key: 'productUpdatemodalState',
    default: false
})
export const productUpdateConfirmationModalState = atom({
    key: 'productUpdateConfirmationModalState',
    default: false
})

export const productDeleteConfirmationModalState = atom({
    key: 'productDeleteConfirmationModalState',
    default: false
})
