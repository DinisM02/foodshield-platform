import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Package, ShoppingCart, User, Settings } from "lucide-react";

export default function MyArea() {
  const { t } = useLanguage();
  const { user, isAuthenticated, loading } = useAuth();
  const { data: orders, isLoading: ordersLoading } = trpc.orders.getUserOrders.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>{t("auth.loginRequired")}</CardTitle>
            <CardDescription>{t("auth.loginToAccess")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href={`/api/oauth/login?redirect=${encodeURIComponent(window.location.pathname)}`}>
                {t("auth.login")}
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-12">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("myArea.title")}</h1>
          <p className="text-gray-600 mt-2">{t("myArea.welcome")}, {user?.name}!</p>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders" className="gap-2">
              <Package className="h-4 w-4" />
              {t("myArea.orders")}
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              {t("myArea.profile")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("myArea.myOrders")}</CardTitle>
                <CardDescription>{t("myArea.ordersDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  </div>
                ) : orders && orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order: any) => (
                      <Card key={order.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">
                                {t("myArea.order")} #{order.id}
                              </CardTitle>
                              <CardDescription>
                                {new Date(order.createdAt).toLocaleDateString("pt-MZ")}
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-600">
                                {order.totalAmount} MZN
                              </div>
                              <div className="text-sm text-gray-600">
                                {t(`myArea.status.${order.status}`)}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-gray-600">
                            <p><strong>{t("myArea.deliveryAddress")}:</strong> {order.deliveryAddress}, {order.deliveryCity}</p>
                            <p><strong>{t("myArea.phone")}:</strong> {order.deliveryPhone}</p>
                            <p><strong>{t("myArea.paymentMethod")}:</strong> {t(`checkout.payment.${order.paymentMethod}`)}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">{t("myArea.noOrders")}</p>
                    <Button asChild className="mt-4">
                      <Link href="/marketplace">{t("myArea.goToMarketplace")}</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("myArea.profileInfo")}</CardTitle>
                <CardDescription>{t("myArea.profileDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">{t("myArea.name")}</label>
                  <p className="text-gray-900">{user?.name || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">{t("myArea.email")}</label>
                  <p className="text-gray-900">{user?.email || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">{t("myArea.loginMethod")}</label>
                  <p className="text-gray-900">{user?.loginMethod || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">{t("myArea.memberSince")}</label>
                  <p className="text-gray-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("pt-MZ") : "N/A"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      </main>
      <Footer />
    </div>
  );
}
