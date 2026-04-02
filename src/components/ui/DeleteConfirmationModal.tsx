'use client';

import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  isLoading?: boolean;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemName = 'este item',
  isLoading = false,
}: DeleteConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmar exclusão">
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <div className="p-4 bg-red-500/10 rounded-full">
          <AlertTriangle className="text-red-400" size={32} />
        </div>
        <p className="text-white/80">
          Tem certeza que deseja excluir <strong>{itemName}</strong>?
        </p>
        <p className="text-sm text-white/50">
          Esta ação não pode ser desfeita.
        </p>
      </div>

      <div className="flex justify-center gap-3 pt-4 border-t border-white/10">
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={onConfirm}
          disabled={isLoading}
          className="!bg-red-500 hover:!bg-red-600 !border-red-500"
        >
          {isLoading ? 'Excluindo...' : 'Excluir'}
        </Button>
      </div>
    </Modal>
  );
}
