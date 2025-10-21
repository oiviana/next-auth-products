// components/SimpleConfirmationDialog.tsx
'use client';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isLoading = false
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!isLoading) {
      onConfirm();
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay com opacity */}
      <div className="fixed inset-0 z-50 bg-black opacity-50" />
      
      {/* Modal sem opacity */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirmação</h3>
            <p className="text-gray-600 mb-6">{message}</p>
            
            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 transition-colors"
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-amber-900 text-white rounded-md hover:bg-amber-950 disabled:opacity-50 transition-colors"
              >
                {isLoading ? '...' : confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}