import { Link } from "wouter";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">SustainHub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Transformando a agricultura através da sustentabilidade e inovação.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Plataforma</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/knowledge">
                  <a className="text-gray-400 hover:text-primary transition-colors">
                    Centro de Conhecimento
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/marketplace">
                  <a className="text-gray-400 hover:text-primary transition-colors">
                    Marketplace
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-400 hover:text-primary transition-colors">
                    Serviços
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/tools">
                  <a className="text-gray-400 hover:text-primary transition-colors">
                    Ferramentas
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog">
                  <a className="text-gray-400 hover:text-primary transition-colors">
                    Blog
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <a className="text-gray-400 hover:text-primary transition-colors">
                    FAQ
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/testimonials">
                  <a className="text-gray-400 hover:text-primary transition-colors">
                    Depoimentos
                  </a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Documentação
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="mailto:info@sustainhub.com" className="text-gray-400 hover:text-primary transition-colors">
                  info@sustainhub.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="tel:+258123456789" className="text-gray-400 hover:text-primary transition-colors">
                  +258 (1) 2345-6789
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Maputo, Moçambique
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} SustainHub. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Termos de Serviço
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Contato
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
