import ConsumerLayout from "@/components/ConsumerLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Loader2, ShoppingCart, BookOpen, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { toast } from "sonner";

export default function ConsumerFavorites() {
  const { t, language } = useLanguage();
  const utils = trpc.useUtils();

  // Fetch favorites
  const { data: favorites, isLoading } = trpc.favorites.list.useQuery();

  // Fetch products and blog posts to get details
  const { data: products } = trpc.admin.products.list.useQuery();
  const { data: blogPosts } = trpc.admin.blog.list.useQuery();

  // Remove favorite mutation
  const removeFavorite = trpc.favorites.remove.useMutation({
    onSuccess: () => {
      utils.favorites.list.invalidate();
      toast.success(t('favorites.removed'));
    },
  });

  // Separate favorites by type
  const productFavorites = favorites?.filter(f => f.itemType === 'product') || [];
  const blogFavorites = favorites?.filter(f => f.itemType === 'blog') || [];

  // Get product details
  const favoriteProducts = productFavorites
    .map(fav => products?.find(p => p.id === fav.itemId))
    .filter(Boolean);

  // Get blog details
  const favoriteBlogs = blogFavorites
    .map(fav => blogPosts?.find(b => b.id === fav.itemId))
    .filter(Boolean);

  const handleRemove = (itemType: "product" | "blog", itemId: number) => {
    removeFavorite.mutate({ itemType, itemId });
  };

  return (
    <ConsumerLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('consumer.favorites')}</h1>
          <p className="text-gray-600">{t('favorites.subtitle')}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Favorite Products */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">{t('favorites.products')}</h2>
                <Badge variant="secondary">{favoriteProducts.length}</Badge>
              </div>

              {favoriteProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteProducts.map((product: any) => (
                    <Card key={product.id} className="hover-lift">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          size="icon"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={() => handleRemove('product', product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary">{product.price} MZN</span>
                          <Link href="/consumer/marketplace">
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              {t('common.view')}
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">{t('favorites.no_products')}</p>
                    <Link href="/consumer/marketplace">
                      <Button className="mt-4 bg-primary hover:bg-primary/90">
                        {t('favorites.browse_products')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Favorite Blog Posts */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">{t('favorites.articles')}</h2>
                <Badge variant="secondary">{favoriteBlogs.length}</Badge>
              </div>

              {favoriteBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteBlogs.map((blog: any) => {
                    const title = language === 'pt' ? blog.titlePt : blog.titleEn;
                    const excerpt = language === 'pt' ? blog.excerptPt : blog.excerptEn;
                    
                    return (
                      <Card key={blog.id} className="hover-lift">
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                          <img
                            src={blog.imageUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-2 right-2"
                            onClick={() => handleRemove('blog', blog.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Badge className="absolute bottom-2 left-2 bg-primary text-white">
                            {blog.category}
                          </Badge>
                        </div>
                        <CardHeader>
                          <CardTitle className="line-clamp-2">{title}</CardTitle>
                          <CardDescription className="line-clamp-2">{excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{blog.readTime} min</span>
                            <Link href={`/blog/${blog.id}`}>
                              <Button size="sm" className="bg-primary hover:bg-primary/90">
                                {t('common.read')}
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">{t('favorites.no_articles')}</p>
                    <Link href="/consumer/blog">
                      <Button className="mt-4 bg-primary hover:bg-primary/90">
                        {t('favorites.browse_articles')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </ConsumerLayout>
  );
}
