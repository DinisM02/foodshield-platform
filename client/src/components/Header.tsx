import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Centro de Conhecimento", href: "/knowledge" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Serviços", href: "/services" },
    { label: "Ferramentas", href: "/tools" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Depoimentos", href: "/testimonials" },
    { label: "Minha Área", href: "/@dashboard" }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-primary hidden sm:inline">SustainHub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-md transition-colors">
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-2 pt-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-md transition-colors"
                  >
                    {item.label}
                  </a>
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
