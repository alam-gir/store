export const openModal = (setOpenModalState) => {
    //disable body scrolling
    document.body.style.overflow = "hidden"
    // open modal
    setOpenModalState(true)

}
export const closeModal = (setOpenModalState) => {
    //enable body scrolling
    document.body.style.overflow = "unset"
    // close modal
    setOpenModalState(false)
}