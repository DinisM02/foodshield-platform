import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Calendar, CheckCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  const services = [
    {
      id: 1,
      title: t('services.service1.title'),
      description: t('services.service1.description'),
      imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800",
      features: [
        t('services.service1.feature1'),
        t('services.service1.feature2'),
        t('services.service1.feature3')
      ],
      price: t('services.service1.price')
    },
    {
      id: 2,
      title: t('services.service2.title'),
      description: t('services.service2.description'),
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
      features: [
        t('services.service2.feature1'),
        t('services.service2.feature2'),
        t('services.service2.feature3')
      ],
      price: t('services.service2.price')
    },
    {
      id: 3,
      title: t('services.service3.title'),
      description: t('services.service3.description'),
      imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800",
      features: [
        t('services.service3.feature1'),
        t('services.service3.feature2'),
        t('services.service3.feature3')
      ],
      price: t('services.service3.price')
    },
    {
      id: 4,
      title: t('services.service4.title'),
      description: t('services.service4.description'),
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
      features: [
        t('services.service4.feature1'),
        t('services.service4.feature2'),
        t('services.service4.feature3')
      ],
      price: t('services.service4.price')
    }
  ];

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
            <Users className="w-10 h-10" />
            <h1 className="text-5xl font-bold">{t('services.title')}</h1>
          </div>
          <p className="text-xl opacity-90">{t('services.subtitle')}</p>
        </div>
      </div>

      <div className="container py-12">
        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map(service => (
            <Card key={service.id} className="hover-lift hover-glow overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.imageUrl} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <Badge className="bg-white text-primary">
                    {service.price}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t('services.schedule_consultation')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-none">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">{t('services.need_help')}</CardTitle>
            <CardDescription className="text-white/90 text-lg">
              {t('services.team_ready')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-semibold mb-1">{t('services.chat_online')}</h4>
                <p className="text-sm opacity-90">{t('services.chat_response')}</p>
              </div>
              <div className="text-center">
                <Calendar className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-semibold mb-1">{t('services.schedule_meeting')}</h4>
                <p className="text-sm opacity-90">{t('services.choose_time')}</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-semibold mb-1">{t('services.in_person')}</h4>
                <p className="text-sm opacity-90">{t('services.on_site')}</p>
              </div>
            </div>
            <Button size="lg" variant="secondary" className="text-primary">
              {t('services.contact_us')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
