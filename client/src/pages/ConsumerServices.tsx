import ConsumerLayout from '@/components/ConsumerLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { Briefcase, Calendar, DollarSign, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';

export default function ConsumerServices() {
  const { t } = useLanguage();
  const { data: services, isLoading } = trpc.admin.services.list.useQuery();

  return (
    <ConsumerLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('consumer.services')}</h1>
          <p className="text-gray-600 mt-2">Consultorias e serviços especializados</p>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Carregando serviços...</p>
          </div>
        ) : services && services.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <Briefcase size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum serviço disponível</h3>
            <p className="text-gray-600">Em breve teremos consultorias disponíveis</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services?.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Briefcase size={24} className="text-blue-600" />
                  </div>
                  {service.available && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Disponível
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.titlePt}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {service.descriptionPt}
                </p>

                {/* Features */}
                {service.features && (
                  <div className="mb-4 space-y-2">
                    {service.features.split(',').slice(0, 3).map((feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature.trim()}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-900">
                    <DollarSign size={20} />
                    <span className="text-2xl font-bold">{service.price}</span>
                    <span className="text-sm text-gray-600">MZN</span>
                  </div>
                  <Link href="/services">
                    <a className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
                      <Calendar size={16} />
                      Agendar
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* My Consultations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Minhas Consultorias</h2>
          <div className="text-center py-8">
            <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Você ainda não agendou nenhuma consultoria</p>
          </div>
        </div>
      </div>
    </ConsumerLayout>
  );
}
