import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { trpc } from '../lib/trpc';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';
import { useRef } from 'react';
import { Loader2, User, Mail, Phone, MapPin, Globe, Bell, Camera, Upload } from 'lucide-react';

export default function FirebaseProfile() {
  const { user, loading: authLoading } = useFirebaseAuth();
  const [, setLocation] = useLocation();
  const { t, language, setLanguage } = useLanguage();
  
  const { data: profile, isLoading, refetch } = trpc.user.getProfile.useQuery(undefined, {
    enabled: !!user,
  });
  
  const updateMutation = trpc.user.updateProfile.useMutation({
    onSuccess: () => {
      toast.success(t('profile.update_success'));
      refetch();
    },
    onError: (error) => {
      toast.error(t('profile.update_error') + ': ' + error.message);
    },
  });

  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = trpc.user.uploadProfilePicture.useMutation({
    onSuccess: (data) => {
      toast.success(t('profile.photo_upload_success'));
      refetch();
      setPreviewImage(null);
      setIsUploading(false);
    },
    onError: (error) => {
      toast.error(t('profile.photo_upload_error') + ': ' + error.message);
      setIsUploading(false);
    },
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    bio: '',
    language: language as 'pt' | 'en',
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        bio: profile.bio || '',
        language: profile.language as 'pt' | 'en',
        emailNotifications: profile.emailNotifications,
        orderUpdates: profile.orderUpdates,
        promotions: profile.promotions,
      });
    }
  }, [profile]);

  useEffect(() => {
    if (!authLoading && !user) {
      setLocation('/firebase-login');
    }
  }, [user, authLoading, setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
    
    // Update language context if changed
    if (formData.language !== language) {
      setLanguage(formData.language);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t('profile.photo_size_error'));
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error(t('profile.photo_type_error'));
      return;
    }

    // Read file and convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreviewImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadPhoto = async () => {
    if (!previewImage) return;
    
    setIsUploading(true);
    uploadMutation.mutate({ base64Image: previewImage });
  };

  const handleCancelUpload = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0084B6]" />
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-[#0084B6]">
              {t('profile.title')}
            </CardTitle>
            <CardDescription>{t('profile.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4 pb-6 border-b">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {previewImage || profile.profilePicture ? (
                    <img
                      src={previewImage || profile.profilePicture || ''}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-[#0084B6] text-white p-2 rounded-full hover:bg-[#006a94] transition-colors"
                  disabled={isUploading}
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {previewImage && (
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={handleUploadPhoto}
                    disabled={isUploading}
                    size="sm"
                  >
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4 mr-2" />
                    )}
                    {t('profile.upload_photo')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelUpload}
                    disabled={isUploading}
                    size="sm"
                  >
                    {t('profile.cancel')}
                  </Button>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {t('profile.personal_info')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('profile.name')}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder={t('profile.name_placeholder')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t('profile.email')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        value={profile.email || ''}
                        disabled
                        className="pl-10 bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('profile.phone')}</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder={t('profile.phone_placeholder')}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">{t('profile.language')}</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <select
                        id="language"
                        value={formData.language}
                        onChange={(e) => handleChange('language', e.target.value)}
                        className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="pt">Português</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">{t('profile.address')}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      placeholder={t('profile.address_placeholder')}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">{t('profile.bio')}</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    placeholder={t('profile.bio_placeholder')}
                    rows={4}
                  />
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  {t('profile.notifications')}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">{t('profile.email_notifications')}</Label>
                      <p className="text-sm text-gray-500">{t('profile.email_notifications_desc')}</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={formData.emailNotifications}
                      onCheckedChange={(checked) => handleChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="orderUpdates">{t('profile.order_updates')}</Label>
                      <p className="text-sm text-gray-500">{t('profile.order_updates_desc')}</p>
                    </div>
                    <Switch
                      id="orderUpdates"
                      checked={formData.orderUpdates}
                      onCheckedChange={(checked) => handleChange('orderUpdates', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="promotions">{t('profile.promotions')}</Label>
                      <p className="text-sm text-gray-500">{t('profile.promotions_desc')}</p>
                    </div>
                    <Switch
                      id="promotions"
                      checked={formData.promotions}
                      onCheckedChange={(checked) => handleChange('promotions', checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation('/')}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="bg-[#0084B6] hover:bg-[#006a94]"
                >
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('common.saving')}
                    </>
                  ) : (
                    t('common.save')
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
