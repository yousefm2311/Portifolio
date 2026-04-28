import DashboardOverview from '@/components/DashboardOverview';
import Launcher from '@/components/Launcher';
import Hero from '@/components/Hero';
import FeaturedApps from '@/components/FeaturedApps';
import TimelineSection from '@/components/TimelineSection';
import ImpactStrip from '@/components/ImpactStrip';
import TechMarquee from '@/components/TechMarquee';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import ProcessSection from '@/components/ProcessSection';
import CallToAction from '@/components/CallToAction';
import ResourcesSection from '@/components/ResourcesSection';
import ServicesSection from '@/components/ServicesSection';
import { getPublishedApps } from '@/lib/app-service';
import { getSettings } from '@/lib/settings-service';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { items } = await getPublishedApps({ limit: 10 });
  const settings = await getSettings();
  const cvUrl = settings?.cvMedia?.url ?? settings?.cvUrl ?? null;

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl space-y-12 px-4 lg:px-8 pb-16">
        {/* About Me / Intro Section */}
        <Hero cvUrl={cvUrl} badges={settings?.heroBadges ?? null} />
        
        {/* Dashboard Metrics Section */}
        <DashboardOverview apps={items} />

        {/* Rest of the Portfolio Sections */}
        <div className="space-y-24 pt-12">
          <FeaturedApps apps={items} />
          <ImpactStrip items={settings?.impactItems ?? null} />
          
          <CapabilitiesSection
            intro={settings?.capabilitiesIntro ?? null}
            notes={settings?.capabilitiesNotes ?? null}
            items={settings?.capabilitiesItems ?? null}
          />

          <section id="launcher" className="scroll-mt-24">
            <Launcher apps={items} showCaseStudy={Boolean(settings?.enableCaseStudy)} />
          </section>

          <ProcessSection
            intro={settings?.processIntro ?? null}
            steps={settings?.processSteps ?? null}
          />
          
          <section id="tech" className="scroll-mt-24">
            <TechMarquee items={settings?.techMarquee ?? null} />
          </section>
          
          {settings?.enableResources && (
            <ResourcesSection resources={settings?.resources ?? null} />
          )}
          {settings?.enableServices && (
            <ServicesSection services={settings?.services ?? null} />
          )}
          
          <section id="timeline" className="scroll-mt-24">
            <TimelineSection items={settings?.timeline ?? null} />
          </section>
          
          <CallToAction cta={settings?.cta ?? null} />
        </div>
      </main>
    </div>
  );
}
