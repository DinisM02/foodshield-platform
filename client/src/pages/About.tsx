import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, Heart, Users, Award, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Heart,
      title: t('about.values.sustainability'),
      description: t('about.values.sustainability_desc'),
    },
    {
      icon: Users,
      title: t('about.values.community'),
      description: t('about.values.community_desc'),
    },
    {
      icon: Award,
      title: t('about.values.quality'),
      description: t('about.values.quality_desc'),
    },
    {
      icon: TrendingUp,
      title: t('about.values.innovation'),
      description: t('about.values.innovation_desc'),
    },
  ];

  const stats = [
    { value: "10,000+", label: t('about.stats.users') },
    { value: "500+", label: t('about.stats.products') },
    { value: "50+", label: t('about.stats.specialists') },
    { value: "95%", label: t('about.stats.satisfaction') },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">{t('about.title')}</h1>
          <p className="text-xl opacity-90 max-w-2xl">{t('about.subtitle')}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <Card className="border-2 border-primary">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl font-bold text-gray-900">{t('about.mission')}</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('about.mission_text')}
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="border-2 border-primary">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl font-bold text-gray-900">{t('about.vision')}</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('about.vision_text')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-blue-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">{t('about.story')}</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>{t('about.story_p1')}</p>
              <p>{t('about.story_p2')}</p>
              <p>{t('about.story_p3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">{t('about.values_title')}</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {t('about.values_subtitle')}
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="hover-lift text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">{t('about.impact')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-xl opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">{t('about.team')}</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {t('about.team_subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Team members - placeholder */}
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover-lift text-center">
                <CardContent className="p-6">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold mb-1">{t(`about.team_member_${i}_name`)}</h3>
                  <Badge className="mb-3">{t(`about.team_member_${i}_role`)}</Badge>
                  <p className="text-gray-600 text-sm">{t(`about.team_member_${i}_bio`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
