'use client';

import { ReactNode } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface AssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSubmit?: () => void;
  submitLabel?: string;
  isLoading?: boolean;
}

export function AssetModal({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = 'Salvar',
  isLoading = false,
}: AssetModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit?.();
        }}
        className="flex flex-col gap-4"
      >
        {children}

        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'Salvando...' : submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
