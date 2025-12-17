import { useState, useEffect } from "react";
import ConsumerLayout from "@/components/ConsumerLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { Pencil, Loader2, Upload } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import imageCompression from 'browser-image-compression';

export default function ConsumerProfile() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: profileData, isLoading, refetch } = trpc.profile.get.useQuery();
  const updateProfileMutation = trpc.profile.update.useMutation({
    onSuccess: () => {
      toast.success(t('common.success'), {
        description: t('consumer.profileUpdated') || 'Profile updated successfully',
      });
      setIsEditing(false);
      refetch();
    },
    onError: (error) => {
      toast.error(t('common.error'), {
        description: error.message,
      });
    },
  });

  const uploadProfilePictureMutation = trpc.profile.uploadProfilePicture.useMutation({
    onSuccess: () => {
      toast.success(t('common.success'), {
        description: t('consumer.photoUpdated') || 'Profile picture updated successfully',
      });
      refetch();
    },
    onError: (error) => {
      toast.error(t('common.error'), {
        description: error.message,
      });
    },
  });

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    bio: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
  });

  // Initialize form data when profile loads
  useEffect(() => {
    if (profileData) {
      setFormData({
        phone: profileData.phone || "",
        address: profileData.address || "",
        bio: profileData.bio || "",
      });
      setNotifications({
        emailNotifications: profileData.emailNotifications ?? true,
        orderUpdates: profileData.orderUpdates ?? true,
        promotions: profileData.promotions ?? false,
      });
    }
  }, [profileData]);

  const handleSave = () => {
    updateProfileMutation.mutate({
      phone: formData.phone || null,
      address: formData.address || null,
      bio: formData.bio || null,
      emailNotifications: notifications.emailNotifications,
      orderUpdates: notifications.orderUpdates,
      promotions: notifications.promotions,
    });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error(t('common.error'), {
        description: t('consumer.invalidImageType') || 'Please select a valid image file',
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error(t('common.error'), {
        description: t('consumer.imageTooLarge') || 'Image size must be less than 10MB',
      });
      return;
    }

    try {
      toast.info(t('consumer.compressingImage') || 'Compressing image...');

      // Compress image
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        uploadProfilePictureMutation.mutate({
          file: base64String,
          filename: file.name,
          contentType: compressedFile.type,
        });
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error(t('common.error'), {
        description: t('consumer.uploadFailed') || 'Failed to upload photo',
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <ConsumerLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      </ConsumerLayout>
    );
  }

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
                {profileData?.profilePicture && (
                  <AvatarImage src={profileData.profilePicture} alt={profileData.name || "User"} />
                )}
                <AvatarFallback className="text-3xl">
                  {profileData?.name ? getInitials(profileData.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                id="profile-picture-upload"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => document.getElementById('profile-picture-upload')?.click()}
                disabled={uploadProfilePictureMutation.isPending}
              >
                {uploadProfilePictureMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('common.loading')}
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    {t('consumer.changePhoto')}
                  </>
                )}
              </Button>
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
                    value={profileData?.name || ""}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t('consumer.nameReadOnly') || 'Name cannot be changed'}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('consumer.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData?.email || ""}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t('consumer.emailReadOnly') || 'Email cannot be changed'}
                  </p>
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
                  <Button 
                    onClick={handleSave}
                    disabled={updateProfileMutation.isPending}
                  >
                    {updateProfileMutation.isPending && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    {t('consumer.saveChanges')}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsEditing(false);
                      // Reset form data to original values
                      if (profileData) {
                        setFormData({
                          phone: profileData.phone || "",
                          address: profileData.address || "",
                          bio: profileData.bio || "",
                        });
                        setNotifications({
                          emailNotifications: profileData.emailNotifications ?? true,
                          orderUpdates: profileData.orderUpdates ?? true,
                          promotions: profileData.promotions ?? false,
                        });
                      }
                    }}
                    disabled={updateProfileMutation.isPending}
                  >
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
                checked={notifications.emailNotifications}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, emailNotifications: checked })
                }
                disabled={!isEditing}
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
                checked={notifications.orderUpdates}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, orderUpdates: checked })
                }
                disabled={!isEditing}
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
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </ConsumerLayout>
  );
}
