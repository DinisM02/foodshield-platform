import { useState, useEffect } from "react";
import ConsumerLayout from "@/components/ConsumerLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone, MapPin, Camera, Save, Loader2 } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function ConsumerProfile() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    notifications: {
      email: true,
      orders: true,
      promotions: false
    }
  });

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    toast.success(language === "pt" ? "Perfil atualizado com sucesso!" : "Profile updated successfully!");
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  };

  return (
    <ConsumerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {language === "pt" ? "Meu Perfil" : "My Profile"}
            </h1>
            <p className="text-muted-foreground">
              {language === "pt" ? "Gerencie suas informações pessoais" : "Manage your personal information"}
            </p>
          </div>
          <Button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : isEditing ? (
              <Save className="w-4 h-4 mr-2" />
            ) : null}
            {isEditing 
              ? (language === "pt" ? "Salvar" : "Save")
              : (language === "pt" ? "Editar Perfil" : "Edit Profile")}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar Card */}
          <Card>
            <CardHeader>
              <CardTitle>{language === "pt" ? "Foto de Perfil" : "Profile Photo"}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-3xl bg-primary text-white">
                    {getInitials(profileData.name)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button 
                    size="icon" 
                    className="absolute bottom-0 right-0 rounded-full"
                    variant="secondary"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">{profileData.name || "Usuário"}</h3>
                <p className="text-sm text-muted-foreground">{profileData.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Personal Info Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {language === "pt" ? "Informações Pessoais" : "Personal Information"}
              </CardTitle>
              <CardDescription>
                {language === "pt" 
                  ? "Seus dados de contato e endereço"
                  : "Your contact details and address"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{language === "pt" ? "Nome Completo" : "Full Name"}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{language === "pt" ? "Telefone" : "Phone"}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                      placeholder="+258 84 XXX XXXX"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">{language === "pt" ? "Endereço" : "Address"}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      disabled={!isEditing}
                      placeholder={language === "pt" ? "Sua cidade, Moçambique" : "Your city, Mozambique"}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">{language === "pt" ? "Sobre Mim" : "About Me"}</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  disabled={!isEditing}
                  placeholder={language === "pt" 
                    ? "Conte um pouco sobre você..." 
                    : "Tell us a bit about yourself..."}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications Card */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>{language === "pt" ? "Preferências de Notificação" : "Notification Preferences"}</CardTitle>
              <CardDescription>
                {language === "pt" 
                  ? "Escolha como deseja receber atualizações"
                  : "Choose how you want to receive updates"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{language === "pt" ? "Notificações por Email" : "Email Notifications"}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === "pt" 
                        ? "Receba atualizações importantes por email"
                        : "Receive important updates via email"}
                    </p>
                  </div>
                  <Switch
                    checked={profileData.notifications.email}
                    onCheckedChange={(checked) => setProfileData({
                      ...profileData,
                      notifications: { ...profileData.notifications, email: checked }
                    })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{language === "pt" ? "Atualizações de Pedidos" : "Order Updates"}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === "pt" 
                        ? "Seja notificado sobre mudanças no status dos pedidos"
                        : "Get notified about order status changes"}
                    </p>
                  </div>
                  <Switch
                    checked={profileData.notifications.orders}
                    onCheckedChange={(checked) => setProfileData({
                      ...profileData,
                      notifications: { ...profileData.notifications, orders: checked }
                    })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{language === "pt" ? "Promoções e Ofertas" : "Promotions & Offers"}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === "pt" 
                        ? "Receba ofertas especiais e descontos"
                        : "Receive special offers and discounts"}
                    </p>
                  </div>
                  <Switch
                    checked={profileData.notifications.promotions}
                    onCheckedChange={(checked) => setProfileData({
                      ...profileData,
                      notifications: { ...profileData.notifications, promotions: checked }
                    })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ConsumerLayout>
  );
}
