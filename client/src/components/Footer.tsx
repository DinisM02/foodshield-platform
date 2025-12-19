import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { APP_LOGO } from "@/const";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Newsletter Section */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">{t('newsletter.title')}</h3>
            <p className="text-gray-400 mb-6">{t('newsletter.subtitle')}</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder={t('newsletter.email')}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white">
                {t('newsletter.subscribe')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {t('footer.company')}
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                title="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Plataforma */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              {t('footer.platform')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/knowledge" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t('nav.knowledge')}
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t('nav.tools')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              {t('footer.resources')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  FAQ
                </Link>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t('footer.privacy')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              {t('footer.contact')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href="mailto:info@sustainhub.com" className="text-white hover:text-primary transition-colors text-sm font-medium">
                    info@sustainhub.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">Telefone</p>
                  <a href="tel:+258123456789" className="text-white hover:text-primary transition-colors text-sm font-medium">
                    +258 (1) 2345-6789
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">Localização</p>
                  <p className="text-white text-sm font-medium">Maputo, Moçambique</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              {t('footer.company')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t('footer.careers')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Parceiros
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Imprensa
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800" />
      </div>

      {/* Bottom Footer */}
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} SustainHub. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap gap-6 justify-center md:justify-end">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
              Termos de Serviço
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
              Cookies
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
              Acessibilidade
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 hover:opacity-100 pointer-events-none hover:pointer-events-auto"
        title="Voltar ao topo"
      >
        <ArrowRight className="w-5 h-5 rotate-[-90deg]" />
      </button>
    </footer>
  );
}
