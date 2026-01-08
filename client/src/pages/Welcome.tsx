import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Leaf, ShoppingBag, BookOpen, Wrench, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Welcome() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useLanguage();
  const markAsSeenMutation = trpc.auth.markWelcomeSeen.useMutation();

  const steps = [
    {
      icon: Leaf,
      titleKey: "welcome.step1.title",
      descriptionKey: "welcome.step1.description",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: ShoppingBag,
      titleKey: "welcome.step2.title",
      descriptionKey: "welcome.step2.description",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: BookOpen,
      titleKey: "welcome.step3.title",
      descriptionKey: "welcome.step3.description",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Wrench,
      titleKey: "welcome.step4.title",
      descriptionKey: "welcome.step4.description",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const handleFinish = async () => {
    try {
      await markAsSeenMutation.mutateAsync();
      toast.success(t("welcome.complete"));
      setLocation("/consumer");
    } catch (error) {
      console.error("Failed to mark welcome as seen:", error);
      setLocation("/consumer");
    }
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("welcome.title")}
          </h1>
          <p className="text-gray-600">{t("welcome.subtitle")}</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? "w-12 bg-green-600"
                  : index < currentStep
                  ? "w-8 bg-green-400"
                  : "w-8 bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="mb-8">
          <div className={`${currentStepData.bgColor} rounded-2xl p-8 mb-6`}>
            <div className="flex justify-center mb-4">
              <div className={`${currentStepData.color} bg-white rounded-full p-4 shadow-lg`}>
                <Icon className="w-12 h-12" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
              {t(currentStepData.titleKey)}
            </h2>
            <p className="text-gray-700 text-center leading-relaxed">
              {t(currentStepData.descriptionKey)}
            </p>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentStep === 0 && (
              <>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{t("welcome.step1.feature1")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{t("welcome.step1.feature2")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{t("welcome.step1.feature3")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{t("welcome.step1.feature4")}</span>
                </div>
              </>
            )}
            {currentStep === 1 && (
              <>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{t("welcome.step2.feature1")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{t("welcome.step2.feature2")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{t("welcome.step2.feature3")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{t("welcome.step2.feature4")}</span>
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{t("welcome.step3.feature1")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{t("welcome.step3.feature2")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{t("welcome.step3.feature3")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{t("welcome.step3.feature4")}</span>
                </div>
              </>
            )}
            {currentStep === 3 && (
              <>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{t("welcome.step4.feature1")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{t("welcome.step4.feature2")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{t("welcome.step4.feature3")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{t("welcome.step4.feature4")}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-gray-600 hover:text-gray-900"
          >
            {t("welcome.skip")}
          </Button>
          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                {t("welcome.back")}
              </Button>
            )}
            <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
              {currentStep === steps.length - 1 ? t("welcome.start") : t("welcome.next")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
