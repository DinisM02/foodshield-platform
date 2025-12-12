import { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ImageCropModalProps {
  isOpen: boolean;
  imageUrl: string;
  onCropComplete: (croppedImageBlob: Blob) => void;
  onClose: () => void;
  language: string;
}

export function ImageCropModal({ isOpen, imageUrl, onCropComplete, onClose, language }: ImageCropModalProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const getCroppedImg = async (): Promise<Blob | null> => {
    if (!completedCrop || !imgRef.current) return null;

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.95);
    });
  };

  const handleCrop = async () => {
    // Se não houver crop selecionado, usar a imagem completa
    if (!completedCrop && imgRef.current) {
      const image = imgRef.current;
      const defaultCrop = {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
        unit: 'px' as const
      };
      setCompletedCrop(defaultCrop);
      // Aguardar um tick para o estado atualizar
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const croppedBlob = await getCroppedImg();
    if (croppedBlob) {
      onCropComplete(croppedBlob);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {language === 'pt' ? 'Recortar Imagem' : 'Crop Image'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Crop Area */}
        <div className="p-6">
          <div className="flex justify-center">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={undefined}
            >
              <img
                ref={imgRef}
                src={imageUrl}
                alt="Crop preview"
                className="max-w-full max-h-[60vh] object-contain"
              />
            </ReactCrop>
          </div>

          <p className="text-sm text-gray-600 mt-4 text-center">
            {language === 'pt' 
              ? 'Arraste para selecionar a área que deseja manter' 
              : 'Drag to select the area you want to keep'}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
          <Button
            onClick={onClose}
            variant="outline"
            type="button"
          >
            {language === 'pt' ? 'Cancelar' : 'Cancel'}
          </Button>
          <Button
            onClick={handleCrop}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            type="button"
          >
            {language === 'pt' ? 'Recortar' : 'Crop'}
          </Button>
        </div>
      </div>
    </div>
  );
}
