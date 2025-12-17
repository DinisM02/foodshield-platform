import { useState, useEffect, useMemo } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Loader2, Upload, Eye } from 'lucide-react';
import SimpleMDE from 'react-simplemde-editor';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'easymde/dist/easymde.min.css';

interface BlogEditorProps {
  postId?: number;
  onSuccess: () => void;
  t: (key: string) => string;
  language: string;
}

export function BlogEditor({ postId, onSuccess, t, language }: BlogEditorProps) {
  const [titlePt, setTitlePt] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [excerptPt, setExcerptPt] = useState('');
  const [excerptEn, setExcerptEn] = useState('');
  const [contentPt, setContentPt] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [readTime, setReadTime] = useState('5');
  const [published, setPublished] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState('pt');

  const { data: existingPost, isLoading: loadingPost } = trpc.admin.blog.get.useQuery(
    { id: postId! },
    { enabled: !!postId }
  );

  const createMutation = trpc.admin.blog.create.useMutation({
    onSuccess: () => {
      toast.success(language === 'pt' ? 'Artigo criado com sucesso!' : 'Article created successfully!');
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = trpc.admin.blog.update.useMutation({
    onSuccess: () => {
      toast.success(language === 'pt' ? 'Artigo atualizado com sucesso!' : 'Article updated successfully!');
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const uploadImageMutation = trpc.admin.products.uploadImage.useMutation();

  useEffect(() => {
    if (existingPost) {
      setTitlePt(existingPost.titlePt);
      setTitleEn(existingPost.titleEn);
      setExcerptPt(existingPost.excerptPt);
      setExcerptEn(existingPost.excerptEn);
      setContentPt(existingPost.contentPt);
      setContentEn(existingPost.contentEn);
      setAuthor(existingPost.author);
      setCategory(existingPost.category);
      setImageUrl(existingPost.imageUrl);
      setReadTime(existingPost.readTime.toString());
      setPublished(existingPost.published);
    }
  }, [existingPost]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error(language === 'pt' ? 'Por favor, selecione uma imagem' : 'Please select an image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(language === 'pt' ? 'Imagem muito grande (máx 5MB)' : 'Image too large (max 5MB)');
      return;
    }

    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const result = await uploadImageMutation.mutateAsync({
          file: base64String,
          filename: file.name,
          contentType: file.type,
        });
        setImageUrl(result.url);
        toast.success(language === 'pt' ? 'Imagem enviada!' : 'Image uploaded!');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(language === 'pt' ? 'Erro ao enviar imagem' : 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = () => {
    if (!titlePt || !titleEn || !contentPt || !contentEn) {
      toast.error(language === 'pt' ? 'Preencha todos os campos obrigatórios' : 'Fill in all required fields');
      return;
    }

    const data = {
      titlePt,
      titleEn,
      excerptPt,
      excerptEn,
      contentPt,
      contentEn,
      author,
      category,
      imageUrl,
      readTime: parseInt(readTime),
      published,
    };

    if (postId) {
      updateMutation.mutate({ id: postId, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const editorOptions = useMemo(() => ({
    spellChecker: false,
    placeholder: language === 'pt' ? 'Escreva seu conteúdo em Markdown...' : 'Write your content in Markdown...',
    toolbar: [
      'bold', 'italic', 'heading', '|' as const,
      'quote', 'unordered-list', 'ordered-list', '|' as const,
      'link', 'image', '|' as const,
      'preview', 'side-by-side', 'fullscreen', '|' as const,
      'guide'
    ] as const,
    minHeight: '300px',
  } as any), [language]);

  if (loadingPost) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Image Upload */}
      <div>
        <Label>{language === 'pt' ? 'Imagem de Capa' : 'Cover Image'}</Label>
        <div className="mt-2 flex items-center gap-4">
          {imageUrl && (
            <img src={imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
          )}
          <div className="flex-1">
            <input
              type="file"
              id="blog-image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('blog-image-upload')?.click()}
              disabled={uploadingImage}
            >
              {uploadingImage ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {language === 'pt' ? 'Enviando...' : 'Uploading...'}
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  {language === 'pt' ? 'Enviar Imagem' : 'Upload Image'}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>{language === 'pt' ? 'Autor' : 'Author'}</Label>
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder={language === 'pt' ? 'Nome do autor' : 'Author name'}
          />
        </div>
        <div>
          <Label>{language === 'pt' ? 'Categoria' : 'Category'}</Label>
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder={language === 'pt' ? 'Ex: Agricultura' : 'Ex: Agriculture'}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>{language === 'pt' ? 'Tempo de Leitura (min)' : 'Read Time (min)'}</Label>
          <Input
            type="number"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            min="1"
          />
        </div>
        <div>
          <Label>{language === 'pt' ? 'Status' : 'Status'}</Label>
          <select
            value={published ? 'published' : 'draft'}
            onChange={(e) => setPublished(e.target.value === 'published')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="draft">{language === 'pt' ? 'Rascunho' : 'Draft'}</option>
            <option value="published">{language === 'pt' ? 'Publicado' : 'Published'}</option>
          </select>
        </div>
      </div>

      {/* Bilingual Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pt">Português 🇵🇹</TabsTrigger>
          <TabsTrigger value="en">English 🇬🇧</TabsTrigger>
        </TabsList>

        <TabsContent value="pt" className="space-y-4">
          <div>
            <Label>{language === 'pt' ? 'Título (PT)' : 'Title (PT)'} *</Label>
            <Input
              value={titlePt}
              onChange={(e) => setTitlePt(e.target.value)}
              placeholder={language === 'pt' ? 'Digite o título em português' : 'Enter title in Portuguese'}
            />
          </div>

          <div>
            <Label>{language === 'pt' ? 'Resumo (PT)' : 'Excerpt (PT)'}</Label>
            <Input
              value={excerptPt}
              onChange={(e) => setExcerptPt(e.target.value)}
              placeholder={language === 'pt' ? 'Breve descrição do artigo' : 'Brief article description'}
            />
          </div>

          <div>
            <Label className="flex items-center justify-between">
              <span>{language === 'pt' ? 'Conteúdo (PT)' : 'Content (PT)'} *</span>
              <span className="text-xs text-gray-500">Markdown suportado</span>
            </Label>
            <SimpleMDE
              value={contentPt}
              onChange={setContentPt}
              options={editorOptions}
            />
          </div>
        </TabsContent>

        <TabsContent value="en" className="space-y-4">
          <div>
            <Label>{language === 'pt' ? 'Título (EN)' : 'Title (EN)'} *</Label>
            <Input
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder={language === 'pt' ? 'Digite o título em inglês' : 'Enter title in English'}
            />
          </div>

          <div>
            <Label>{language === 'pt' ? 'Resumo (EN)' : 'Excerpt (EN)'}</Label>
            <Input
              value={excerptEn}
              onChange={(e) => setExcerptEn(e.target.value)}
              placeholder={language === 'pt' ? 'Breve descrição do artigo' : 'Brief article description'}
            />
          </div>

          <div>
            <Label className="flex items-center justify-between">
              <span>{language === 'pt' ? 'Conteúdo (EN)' : 'Content (EN)'} *</span>
              <span className="text-xs text-gray-500">Markdown supported</span>
            </Label>
            <SimpleMDE
              value={contentEn}
              onChange={setContentEn}
              options={editorOptions}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
        >
          {language === 'pt' ? 'Cancelar' : 'Cancel'}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {(createMutation.isPending || updateMutation.isPending) ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {language === 'pt' ? 'Salvando...' : 'Saving...'}
            </>
          ) : (
            <>
              {postId 
                ? (language === 'pt' ? 'Atualizar' : 'Update')
                : (language === 'pt' ? 'Criar Artigo' : 'Create Article')
              }
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
