'use client';

import { ReactNode, useRef } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface AssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit?: () => void;
  submitLabel?: string;
  isLoading?: boolean;
  children: ReactNode;
}

export function AssetModal({
  isOpen,
  onClose,
  title,
  submitLabel = 'Salvar',
  isLoading = false,
  children,
}: AssetModalProps) {
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = () => {
    submitButtonRef.current?.click();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col gap-4">
        {children}

        <div className="hidden">
          <button type="submit" ref={submitButtonRef} form="asset-form" />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : submitLabel}
        </Button>
      </div>
    </Modal>
  );
}
