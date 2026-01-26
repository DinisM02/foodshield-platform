import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import imageCompression from 'browser-image-compression';
import { ImageCropModal } from './ImageCropModal';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
  onSuccess: () => void;
  language: string;
}

export function ProductModal({ isOpen, onClose, product, onSuccess, language }: ProductModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Sementes',
    image: '',
    stock: '',
    sustainabilityScore: '85',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string>('');

  const uploadImageMutation = trpc.admin.products.uploadImage.useMutation();

  const createMutation = trpc.admin.products.create.useMutation({
    onSuccess: () => {
      toast.success(language === 'pt' ? 'Produto criado com sucesso!' : 'Product created successfully!');
      onSuccess();
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = trpc.admin.products.update.useMutation({
    onSuccess: () => {
      toast.success(language === 'pt' ? 'Produto atualizado com sucesso!' : 'Product updated successfully!');
      onSuccess();
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        category: product.category || 'Sementes',
        image: product.imageUrl || '',
        stock: product.stock?.toString() || '',
        sustainabilityScore: product.sustainabilityScore?.toString() || '85',
      });
      setPreviewUrl(product.imageUrl || '');
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Sementes',
        image: '',
        stock: '',
        sustainabilityScore: '85',
      });
      setPreviewUrl('');
    }
    setSelectedFile(null);
  }, [product, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = formData.image;

    // Upload image if a file is selected
    if (selectedFile) {
      setIsUploading(true);
      try {
        // Convert file to base64
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(selectedFile);
        });
        
        const base64 = await base64Promise;
        
        // Upload to S3
        const uploadResult = await uploadImageMutation.mutateAsync({
          file: base64,
          filename: selectedFile.name,
          contentType: selectedFile.type,
        });
        
        imageUrl = uploadResult.url;
      } catch (error) {
        toast.error(language === 'pt' ? 'Erro ao fazer upload da imagem' : 'Error uploading image');
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    const data = {
      name: formData.name,
      description: formData.description,
      price: parseInt(formData.price),
      category: formData.category,
      imageUrl,
      stock: parseInt(formData.stock),
      sustainabilityScore: parseInt(formData.sustainabilityScore),
    };

    if (product) {
      updateMutation.mutate({ id: product.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const processFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error(language === 'pt' ? 'Por favor selecione uma imagem' : 'Please select an image');
      return false;
    }

    // Validate file size (max 10MB before compression)
    if (file.size > 10 * 1024 * 1024) {
      toast.error(language === 'pt' ? 'Imagem muito grande (máx 10MB)' : 'Image too large (max 10MB)');
      return false;
    }

    // Create temporary preview for crop modal
    const reader = new FileReader();
    reader.onload = () => {
      setTempImageUrl(reader.result as string);
      setShowCropModal(true);
    };
    reader.readAsDataURL(file);
    return true;
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    try {
      setIsCompressing(true);
      
      // Convert blob to file
      const croppedFile = new File([croppedBlob], 'cropped-image.jpg', { type: 'image/jpeg' });
      
      // Compression options
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/jpeg' as const,
      };

      // Show compression toast
      const originalSize = (croppedFile.size / 1024 / 1024).toFixed(2);
      toast.info(
        language === 'pt' 
          ? `Comprimindo imagem (${originalSize}MB)...` 
          : `Compressing image (${originalSize}MB)...`
      );

      // Compress the cropped image
      const compressedFile = await imageCompression(croppedFile, options);
      const compressedSize = (compressedFile.size / 1024 / 1024).toFixed(2);
      
      // Show success message
      toast.success(
        language === 'pt'
          ? `Imagem processada: ${originalSize}MB → ${compressedSize}MB`
          : `Image processed: ${originalSize}MB → ${compressedSize}MB`
      );

      setSelectedFile(compressedFile);

      // Create final preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(compressedFile);
      
      setIsCompressing(false);
    } catch (error) {
      console.error('Processing error:', error);
      setIsCompressing(false);
      toast.error(
        language === 'pt'
          ? 'Erro ao processar imagem'
          : 'Error processing image'
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  if (!isOpen) return null;

  const isLoading = createMutation.isPending || updateMutation.isPending || isUploading || isCompressing;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">
            {product 
              ? (language === 'pt' ? 'Editar Produto' : 'Edit Product')
              : (language === 'pt' ? 'Novo Produto' : 'New Product')
            }
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'pt' ? 'Nome do Produto *' : 'Product Name *'}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder={language === 'pt' ? 'Ex: Sementes Orgânicas de Milho' : 'Ex: Organic Corn Seeds'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'pt' ? 'Descrição *' : 'Description *'}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder={language === 'pt' ? 'Descreva o produto...' : 'Describe the product...'}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'pt' ? 'Preço (MZN) *' : 'Price (MZN) *'}
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="450"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'pt' ? 'Estoque *' : 'Stock *'}
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'pt' ? 'Categoria *' : 'Category *'}
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="Sementes">{t('category.seeds')}</option>
                <option value="Insumos">{t('category.inputs')}</option>
                <option value="Equipamentos">{t('category.equipment')}</option>
                <option value="Produtos Frescos">{t('marketplace.category_fresh')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'pt' ? 'Score de Sustentabilidade (%)' : 'Sustainability Score (%)'}
              </label>
              <input
                type="number"
                name="sustainabilityScore"
                value={formData.sustainabilityScore}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="85"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'pt' ? 'Imagem do Produto *' : 'Product Image *'}
            </label>
            
            {/* Drag and Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-6 transition-all ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-300 bg-gray-50 hover:border-emerald-400 hover:bg-emerald-50/50'
              }`}
            >
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrl('');
                      setSelectedFile(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 hover:text-emerald-500"
                    >
                      <span>{language === 'pt' ? 'Escolha um arquivo' : 'Choose a file'}</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">{language === 'pt' ? 'ou arraste e solte' : 'or drag and drop'}</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    {language === 'pt' ? 'PNG, JPG, GIF até 10MB (compressão automática)' : 'PNG, JPG, GIF up to 10MB (auto-compression)'}
                  </p>
                  {isCompressing && (
                    <p className="text-xs leading-5 text-emerald-600 font-semibold mt-2">
                      {language === 'pt' ? 'Comprimindo imagem...' : 'Compressing image...'}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              {language === 'pt' ? 'Cancelar' : 'Cancel'}
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={isLoading}
            >
              {isLoading 
                ? (language === 'pt' ? 'Salvando...' : 'Saving...')
                : (product 
                  ? (language === 'pt' ? 'Atualizar' : 'Update')
                  : (language === 'pt' ? 'Criar' : 'Create')
                )
              }
            </Button>
          </div>
        </form>
      </div>

      {/* Image Crop Modal */}
      <ImageCropModal
        isOpen={showCropModal}
        imageUrl={tempImageUrl}
        onCropComplete={handleCropComplete}
        onClose={() => setShowCropModal(false)}
        language={language}
      />
    </div>
  );
}
