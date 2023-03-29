function Modal({ children, isOpen, setIsOpen, title }) {
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`${
        isOpen ? 'block' : 'hidden'
      } fixed z-10 inset-0 overflow-y-auto bg-black-faded/60 backdrop-opacity-10 flex items-center justify-center`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="align-bottom w-1/3 mb-10 bg-white rounded-lg shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <p
          className="border-b-2 font-thin text-lg border-gray-primary text-center py-3 my-3"
          aria-hidden="true"
        >
          {title}
        </p>
        <div className="bg-white h-2 flex py-10 items-center justify-center rounded-lg px-4">
          {children}
        </div>
        <p
        role="button"
          onClick={() => setIsOpen(!isOpen)}
          className="border-t-2 mt-10 font-thin text-lg border-gray-primary text-center py-3"
        >
          Close
        </p>
      </div>
    </div>
  );
}

export default Modal;
