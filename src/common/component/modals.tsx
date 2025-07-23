import React from 'react';

type ModalProps = {
  closeModal: () => void;
  children: React.ReactNode;
};

export const Modal = ({ closeModal, children }: ModalProps) => {
  return (
    <div
      className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>

        {/* 실제 컨텐츠 */}
        {children}
      </div>
    </div>
  );
};
