import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const faqData = [
    {
      category: t('faq.category.general'),
      questions: [
        { id: 1, question: t('faq.q1'), answer: t('faq.a1') },
        { id: 2, question: t('faq.q2'), answer: t('faq.a2') },
        { id: 3, question: t('faq.q3'), answer: t('faq.a3') }
      ]
    },
    {
      category: t('faq.category.features'),
      questions: [
        { id: 4, question: t('faq.q4'), answer: t('faq.a4') },
        { id: 5, question: t('faq.q5'), answer: t('faq.a5') },
        { id: 6, question: t('faq.q6'), answer: t('faq.a6') },
        { id: 7, question: t('faq.q7'), answer: t('faq.a7') }
      ]
    },
    {
      category: t('faq.category.account'),
      questions: [
        { id: 8, question: t('faq.q8'), answer: t('faq.a8') },
        { id: 9, question: t('faq.q9'), answer: t('faq.a9') },
        { id: 10, question: t('faq.q10'), answer: t('faq.a10') },
        { id: 11, question: t('faq.q11'), answer: t('faq.a11') }
      ]
    },
    {
      category: t('faq.category.payments'),
      questions: [
        { id: 12, question: t('faq.q12'), answer: t('faq.a12') },
        { id: 13, question: t('faq.q13'), answer: t('faq.a13') },
        { id: 14, question: t('faq.q14'), answer: t('faq.a14') },
        { id: 15, question: t('faq.q15'), answer: t('faq.a15') }
      ]
    },
    {
      category: t('faq.category.support'),
      questions: [
        { id: 16, question: t('faq.q16'), answer: t('faq.a16') },
        { id: 17, question: t('faq.q17'), answer: t('faq.a17') },
        { id: 18, question: t('faq.q18'), answer: t('faq.a18') }
      ]
    }
  ];

  const toggleQuestion = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <HelpCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('faq.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('faq.subtitle')}
            </p>
          </div>

          {/* FAQ Categories */}
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {category.category}
              </h2>
              
              <div className="space-y-3">
                {category.questions.map((faq) => (
                  <Card 
                    key={faq.id}
                    className="border border-gray-200 hover:border-emerald-300 transition-colors cursor-pointer"
                    onClick={() => toggleQuestion(faq.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {faq.question}
                        </CardTitle>
                        <ChevronDown 
                          className={`w-5 h-5 text-gray-500 transition-transform ${
                            expandedId === faq.id ? 'transform rotate-180' : ''
                          }`}
                        />
                      </div>
                    </CardHeader>
                    
                    {expandedId === faq.id && (
                      <CardContent className="pt-0">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* Contact Section */}
          <Card className="mt-12 bg-emerald-50 border-emerald-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-emerald-600" />
                <div>
                  <CardTitle className="text-xl text-gray-900">
                    {t('faq.no_answer')}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {t('faq.contact_us')}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/contact">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  {t('faq.contact_us')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
