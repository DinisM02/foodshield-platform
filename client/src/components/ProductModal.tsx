import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
  onSuccess: () => void;
  language: string;
}

export function ProductModal({ isOpen, onClose, product, onSuccess, language }: ProductModalProps) {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error(language === 'pt' ? 'Por favor selecione uma imagem' : 'Please select an image');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(language === 'pt' ? 'Imagem muito grande (máx 5MB)' : 'Image too large (max 5MB)');
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  const isLoading = createMutation.isPending || updateMutation.isPending || isUploading;

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
                <option value="Sementes">{language === 'pt' ? 'Sementes' : 'Seeds'}</option>
                <option value="Insumos">{language === 'pt' ? 'Insumos' : 'Inputs'}</option>
                <option value="Equipamentos">{language === 'pt' ? 'Equipamentos' : 'Equipment'}</option>
                <option value="Produtos Frescos">{language === 'pt' ? 'Produtos Frescos' : 'Fresh Products'}</option>
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
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
            {previewUrl && (
              <div className="mt-2">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
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
    </div>
  );
}
