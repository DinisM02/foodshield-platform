import ConsumerLayout from '@/components/ConsumerLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingUp, Leaf } from 'lucide-react';
import { useState } from 'react';

export default function ConsumerTools() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('carbon');

  // Carbon Calculator State
  const [area, setArea] = useState('');
  const [fuel, setFuel] = useState('');
  const [fertilizer, setFertilizer] = useState('');
  const [carbonResult, setCarbonResult] = useState<number | null>(null);

  // Cost Calculator State
  const [seeds, setSeeds] = useState('');
  const [labor, setLabor] = useState('');
  const [equipment, setEquipment] = useState('');
  const [costResult, setCostResult] = useState<number | null>(null);

  const calculateCarbon = () => {
    const areaNum = parseFloat(area) || 0;
    const fuelNum = parseFloat(fuel) || 0;
    const fertilizerNum = parseFloat(fertilizer) || 0;
    
    // Simple formula: area * 0.5 + fuel * 2.3 + fertilizer * 1.5
    const total = (areaNum * 0.5) + (fuelNum * 2.3) + (fertilizerNum * 1.5);
    setCarbonResult(total);
  };

  const calculateCost = () => {
    const seedsNum = parseFloat(seeds) || 0;
    const laborNum = parseFloat(labor) || 0;
    const equipmentNum = parseFloat(equipment) || 0;
    
    const total = seedsNum + laborNum + equipmentNum;
    setCostResult(total);
  };

  return (
    <ConsumerLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('consumer.tools')}</h1>
          <p className="text-gray-600">{t('tools.subtitle')}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('carbon')}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === 'carbon'
                ? 'border-b-2 border-emerald-600 text-emerald-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Leaf size={20} />
              {t('tools.carbon')}
            </div>
          </button>
          <button
            onClick={() => setActiveTab('cost')}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === 'cost'
                ? 'border-b-2 border-emerald-600 text-emerald-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <TrendingUp size={20} />
              {t('tools.costs')}
            </div>
          </button>
        </div>

        {/* Carbon Calculator */}
        {activeTab === 'carbon' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Leaf className="text-emerald-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{t('tools.carbonCalculator')}</h2>
                <p className="text-gray-600 text-sm">{t('tools.carbonDescription')}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label htmlFor="area">{t('tools.area')} (ha)</Label>
                <Input
                  id="area"
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="fuel">{t('tools.fuel')} (L)</Label>
                <Input
                  id="fuel"
                  type="number"
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="fertilizer">{t('tools.fertilizer')} (kg)</Label>
                <Input
                  id="fertilizer"
                  type="number"
                  value={fertilizer}
                  onChange={(e) => setFertilizer(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <Button onClick={calculateCarbon} className="w-full md:w-auto">
              <Calculator size={20} className="mr-2" />
              {t('tools.calculate')}
            </Button>

            {carbonResult !== null && (
              <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
                <h3 className="text-lg font-semibold text-emerald-900 mb-2">{t('tools.result')}</h3>
                <p className="text-3xl font-bold text-emerald-600 mb-2">
                  {carbonResult.toFixed(2)} kg CO₂
                </p>
                <p className="text-gray-600 text-sm">
                  {t('tools.equivalent')}: {(carbonResult / 20).toFixed(1)} {t('tools.trees')}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Cost Calculator */}
        {activeTab === 'cost' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{t('tools.costCalculator')}</h2>
                <p className="text-gray-600 text-sm">{t('tools.costDescription')}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label htmlFor="seeds">{t('tools.seeds')} (MZN)</Label>
                <Input
                  id="seeds"
                  type="number"
                  value={seeds}
                  onChange={(e) => setSeeds(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="labor">{t('tools.labor')} (MZN)</Label>
                <Input
                  id="labor"
                  type="number"
                  value={labor}
                  onChange={(e) => setLabor(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="equipment">{t('tools.equipment')} (MZN)</Label>
                <Input
                  id="equipment"
                  type="number"
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <Button onClick={calculateCost} className="w-full md:w-auto">
              <Calculator size={20} className="mr-2" />
              {t('tools.calculate')}
            </Button>

            {costResult !== null && (
              <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{t('tools.totalCost')}</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {costResult.toFixed(2)} MZN
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </ConsumerLayout>
  );
}
