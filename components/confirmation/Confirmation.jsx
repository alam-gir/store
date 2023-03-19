import Button from '@/components/Button'
import { DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Confirmation = ({handleConfirm, handleClose, actionText, message}) => {
  return (
    // all styles provides from /styles/dashboard.css
    <div className='confirmation-modal-wrapper'>
            <XMarkIcon onClick={handleClose} className='confirmation-modal-close-icon'/>
        <div className='confirmation-modal-header'>
            <DocumentTextIcon className='confirmation-modal-logo' />
            <h1 className='confirmation-modal-text'>are you sure to {actionText}?</h1>
        </div>
        <h2 className='confirmation-modal-message-container'>{message}</h2>
        <div className='confirmation-modal-btn-container'>
            <Button text="cancel" textColor="text-white" bgColor="bg-gray-400" px="px-8" handleClick={handleClose}/>
            <Button text={actionText} textColor="text-white" bgColor="bg-[#e50914]" px="px-8" handleClick={handleConfirm}/>
        </div>
    </div>
  )
}

export default Confirmation