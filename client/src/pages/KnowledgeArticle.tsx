import { useParams, Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User, Calendar, Heart, Share2, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";

export default function KnowledgeArticle() {
  const { t, language } = useLanguage();
  const params = useParams<{ id: string }>();
  const articleId = parseInt(params.id || "0");

  const { data: article, isLoading, error } = trpc.blog.get.useQuery(
    { id: articleId },
    { enabled: articleId > 0 }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t("knowledge.no_results")}</h2>
          <p className="text-muted-foreground mb-6">{t("common.search")}</p>
          <Link href="/knowledge">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("common.back")}
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const title = language === "pt" ? article.titlePt : article.titleEn;
  const content = language === "pt" ? article.contentPt : article.contentEn;
  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    language === "pt" ? "pt-MZ" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Image */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={article.imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <Link href="/knowledge">
              <Button variant="outline" className="mb-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("common.back")}
              </Button>
            </Link>
            <Badge className="mb-4 bg-primary">{article.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-5 h-5" />
              <span className="font-medium">{article.author}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-5 h-5" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5" />
              <span>{article.readTime} min {t("blog.read_time")}</span>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <Streamdown>{content}</Streamdown>
          </div>

          {/* Actions */}
          <div className="mt-12 pt-8 border-t flex flex-wrap gap-4">
            <Link href="/knowledge">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("knowledge.title")}
              </Button>
            </Link>
            <Button className="bg-primary hover:bg-primary/90">
              <Heart className="w-4 h-4 mr-2" />
              {t("consumer.favorites")}
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
