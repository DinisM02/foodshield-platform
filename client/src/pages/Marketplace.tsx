import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Leaf, Package, Star } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

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

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Sementes Orgânicas de Milho",
    description: "Sementes certificadas, livres de OGM, ideais para agricultura sustentável",
    price: 250,
    category: "Sementes",
    imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=800",
    sustainabilityScore: 95,
    stock: 50
  },
  {
    id: 2,
    name: "Fertilizante Orgânico",
    description: "Composto natural rico em nutrientes para solo saudável",
    price: 180,
    category: "Insumos",
    imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800",
    sustainabilityScore: 90,
    stock: 100
  },
  {
    id: 3,
    name: "Sistema de Irrigação por Gotejamento",
    description: "Economize até 70% de água com tecnologia eficiente",
    price: 1500,
    category: "Equipamentos",
    imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800",
    sustainabilityScore: 88,
    stock: 20
  },
  {
    id: 4,
    name: "Kit de Compostagem",
    description: "Transforme resíduos orgânicos em adubo de qualidade",
    price: 450,
    category: "Equipamentos",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
    sustainabilityScore: 92,
    stock: 35
  },
  {
    id: 5,
    name: "Tomate Orgânico Local",
    description: "Produção local certificada, colhido na hora certa",
    price: 80,
    category: "Produtos Frescos",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800",
    sustainabilityScore: 85,
    stock: 200
  },
  {
    id: 6,
    name: "Mel Silvestre",
    description: "Mel puro de abelhas nativas, sem processamento",
    price: 350,
    category: "Produtos Frescos",
    imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784720?q=80&w=800",
    sustainabilityScore: 93,
    stock: 45
  }
];

export default function Marketplace() {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const categories = ["Todos", "Sementes", "Insumos", "Equipamentos", "Produtos Frescos"];

  const filteredProducts = selectedCategory === "Todos" 
    ? mockProducts 
    : mockProducts.filter(p => p.category === selectedCategory);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-2xl">Acesso Restrito</CardTitle>
            <CardDescription>Faça login para acessar o marketplace</CardDescription>
          </CardHeader>
          <CardFooter>
            <a href={getLoginUrl()} className="w-full">
              <Button className="w-full">Fazer Login</Button>
            </a>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingCart className="w-10 h-10" />
            <h1 className="text-5xl font-bold">Marketplace Sustentável</h1>
          </div>
          <p className="text-xl opacity-90">Produtos locais certificados com impacto positivo</p>
        </div>
      </div>

      <div className="container py-12">
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
                  <span className="font-semibold">{totalItems} {totalItems === 1 ? 'item' : 'itens'} no carrinho</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{totalPrice.toLocaleString('pt-MZ')} MZN</div>
                  <Button size="sm" className="mt-2">Finalizar Compra</Button>
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
                    <span className="text-sm">{product.stock} em estoque</span>
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
                  Adicionar ao Carrinho
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-white mt-20" style={{ backgroundColor: '#0084B6' }}>
        <div className="container">
          <p>&copy; 2025 SustainHub. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
