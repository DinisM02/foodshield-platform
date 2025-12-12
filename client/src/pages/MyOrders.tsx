import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";

export default function MyOrders() {
  const { t } = useLanguage();
  const { isAuthenticated, loading } = useAuth();

  const { data: orders, isLoading } = trpc.orders.myOrders.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <div className="text-center">{t("common.loading")}</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <Card className="max-w-md mx-auto text-center">
            <CardHeader>
              <CardTitle>{t("orders.login_required")}</CardTitle>
              <CardDescription>{t("orders.login_to_view")}</CardDescription>
            </CardHeader>
            <CardContent>
              <a href={getLoginUrl()}>
                <Button>{t("auth.login")}</Button>
              </a>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "processing":
        return <Package className="w-5 h-5 text-blue-500" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "outline",
      processing: "secondary",
      shipped: "secondary",
      delivered: "default",
      cancelled: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{t(`orders.status.${status}`)}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-bold mb-8">{t("orders.my_orders")}</h1>

        {!orders || orders.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <CardTitle className="mb-2">{t("orders.no_orders")}</CardTitle>
              <CardDescription>{t("orders.start_shopping")}</CardDescription>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        {t("orders.order")} #{order.id}
                      </CardTitle>
                      <CardDescription>
                        {new Date(order.createdAt).toLocaleDateString('pt-MZ', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </CardDescription>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">{t("orders.delivery_address")}</p>
                      <p className="font-medium">{order.deliveryAddress}</p>
                      <p className="text-sm">{order.deliveryCity}</p>
                      <p className="text-sm">{order.deliveryPhone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{t("orders.payment_method")}</p>
                      <p className="font-medium">{order.paymentMethod}</p>
                      <p className="text-2xl font-bold text-primary mt-2">{order.totalAmount.toLocaleString('pt-MZ')} MZN</p>
                    </div>
                  </div>
                  {order.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-500">{t("orders.notes")}</p>
                      <p className="text-sm">{order.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
