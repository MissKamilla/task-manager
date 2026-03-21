import '@/styles/Modal.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button type="button" onClick={onClose} className="modal__close">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
