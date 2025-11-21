import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Leaf, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data for global search
const searchableContent = [
  // Knowledge
  { id: 1, title: "Agricultura Sustentável", category: "Artigo", href: "/knowledge", type: "knowledge" },
  { id: 2, title: "Técnicas de Irrigação", category: "Vídeo", href: "/knowledge", type: "knowledge" },
  { id: 3, title: "Compostagem Orgânica", category: "Guia", href: "/knowledge", type: "knowledge" },
  
  // Marketplace
  { id: 4, title: "Sementes Orgânicas", category: "Produto", href: "/marketplace", type: "marketplace" },
  { id: 5, title: "Fertilizante Orgânico", category: "Produto", href: "/marketplace", type: "marketplace" },
  { id: 6, title: "Sistema de Irrigação", category: "Equipamento", href: "/marketplace", type: "marketplace" },
  
  // Services
  { id: 7, title: "Consultoria Técnica", category: "Serviço", href: "/services", type: "services" },
  { id: 8, title: "Treinamento e Capacitação", category: "Serviço", href: "/services", type: "services" },
  
  // Blog
  { id: 9, title: "Futuro da Agricultura", category: "Blog", href: "/blog", type: "blog" },
  { id: 10, title: "Sustentabilidade Ambiental", category: "Blog", href: "/blog", type: "blog" },
  
  // Tools
  { id: 11, title: "Calculadora de Carbono", category: "Ferramenta", href: "/tools", type: "tools" },
  { id: 12, title: "Calculadora de Custos", category: "Ferramenta", href: "/tools", type: "tools" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof searchableContent>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Centro de Conhecimento", href: "/knowledge" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Serviços", href: "/services" },
    { label: "Ferramentas", href: "/tools" },
    { label: "Minha Área", href: "/@dashboard" }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results = searchableContent.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
    setShowSearchResults(true);
  };

  const getCategoryColor = (type: string) => {
    const colors: Record<string, string> = {
      knowledge: "bg-blue-100 text-blue-800",
      marketplace: "bg-green-100 text-green-800",
      services: "bg-purple-100 text-purple-800",
      blog: "bg-orange-100 text-orange-800",
      tools: "bg-pink-100 text-pink-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-primary hidden sm:inline whitespace-nowrap">SustainHub</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-xs relative">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setShowSearchResults(true)}
                className="pl-9 pr-3 py-1.5 w-full text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  {searchResults.map((result) => (
                    <Link key={result.id} href={result.href} onClick={() => {
                      setSearchQuery("");
                      setShowSearchResults(false);
                    }} className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors">
                      <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{result.title}</h4>
                            <p className="text-sm text-gray-500">{result.category}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(result.type)}`}>
                            {result.type === "knowledge" && "Conhecimento"}
                            {result.type === "marketplace" && "Marketplace"}
                            {result.type === "services" && "Serviços"}
                            {result.type === "blog" && "Blog"}
                            {result.type === "tools" && "Ferramentas"}
                          </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {showSearchResults && searchQuery && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500 z-50">
                  Nenhum resultado encontrado para "{searchQuery}"
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0 flex-1 justify-center">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="px-2.5 py-2 text-xs font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-md transition-colors whitespace-nowrap">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <Link href="/knowledge">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Começar
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Search */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 pt-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Mobile Search Results */}
            {searchResults.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4 max-h-48 overflow-y-auto">
                {searchResults.map((result) => (
                  <Link key={result.id} href={result.href} onClick={() => {
                    setSearchQuery("");
                    setIsMenuOpen(false);
                  }} className="block px-3 py-2 hover:bg-white rounded-md transition-colors text-sm">
                    <h4 className="font-medium text-gray-900">{result.title}</h4>
                    <p className="text-xs text-gray-500">{result.category}</p>
                  </Link>
                ))}
                </div>
            )}
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-2 pt-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-md transition-colors">
                  {item.label}
                </Link>
              ))}
              <Link href="/knowledge">
                <Button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full mt-2 bg-primary hover:bg-primary/90 text-white"
                >
                  Começar
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
