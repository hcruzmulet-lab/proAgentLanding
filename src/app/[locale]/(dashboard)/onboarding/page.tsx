import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { OnboardingPage } from '@/components/onboarding/OnboardingPage';

export default function OnboardingRoute() {
  return (
    <DashboardLayout activeModule="inicio" activeSubItem="onboarding" title="Onboarding">
      <OnboardingPage />
    </DashboardLayout>
  );
}
