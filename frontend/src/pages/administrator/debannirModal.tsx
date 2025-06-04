import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

const UnbanUserModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Débannir l'utilisateur</h2>
        <p>Êtes-vous sûr de vouloir débannir {userName} ?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">Annuler</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Débannir</button>
        </div>
      </div>
    </div>
  );
};

export default UnbanUserModal;