import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

const faqData = [
  {
    category: "Geral",
    questions: [
      {
        id: 1,
        question: "O que é o SustainHub?",
        answer: "SustainHub é uma plataforma completa dedicada à segurança alimentar e desenvolvimento sustentável. Oferecemos ferramentas, conhecimento e recursos para ajudar produtores e empreendedores a implementar práticas sustentáveis em seus negócios."
      },
      {
        id: 2,
        question: "Quem pode usar a plataforma?",
        answer: "Qualquer pessoa interessada em agricultura sustentável, segurança alimentar ou desenvolvimento sustentável pode usar o SustainHub. Isso inclui pequenos produtores, cooperativas, consultores, pesquisadores e consumidores conscientes."
      },
      {
        id: 3,
        question: "A plataforma é gratuita?",
        answer: "SustainHub oferece um plano gratuito com acesso a recursos básicos. Também temos planos premium com acesso a ferramentas avançadas, consultoria especializada e conteúdo exclusivo."
      }
    ]
  },
  {
    category: "Funcionalidades",
    questions: [
      {
        id: 4,
        question: "Como funciona o Centro de Conhecimento?",
        answer: "O Centro de Conhecimento é uma biblioteca digital com artigos, vídeos, guias e pesquisas sobre agricultura sustentável. Você pode buscar por tópicos, filtrar por categoria e acessar conteúdo de especialistas."
      },
      {
        id: 5,
        question: "O que é o Marketplace?",
        answer: "O Marketplace é um espaço onde produtores locais podem vender produtos sustentáveis diretamente aos consumidores. Todos os produtos têm indicadores de impacto ambiental e informações de origem."
      },
      {
        id: 6,
        question: "Como solicitar consultoria?",
        answer: "Na seção de Serviços, você pode visualizar consultores disponíveis e suas especialidades. Clique em 'Solicitar Consultoria', preencha o formulário com seus detalhes e um consultor entrará em contato em breve."
      },
      {
        id: 7,
        question: "Quais são as ferramentas disponíveis?",
        answer: "Oferecemos calculadoras de emissões de carbono, análise de custos de produção, calculadora nutricional e dashboards para monitorar sustentabilidade. Mais ferramentas estão sendo desenvolvidas continuamente."
      }
    ]
  },
  {
    category: "Conta e Segurança",
    questions: [
      {
        id: 8,
        question: "Como criar uma conta?",
        answer: "Clique no botão 'Criar Conta' na página inicial, preencha seus dados (nome, email e senha) e confirme seu email. Sua conta estará pronta para usar imediatamente."
      },
      {
        id: 9,
        question: "Meus dados estão seguros?",
        answer: "Sim, utilizamos criptografia de ponta a ponta e seguimos as melhores práticas de segurança de dados. Seus dados pessoais nunca são compartilhados com terceiros sem seu consentimento."
      },
      {
        id: 10,
        question: "Como faço para recuperar minha senha?",
        answer: "Na página de login, clique em 'Esqueceu a senha?'. Insira seu email e receberá um link para redefinir sua senha. O link é válido por 24 horas."
      },
      {
        id: 11,
        question: "Posso deletar minha conta?",
        answer: "Sim, você pode deletar sua conta a qualquer momento nas configurações de perfil. Todos os seus dados serão removidos permanentemente após 30 dias."
      }
    ]
  },
  {
    category: "Pagamentos",
    questions: [
      {
        id: 12,
        question: "Quais são os planos disponíveis?",
        answer: "Oferecemos 3 planos: Gratuito (recursos básicos), Premium (ferramentas avançadas) e Empresarial (consultoria dedicada). Cada plano pode ser cancelado a qualquer momento."
      },
      {
        id: 13,
        question: "Como faço para fazer upgrade?",
        answer: "Na sua conta, acesse 'Planos e Assinatura' e selecione o plano desejado. Você será redirecionado para a página de pagamento segura. O upgrade é imediato após o pagamento."
      },
      {
        id: 14,
        question: "Vocês oferecem reembolso?",
        answer: "Sim, oferecemos garantia de 30 dias. Se não estiver satisfeito, você pode solicitar reembolso total dentro desse período, sem perguntas."
      },
      {
        id: 15,
        question: "Quais formas de pagamento vocês aceitam?",
        answer: "Aceitamos cartão de crédito, transferência bancária e carteiras digitais. Todos os pagamentos são processados através de gateways seguros e certificados."
      }
    ]
  },
  {
    category: "Suporte",
    questions: [
      {
        id: 16,
        question: "Como entro em contato com o suporte?",
        answer: "Você pode entrar em contato através do formulário de contato no site, enviar email para support@sustainhub.com ou usar o chat ao vivo disponível 24/7."
      },
      {
        id: 17,
        question: "Qual é o tempo de resposta do suporte?",
        answer: "Respondemos a todas as mensagens dentro de 24 horas. Para questões urgentes, use o chat ao vivo que está disponível durante o horário comercial."
      },
      {
        id: 18,
        question: "Vocês oferecem treinamento?",
        answer: "Sim, oferecemos webinars gratuitos, tutoriais em vídeo e documentação completa. Clientes premium também têm acesso a treinamento personalizado."
      }
    ]
  }
];

export default function FAQ() {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-10 h-10" />
            <h1 className="text-5xl font-bold">{t('faq.title')}</h1>
          </div>
          <p className="text-xl opacity-90">{t('faq.subtitle')}</p>
        </div>
      </div>

      {/* FAQ Content */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          {faqData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6">{section.category}</h2>
              <div className="space-y-4">
                {section.questions.map((item) => (
                  <Card
                    key={item.id}
                    className="border-2 border-gray-200 hover:border-primary transition-colors cursor-pointer"
                    onClick={() => toggleExpand(item.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-lg text-gray-900 flex-1">
                          {item.question}
                        </CardTitle>
                        <ChevronDown
                          className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${
                            expandedId === item.id ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </CardHeader>

                    {expandedId === item.id && (
                      <CardContent className="bg-blue-50 text-gray-700 leading-relaxed">
                        {item.answer}
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-50">
        <div className="container text-center">
          <MessageCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Não encontrou sua resposta?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Nossa equipe de suporte está pronta para ajudar. Entre em contato conosco através do formulário abaixo.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 h-auto">
              Entrar em Contato
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
