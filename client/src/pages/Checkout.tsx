import { useState } from "react";
import { Link, useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { ShoppingCart, CreditCard, Truck } from "lucide-react";

export default function Checkout() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  
  // Get cart from localStorage
  const [cart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [formData, setFormData] = useState({
    deliveryAddress: "",
    deliveryCity: "",
    deliveryPhone: "",
    paymentMethod: "cash",
    notes: "",
  });

  const createOrderMutation = trpc.orders.create.useMutation({
    onSuccess: (data) => {
      toast.success(t("checkout.success"));
      localStorage.removeItem("cart");
      setLocation(`/my-area`);
    },
    onError: (error) => {
      toast.error(t("checkout.error") + ": " + error.message);
    },
  });

  const totalAmount = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error(t("checkout.empty_cart"));
      return;
    }

    if (!formData.deliveryAddress || !formData.deliveryCity || !formData.deliveryPhone) {
      toast.error(t("checkout.fill_required"));
      return;
    }

    createOrderMutation.mutate({
      ...formData,
      items: cart.map((item: any) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <Card className="max-w-md mx-auto text-center">
            <CardHeader>
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <CardTitle>{t("checkout.empty_cart")}</CardTitle>
              <CardDescription>{t("checkout.add_products")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/marketplace">
                <Button>{t("checkout.go_marketplace")}</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-bold mb-8">{t("checkout.title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    {t("checkout.delivery_info")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="deliveryAddress">{t("checkout.address")} *</Label>
                    <Textarea
                      id="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                      placeholder={t("checkout.address_placeholder")}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="deliveryCity">{t("checkout.city")} *</Label>
                      <Input
                        id="deliveryCity"
                        value={formData.deliveryCity}
                        onChange={(e) => setFormData({ ...formData, deliveryCity: e.target.value })}
                        placeholder={t("checkout.city_placeholder")}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryPhone">{t("checkout.phone")} *</Label>
                      <Input
                        id="deliveryPhone"
                        value={formData.deliveryPhone}
                        onChange={(e) => setFormData({ ...formData, deliveryPhone: e.target.value })}
                        placeholder="+258 84 123 4567"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">{t("checkout.notes")}</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={t("checkout.notes_placeholder")}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    {t("checkout.payment_method")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">{t("checkout.cash_on_delivery")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mpesa" id="mpesa" />
                      <Label htmlFor="mpesa">M-Pesa</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank">{t("checkout.bank_transfer")}</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full" disabled={createOrderMutation.isPending}>
                {createOrderMutation.isPending ? t("checkout.processing") : t("checkout.place_order")}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>{t("checkout.order_summary")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.quantity}x {item.price} MZN</p>
                    </div>
                    <p className="font-semibold">{item.quantity * item.price} MZN</p>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>{t("checkout.total")}</span>
                    <span>{totalAmount} MZN</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
