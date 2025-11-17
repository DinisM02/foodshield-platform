import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  TrendingUp, 
  Award,
  Heart,
  MessageSquare,
  Calendar,
  ArrowRight,
  Edit2
} from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { useState } from "react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for user activities
  const userStats = {
    purchases: 12,
    consultations: 3,
    articlesRead: 45,
    toolsUsed: 8,
    totalSpent: 2450,
    sustainabilityScore: 78
  };

  const recentPurchases = [
    {
      id: 1,
      product: "Sementes Orgânicas de Milho",
      date: "15 de Nov, 2025",
      amount: 450,
      status: "Entregue"
    },
    {
      id: 2,
      product: "Fertilizante Sustentável",
      date: "10 de Nov, 2025",
      amount: 320,
      status: "Em Trânsito"
    },
    {
      id: 3,
      product: "Kit Ferramentas Agrícolas",
      date: "5 de Nov, 2025",
      amount: 890,
      status: "Entregue"
    }
  ];

  const consultations = [
    {
      id: 1,
      consultant: "Dr. João Silva",
      topic: "Agricultura Regenerativa",
      date: "20 de Nov, 2025",
      status: "Agendada"
    },
    {
      id: 2,
      consultant: "Eng. Maria Santos",
      topic: "Gestão de Recursos Hídricos",
      date: "18 de Nov, 2025",
      status: "Concluída"
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: "Guia Completo de Agricultura Regenerativa",
      type: "Artigo",
      category: "Sustentabilidade",
      readTime: "12 min"
    },
    {
      id: 2,
      title: "Webinar: Certificação Orgânica Passo a Passo",
      type: "Vídeo",
      category: "Certificação",
      duration: "45 min"
    },
    {
      id: 3,
      title: "Calculadora Avançada de Emissões de Carbono",
      type: "Ferramenta",
      category: "Ferramentas",
      complexity: "Intermediária"
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Acesso Restrito</h1>
            <p className="text-xl text-gray-600 mb-8">Por favor, faça login para acessar sua área de consumidor</p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Voltar para Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-1 container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-2 border-gray-200">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{user.name || "Usuário"}</CardTitle>
                    <CardDescription className="text-sm">{user.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    activeTab === "overview"
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("purchases")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    activeTab === "purchases"
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Compras
                </button>
                <button
                  onClick={() => setActiveTab("consultations")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    activeTab === "consultations"
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Consultorias
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    activeTab === "profile"
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Perfil
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="hover-lift border-2 border-gray-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-primary" />
                        Compras Realizadas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-gray-900">{userStats.purchases}</div>
                      <p className="text-sm text-gray-500 mt-1">Total gasto: MT {userStats.totalSpent}</p>
                    </CardContent>
                  </Card>

                  <Card className="hover-lift border-2 border-gray-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        Consultorias
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-gray-900">{userStats.consultations}</div>
                      <p className="text-sm text-gray-500 mt-1">2 concluídas, 1 agendada</p>
                    </CardContent>
                  </Card>

                  <Card className="hover-lift border-2 border-gray-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        Pontuação Sustentável
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">{userStats.sustainabilityScore}%</div>
                      <p className="text-sm text-gray-500 mt-1">Nível: Avançado</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-2 border-gray-200">
                    <CardHeader>
                      <CardTitle>Compras Recentes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentPurchases.slice(0, 2).map((purchase) => (
                        <div key={purchase.id} className="flex justify-between items-start pb-4 border-b last:border-b-0">
                          <div>
                            <p className="font-semibold text-gray-900">{purchase.product}</p>
                            <p className="text-sm text-gray-500">{purchase.date}</p>
                          </div>
                          <Badge className={purchase.status === "Entregue" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                            {purchase.status}
                          </Badge>
                        </div>
                      ))}
                      <Link href="/dashboard?tab=purchases">
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                          Ver Todas as Compras
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-200">
                    <CardHeader>
                      <CardTitle>Recomendações Personalizadas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recommendations.slice(0, 2).map((rec) => (
                        <div key={rec.id} className="pb-4 border-b last:border-b-0">
                          <p className="font-semibold text-gray-900">{rec.title}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">{rec.type}</Badge>
                            <Badge variant="outline" className="text-xs">{rec.category}</Badge>
                          </div>
                        </div>
                      ))}
                      <Link href="/knowledge">
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                          Explorar Conteúdo
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {/* Purchases Tab */}
            {activeTab === "purchases" && (
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle>Histórico de Compras</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPurchases.map((purchase) => (
                      <div key={purchase.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="font-semibold text-gray-900">{purchase.product}</p>
                          <p className="text-sm text-gray-500">{purchase.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">MT {purchase.amount}</p>
                          <Badge className={purchase.status === "Entregue" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                            {purchase.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Consultations Tab */}
            {activeTab === "consultations" && (
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle>Minhas Consultorias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {consultations.map((consultation) => (
                      <div key={consultation.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">{consultation.topic}</p>
                            <p className="text-sm text-gray-600">Com: {consultation.consultant}</p>
                          </div>
                          <Badge className={consultation.status === "Concluída" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                            {consultation.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {consultation.date}
                        </p>
                      </div>
                    ))}
                    <Link href="/services">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                        Agendar Nova Consultoria
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle>Meu Perfil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        defaultValue={user.name || ""}
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                      />
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user.email || ""}
                      disabled
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Plano Atual</h3>
                    <p className="text-blue-800 mb-4">Você está no plano <strong>Gratuito</strong></p>
                    <Link href="/knowledge">
                      <Button className="bg-primary hover:bg-primary/90 text-white">
                        Atualizar para Premium
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100">
                      Alterar Senha
                    </Button>
                    <Button variant="outline" className="flex-1 border-red-300 text-red-600 hover:bg-red-50">
                      Deletar Conta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
