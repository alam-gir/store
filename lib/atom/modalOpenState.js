import { atom } from "recoil";

export const productUpdatemodalState = atom({
    key: 'productUpdatemodalState',
    default: false
})
export const productAddModalState = atom({
    key: 'productAddModalState',
    default: false
})

export const productAddConfirmationModalState = atom({
    key: 'productAddConfirmationModalState',
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