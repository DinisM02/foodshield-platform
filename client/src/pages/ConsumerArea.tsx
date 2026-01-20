import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Newspaper, BookOpen, MapPin, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ConsumerArea() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("blog");

  const { data: blogPosts = [], isLoading: loadingBlog } = trpc.blogPosts.list.useQuery();
  const { data: events = [], isLoading: loadingEvents } = trpc.events.list.useQuery();
  const { data: news = [], isLoading: loadingNews } = trpc.news.list.useQuery();

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString(language === "pt" ? "pt-PT" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('consumerArea.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              {t('consumerArea.subtitle')}
            </p>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-12">
          <div className="container">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
                <TabsTrigger value="blog" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {t('consumerArea.blog')}
                </TabsTrigger>
                <TabsTrigger value="events" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t('consumerArea.events')}
                </TabsTrigger>
                <TabsTrigger value="news" className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4" />
                  {t('consumerArea.news')}
                </TabsTrigger>
              </TabsList>

              {/* Blog Tab */}
              <TabsContent value="blog">
                {loadingBlog ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">{t('common.loading')}</p>
                  </div>
                ) : blogPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">{t('consumerArea.noBlog')}</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post: any) => (
                      <Card key={post.id} className="hover:shadow-lg transition-shadow">
                        {post.imageUrl && (
                          <img
                            src={post.imageUrl}
                            alt={language === "pt" ? post.titlePt : post.titleEn}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                        )}
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary">{post.category}</Badge>
                            <span className="text-sm text-gray-500">{post.readTime} min</span>
                          </div>
                          <CardTitle className="line-clamp-2">
                            {language === "pt" ? post.titlePt : post.titleEn}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {language === "pt" ? post.excerptPt : post.excerptEn}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {post.author}
                            </span>
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events">
                {loadingEvents ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">{t('common.loading')}</p>
                  </div>
                ) : events.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">{t('consumerArea.noEvents')}</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {events.map((event) => (
                      <Card key={event.id} className="hover:shadow-lg transition-shadow">
                        {event.imageUrl && (
                          <img
                            src={event.imageUrl}
                            alt={language === "pt" ? event.titlePt : event.titleEn}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                        )}
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary">{event.category}</Badge>
                            <Badge variant={event.status === "upcoming" ? "default" : "outline"}>
                              {t(`consumerArea.eventStatus.${event.status}`)}
                            </Badge>
                          </div>
                          <CardTitle className="line-clamp-2">
                            {language === "pt" ? event.titlePt : event.titleEn}
                          </CardTitle>
                          <CardDescription className="line-clamp-3">
                            {language === "pt" ? event.descriptionPt : event.descriptionEn}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            {formatDate(event.eventDate)}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="h-4 w-4" />
                            {event.organizerName}
                          </div>
                          {event.maxParticipants && (
                            <p className="text-sm text-gray-500">
                              {t('consumerArea.maxParticipants')}: {event.maxParticipants}
                            </p>
                          )}
                          <Button className="w-full mt-4">
                            {t('consumerArea.register')}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* News Tab */}
              <TabsContent value="news">
                {loadingNews ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">{t('common.loading')}</p>
                  </div>
                ) : news.length === 0 ? (
                  <div className="text-center py-12">
                    <Newspaper className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">{t('consumerArea.noNews')}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {news.map((item) => (
                      <Card key={item.id} className="hover:shadow-lg transition-shadow">
                        <div className="md:flex">
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={language === "pt" ? item.titlePt : item.titleEn}
                              className="w-full md:w-64 h-48 object-cover rounded-l-lg"
                            />
                          )}
                          <div className="flex-1">
                            <CardHeader>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary">{item.category}</Badge>
                                {item.source && (
                                  <span className="text-sm text-gray-500">• {item.source}</span>
                                )}
                              </div>
                              <CardTitle className="line-clamp-2">
                                {language === "pt" ? item.titlePt : item.titleEn}
                              </CardTitle>
                              <CardDescription className="line-clamp-3">
                                {language === "pt" ? item.summaryPt : item.summaryEn}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  {item.author}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {formatDate(item.publishedAt || item.createdAt)}
                                </span>
                              </div>
                              <Button variant="outline" className="w-full mt-4">
                                {t('consumerArea.readMore')}
                              </Button>
                            </CardContent>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
