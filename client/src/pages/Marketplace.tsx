import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Leaf, Package, Star } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  sustainabilityScore: number;
  stock: number;
}



export default function Marketplace() {
  const { t } = useLanguage();
  const { user, loading, isAuthenticated } = useAuth();
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(t('marketplace.category_all'));

  const { data: products, isLoading: productsLoading } = trpc.admin.products.list.useQuery();

  const categories = [t('marketplace.category_all'), t('marketplace.category_seeds'), t('marketplace.category_inputs'), t('marketplace.category_equipment'), t('marketplace.category_fresh')];

  const allCategoryLabel = t('marketplace.category_all');
  const filteredProducts = !products ? [] : (selectedCategory === allCategoryLabel || selectedCategory === 'Todos'
    ? products 
    : products.filter(p => p.category === selectedCategory));

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-2xl">{t('page.access_denied')}</CardTitle>
            <CardDescription>{t('auth.login_required')}</CardDescription>
          </CardHeader>
          <CardFooter>
            <a href={getLoginUrl()} className="w-full">
              <Button className="w-full">{t('auth.login')}</Button>
            </a>
          </CardFooter>
        </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col">
      <Header />
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingCart className="w-10 h-10" />
            <h1 className="text-5xl font-bold">{t('marketplace.title')}</h1>
          </div>
          <p className="text-xl opacity-90">{t('marketplace.subtitle')}</p>
        </div>
      </div>

      <div className="container py-12">
        {productsLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">{t('common.loading')}</p>
          </div>
        ) : (
          <>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Cart Summary */}
        {totalItems > 0 && (
          <Card className="mb-8 bg-primary/5 border-primary">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                  <span className="font-semibold">{totalItems} {t('marketplace.cart_items')}</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{totalPrice.toLocaleString('pt-MZ')} MZN</div>
                  <Link href="/checkout">
                    <Button size="sm" className="mt-2">{t('marketplace.checkout')}</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="hover-lift hover-glow overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                  <Leaf className="w-3 h-3 mr-1" />
                  {product.sustainabilityScore}%
                </Badge>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <Badge variant="secondary" className="bg-white/90">
                    {product.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-primary">
                    {product.price.toLocaleString('pt-MZ')} <span className="text-lg">MZN</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Package className="w-4 h-4" />
                    <span className="text-sm">{product.stock} {t('marketplace.stock')}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {t('marketplace.add_to_cart')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        </>
        )}
      </div>

      <Footer />
    </div>
  );
}
