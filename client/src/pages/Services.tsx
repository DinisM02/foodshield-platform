import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, Calendar, CheckCircle, ArrowRight, Clock, User, Loader2 } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Services() {
  const { t, language } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    notes: ""
  });

  const { data: services, isLoading } = trpc.services.list.useQuery();
  
  const bookConsultation = trpc.consultations.create.useMutation({
    onSuccess: () => {
      toast.success(language === "pt" ? "Consulta agendada com sucesso!" : "Consultation booked successfully!");
      setShowBookingModal(false);
      setSelectedService(null);
      setBookingData({ date: "", time: "", notes: "" });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleBook = (service: any) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const handleSubmitBooking = () => {
    if (!bookingData.date || !bookingData.time) {
      toast.error(language === "pt" ? "Por favor, selecione data e hora" : "Please select date and time");
      return;
    }

    const scheduledDate = new Date(`${bookingData.date}T${bookingData.time}`);
    const title = language === "pt" ? selectedService.titlePt : selectedService.titleEn;
    
    bookConsultation.mutate({
      title: title,
      description: bookingData.notes || `${language === "pt" ? "Agendamento para" : "Booking for"} ${title}`,
      scheduledDate: scheduledDate.toISOString(),
      serviceId: selectedService.id
    });
  };

  const getPriceLabel = (priceType: string) => {
    const labels: Record<string, Record<string, string>> = {
      hourly: { pt: "/hora", en: "/hour" },
      daily: { pt: "/dia", en: "/day" },
      project: { pt: "/projeto", en: "/project" }
    };
    return labels[priceType]?.[language] || "";
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
          <Card className="max-w-md w-full mx-4">
            <CardHeader>
              <CardTitle className="text-2xl">{t('auth.login_required')}</CardTitle>
              <CardDescription>
                {language === "pt" 
                  ? "Faça login para acessar nossos serviços e agendar consultas"
                  : "Log in to access our services and book consultations"}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <a href={getLoginUrl()} className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  {t('auth.login')}
                </Button>
              </a>
            </CardFooter>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex flex-col">
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
        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        )}

        {/* Services Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {services?.map(service => {
              const title = language === "pt" ? service.titlePt : service.titleEn;
              const description = language === "pt" ? service.descriptionPt : service.descriptionEn;
              const features = service.features ? JSON.parse(service.features) : [];
              
              return (
                <Card key={service.id} className="hover-lift hover-glow overflow-hidden group">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{title}</CardTitle>
                        <Badge variant={service.available ? "default" : "secondary"} className={service.available ? "bg-green-500" : ""}>
                          {service.available 
                            ? (language === "pt" ? "Disponível" : "Available")
                            : (language === "pt" ? "Indisponível" : "Unavailable")}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-primary">{service.price}</span>
                        <span className="text-sm text-muted-foreground"> MZN{getPriceLabel(service.priceType)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">
                      {description}
                    </CardDescription>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{service.specialist}</span>
                    </div>

                    {features.length > 0 && (
                      <div className="space-y-2">
                        {features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>

                  <CardFooter>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => handleBook(service)}
                      disabled={!service.available}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {language === "pt" ? "Agendar Consulta" : "Book Consultation"}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}

        {/* Contact Section */}
        <Card className="bg-gradient-to-br from-primary to-green-600 text-white border-none">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">
              {language === "pt" ? "Precisa de Ajuda Personalizada?" : "Need Personalized Help?"}
            </CardTitle>
            <CardDescription className="text-white/90 text-lg">
              {language === "pt" 
                ? "Nossa equipe está pronta para entender suas necessidades específicas"
                : "Our team is ready to understand your specific needs"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              <div className="text-center">
                <Clock className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-semibold mb-1">{language === "pt" ? "Resposta Rápida" : "Quick Response"}</h4>
                <p className="text-sm opacity-90">{language === "pt" ? "Em até 24 horas" : "Within 24 hours"}</p>
              </div>
              <div className="text-center">
                <Calendar className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-semibold mb-1">{language === "pt" ? "Flexibilidade" : "Flexibility"}</h4>
                <p className="text-sm opacity-90">{language === "pt" ? "Escolha seu horário" : "Choose your time"}</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-semibold mb-1">{language === "pt" ? "Especialistas" : "Specialists"}</h4>
                <p className="text-sm opacity-90">{language === "pt" ? "Equipe qualificada" : "Qualified team"}</p>
              </div>
            </div>
            <Button size="lg" variant="secondary" className="text-primary">
              {language === "pt" ? "Entrar em Contato" : "Contact Us"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === "pt" ? "Agendar Consulta" : "Book Consultation"}
            </DialogTitle>
            <DialogDescription>
              {selectedService && (language === "pt" ? selectedService.titlePt : selectedService.titleEn)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">{language === "pt" ? "Data" : "Date"} *</Label>
              <Input
                id="date"
                type="date"
                value={bookingData.date}
                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">{language === "pt" ? "Hora" : "Time"} *</Label>
              <Input
                id="time"
                type="time"
                value={bookingData.time}
                onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">{language === "pt" ? "Observações" : "Notes"}</Label>
              <Textarea
                id="notes"
                placeholder={language === "pt" ? "Descreva suas necessidades..." : "Describe your needs..."}
                value={bookingData.notes}
                onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                rows={3}
              />
            </div>

            {selectedService && (
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{language === "pt" ? "Valor" : "Price"}:</span>
                  <span className="font-bold text-lg">{selectedService.price} MZN{getPriceLabel(selectedService.priceType)}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-muted-foreground">{language === "pt" ? "Especialista" : "Specialist"}:</span>
                  <span>{selectedService.specialist}</span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBookingModal(false)}>
              {language === "pt" ? "Cancelar" : "Cancel"}
            </Button>
            <Button 
              onClick={handleSubmitBooking}
              disabled={bookConsultation.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {bookConsultation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Calendar className="w-4 h-4 mr-2" />
              )}
              {language === "pt" ? "Confirmar Agendamento" : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
