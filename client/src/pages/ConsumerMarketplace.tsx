import ConsumerLayout from '@/components/ConsumerLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { Package, ShoppingBag, Truck, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'wouter';

export default function ConsumerMarketplace() {
  const { t } = useLanguage();
  const { data: orders, isLoading } = trpc.orders.getUserOrders.useQuery();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'shipped':
        return <Truck size={20} className="text-blue-600" />;
      case 'processing':
        return <Package size={20} className="text-yellow-600" />;
      default:
        return <Clock size={20} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Pendente',
      processing: 'Processando',
      shipped: 'Enviado',
      delivered: 'Entregue',
      cancelled: 'Cancelado',
    };
    return labels[status] || status;
  };

  return (
    <ConsumerLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('consumer.marketplace')}</h1>
            <p className="text-gray-600 mt-2">Histórico de compras e pedidos</p>
          </div>
          <Link href="/marketplace">
            <a className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
              <ShoppingBag size={20} />
              Continuar Comprando
            </a>
          </Link>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Carregando pedidos...</p>
          </div>
        ) : orders && orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum pedido ainda</h3>
            <p className="text-gray-600 mb-6">Comece a comprar produtos sustentáveis</p>
            <Link href="/marketplace">
              <a className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                Explorar Marketplace
              </a>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders?.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Pedido #{order.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{order.totalAmount} MZN</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Endereço de Entrega</p>
                    <p className="font-medium text-gray-900">{order.deliveryAddress}</p>
                    <p className="text-sm text-gray-600">{order.deliveryCity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Telefone</p>
                    <p className="font-medium text-gray-900">{order.deliveryPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Método de Pagamento</p>
                    <p className="font-medium text-gray-900">
                      {order.paymentMethod === 'cash' ? 'Dinheiro' : 'Transferência Bancária'}
                    </p>
                  </div>
                </div>

                {order.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Observações</p>
                    <p className="text-sm text-gray-900">{order.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ConsumerLayout>
  );
}
