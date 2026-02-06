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

  // Tools is now public - no authentication required

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
              {t('tools.tab_carbon')}
            </TabsTrigger>
            <TabsTrigger value="cost" className="text-base">
              <DollarSign className="w-4 h-4 mr-2" />
              {t('tools.tab_cost')}
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="text-base">
              <TrendingUp className="w-4 h-4 mr-2" />
              {t('tools.tab_nutrition')}
            </TabsTrigger>
          </TabsList>

          {/* Carbon Calculator */}
          <TabsContent value="carbon">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover-glow">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Leaf className="w-6 h-6 text-green-500" />
                    {t('tools.carbon.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('tools.carbon.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={calculateCarbon} className="space-y-4">
                    <div>
                      <Label htmlFor="area">{t('tools.carbon.area_label')}</Label>
                      <Input 
                        id="area" 
                        name="area" 
                        type="number" 
                        step="0.1" 
                        required 
                        placeholder={t('tools.carbon.area_placeholder')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fuel">{t('tools.carbon.fuel_label')}</Label>
                      <Input 
                        id="fuel" 
                        name="fuel" 
                        type="number" 
                        step="0.1" 
                        required 
                        placeholder={t('tools.carbon.fuel_placeholder')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fertilizer">{t('tools.carbon.fertilizer_label')}</Label>
                      <Input 
                        id="fertilizer" 
                        name="fertilizer" 
                        type="number" 
                        step="0.1" 
                        required 
                        placeholder={t('tools.carbon.fertilizer_placeholder')}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      {t('tools.carbon.calculate')}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-2xl">{t('tools.carbon.result_title')}</CardTitle>
                  <CardDescription>{t('tools.carbon.result_description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  {carbonResult !== null ? (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-primary mb-2">
                          {carbonResult.toFixed(2)}
                        </div>
                        <div className="text-xl text-muted-foreground">{t('tools.carbon.result_value')}</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          {t('tools.carbon.result_info')}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Leaf className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>{t('common.no_results')}</p>
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
                    {t('tools.cost.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('tools.cost.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={calculateCost} className="space-y-4">
                    <div>
                      <Label htmlFor="seeds">{t('tools.cost.seeds_label')}</Label>
                      <Input 
                        id="seeds" 
                        name="seeds" 
                        type="number" 
                        required 
                        placeholder={t('tools.cost.seeds_placeholder')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="labor">{t('tools.cost.labor_label')}</Label>
                      <Input 
                        id="labor" 
                        name="labor" 
                        type="number" 
                        required 
                        placeholder={t('tools.cost.labor_placeholder')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="equipment">{t('tools.cost.equipment_label')}</Label>
                      <Input 
                        id="equipment" 
                        name="equipment" 
                        type="number" 
                        required 
                        placeholder={t('tools.cost.equipment_placeholder')}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      {t('tools.cost.calculate')}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-2xl">{t('tools.cost.result_title')}</CardTitle>
                  <CardDescription>{t('tools.cost.result_description')}</CardDescription>
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
                      <div className="p-4 bg-white rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          {t('tools.cost.result_info')}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <DollarSign className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>{t('common.no_results')}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Nutrition Calculator */}
          <TabsContent value="nutrition">
            <Card className="hover-glow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                  {t('tools.nutrition.title')}
                </CardTitle>
                <CardDescription>
                  {t('tools.nutrition.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">{t('tools.nutrition.coming_soon')}</h3>
                  <p>{t('tools.nutrition.info')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
