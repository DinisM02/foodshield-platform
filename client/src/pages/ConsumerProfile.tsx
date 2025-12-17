import { useState } from "react";
import ConsumerLayout from "@/components/ConsumerLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { Pencil } from "lucide-react";

export default function ConsumerProfile() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    bio: "",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    orders: true,
    promotions: false,
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ConsumerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t('consumer.profile')}</h1>
            <p className="text-muted-foreground">{t('consumer.profileDesc')}</p>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              <Pencil className="w-4 h-4 mr-2" />
              {t('consumer.editProfile')}
            </Button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>{t('consumer.profilePicture')}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarFallback className="text-3xl">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" size="sm">
                  {t('consumer.changePhoto')}
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t('consumer.personalInfo')}</CardTitle>
              <CardDescription>{t('consumer.personalInfoDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('consumer.name')}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('consumer.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('consumer.phone')}</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    placeholder="+258 XX XXX XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">{t('consumer.address')}</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">{t('consumer.bio')}</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>

              {isEditing && (
                <div className="flex gap-2">
                  <Button onClick={handleSave}>{t('consumer.saveChanges')}</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    {t('consumer.cancel')}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('consumer.notificationPreferences')}</CardTitle>
            <CardDescription>{t('consumer.notificationPreferencesDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t('consumer.emailNotifications')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('consumer.emailNotificationsDesc')}
                </p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, email: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t('consumer.orderUpdates')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('consumer.orderUpdatesDesc')}
                </p>
              </div>
              <Switch
                checked={notifications.orders}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, orders: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t('consumer.promotions')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('consumer.promotionsDesc')}
                </p>
              </div>
              <Switch
                checked={notifications.promotions}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, promotions: checked })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </ConsumerLayout>
  );
}
