import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Leaf, DollarSign, TrendingUp } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Tools() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [carbonResult, setCarbonResult] = useState<number | null>(null);
  const [costResult, setCostResult] = useState<number | null>(null);

  const calculateCarbon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const area = Number(formData.get('area'));
    const fuel = Number(formData.get('fuel'));
    const fertilizer = Number(formData.get('fertilizer'));
    
    const result = (area * 2.5) + (fuel * 2.68) + (fertilizer * 1.5);
    setCarbonResult(result);
  };

  const calculateCost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const seeds = Number(formData.get('seeds'));
    const labor = Number(formData.get('labor'));
    const equipment = Number(formData.get('equipment'));
    
    const result = seeds + labor + equipment;
    setCostResult(result);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-2xl">Acesso Restrito</CardTitle>
            <CardDescription>{t('auth.login_required')}</CardDescription>
          </CardHeader>
          <CardFooter>
            <a href={getLoginUrl()} className="w-full">
              <Button className="w-full">Fazer Login</Button>
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
            <Calculator className="w-10 h-10" />
            <h1 className="text-5xl font-bold">{t('tools.title')}</h1>
          </div>
          <p className="text-xl opacity-90">{t('tools.subtitle')}</p>
        </div>
      </div>

      <div className="container py-12">
        <Tabs defaultValue="carbon" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="carbon" className="text-base">
              <Leaf className="w-4 h-4 mr-2" />
              Carbono
            </TabsTrigger>
            <TabsTrigger value="cost" className="text-base">
              <DollarSign className="w-4 h-4 mr-2" />
              Custos
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="text-base">
              <TrendingUp className="w-4 h-4 mr-2" />
              Nutrição
            </TabsTrigger>
          </TabsList>

          {/* Carbon Calculator */}
          <TabsContent value="carbon">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover-glow">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Leaf className="w-6 h-6 text-green-500" />
                    Calculadora de Emissões de Carbono
                  </CardTitle>
                  <CardDescription>
                    Estime as emissões de CO₂ da sua operação agrícola
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={calculateCarbon} className="space-y-4">
                    <div>
                      <Label htmlFor="area">Área Cultivada (hectares)</Label>
                      <Input 
                        id="area" 
                        name="area" 
                        type="number" 
                        step="0.1" 
                        required 
                        placeholder="Ex: 10.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fuel">Combustível Usado (litros/mês)</Label>
                      <Input 
                        id="fuel" 
                        name="fuel" 
                        type="number" 
                        step="0.1" 
                        required 
                        placeholder="Ex: 200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fertilizer">Fertilizantes (kg/mês)</Label>
                      <Input 
                        id="fertilizer" 
                        name="fertilizer" 
                        type="number" 
                        step="0.1" 
                        required 
                        placeholder="Ex: 150"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Calcular Emissões
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-2xl">Resultado</CardTitle>
                  <CardDescription>Estimativa de emissões mensais</CardDescription>
                </CardHeader>
                <CardContent>
                  {carbonResult !== null ? (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-primary mb-2">
                          {carbonResult.toFixed(2)}
                        </div>
                        <div className="text-xl text-muted-foreground">kg CO₂/mês</div>
                      </div>
                      <div className="space-y-3">
                        <div className="p-4 bg-white rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Equivalente a:</span>
                            <span className="text-lg">{(carbonResult / 411).toFixed(1)} árvores</span>
                          </div>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Redução sugerida:</span>
                            <span className="text-lg text-green-600">-25%</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Ver Recomendações
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Leaf className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Preencha o formulário para ver os resultados</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cost Calculator */}
          <TabsContent value="cost">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover-glow">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-blue-500" />
                    Calculadora de Custos de Produção
                  </CardTitle>
                  <CardDescription>
                    Calcule os custos totais da sua produção
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={calculateCost} className="space-y-4">
                    <div>
                      <Label htmlFor="seeds">Sementes e Mudas (MZN)</Label>
                      <Input 
                        id="seeds" 
                        name="seeds" 
                        type="number" 
                        required 
                        placeholder="Ex: 5000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="labor">Mão de Obra (MZN)</Label>
                      <Input 
                        id="labor" 
                        name="labor" 
                        type="number" 
                        required 
                        placeholder="Ex: 15000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="equipment">Equipamentos e Insumos (MZN)</Label>
                      <Input 
                        id="equipment" 
                        name="equipment" 
                        type="number" 
                        required 
                        placeholder="Ex: 8000"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Calcular Custos
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-2xl">Resultado</CardTitle>
                  <CardDescription>Análise de custos</CardDescription>
                </CardHeader>
                <CardContent>
                  {costResult !== null ? (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-primary mb-2">
                          {costResult.toLocaleString('pt-MZ')}
                        </div>
                        <div className="text-xl text-muted-foreground">MZN</div>
                      </div>
                      <div className="space-y-3">
                        <div className="p-4 bg-white rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Custo por hectare:</span>
                            <span className="text-lg">{(costResult / 10).toLocaleString('pt-MZ')} MZN</span>
                          </div>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Margem sugerida:</span>
                            <span className="text-lg text-green-600">30%</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Exportar Relatório
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <DollarSign className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Preencha o formulário para ver os resultados</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Nutrition Calculator */}
          <TabsContent value="nutrition">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-orange-500" />
                  Calculadora Nutricional
                </CardTitle>
                <CardDescription>
                  Em breve: Análise nutricional de produtos agrícolas
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <TrendingUp className="w-24 h-24 mx-auto mb-6 text-muted-foreground opacity-50" />
                <p className="text-lg text-muted-foreground mb-4">
                  Esta ferramenta está em desenvolvimento
                </p>
                <Button variant="outline">
                  Notificar Quando Disponível
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
