import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div className='fixed inset-0 bg-black/60' onClick={onClose} />

      {/* Modal Content */}
      <div className='relative bg-white rounded-lg shadow-xl max-w-md w-full p-6'>
        <button className='absolute top-4 right-4'>
          <X
            size={32}
            className='text-neutral transition-colors duration-300 hover:text-red-700 hover:bg-base-300 rounded-full p-1.5'
            onClick={onClose}
          />
        </button>
        {children}
      </div>
    </div>
  );
};
export default Modal;
