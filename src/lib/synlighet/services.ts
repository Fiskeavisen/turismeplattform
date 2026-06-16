import {
  competitorObservations,
  descriptionAudits,
  externalAuthorityRecommendations,
  integrations,
  keywordAlerts,
  keywordClusters,
  monitoredKeywords,
  paidAdsAlerts,
  paidAdsCampaigns,
  paidLandingPageObservations,
  pageSnapshots,
  queryRows,
  weeklyReport,
} from "./demo-data";
import { runMockAnalysis } from "./analysis";

export function isMockMode() {
  return process.env.MOCK_MODE !== "false";
}

export async function listGoogleSearchConsoleSites() {
  if (isMockMode()) {
    return [{ siteUrl: "https://regnskapspartner-demo.no/", permissionLevel: "siteOwner" }];
  }

  // TODO: Implementer Google OAuth-klient og Search Console sites.list.
  throw new Error("Google Search Console er ikke konfigurert. Sett MOCK_MODE=true eller legg inn Google-nøkler.");
}

export async function fetchSearchConsoleRows() {
  if (isMockMode()) {
    return queryRows;
  }

  // TODO: Kall searchanalytics.query med dimensions page, query, device og country.
  throw new Error("Search Console sync mangler ekte API-konfigurasjon.");
}

export async function fetchGa4LandingPageRows() {
  if (isMockMode()) {
    return [
      { landingPage: "/regnskapsforer-oslo", sessions: 510, engagedSessions: 331, conversions: 2, revenue: 0 },
      { landingPage: "/hva-koster-regnskapsforer", sessions: 740, engagedSessions: 492, conversions: 1, revenue: 0 },
    ];
  }

  // TODO: Implementer GA4 Data API runReport med landingPage og sourceMedium.
  throw new Error("GA4 sync mangler ekte API-konfigurasjon.");
}

export async function crawlImportantPages() {
  if (isMockMode()) {
    return pageSnapshots;
  }

  // TODO: Hent sitemap.xml, kombiner med topp-URL-er fra GSC, crawl med timeout og rate limit.
  throw new Error("Crawler er ikke aktivert for ekte nettsider ennå.");
}

export async function generateRecommendations() {
  const analysis = runMockAnalysis();

  // TODO: Berik shortlist med OpenAI structured output når OPENAI_API_KEY finnes.
  return analysis.recommendations;
}

export async function generateWeeklyReport() {
  // TODO: Lag HTML/PDF-variant og lagre rapportstatus i database.
  return weeklyReport;
}

export async function fetchKeywordMonitoring() {
  return {
    mode: isMockMode() ? "mock" : "live",
    monitoredKeywords,
    alerts: keywordAlerts,
    clusters: keywordClusters,
    competitors: competitorObservations,
  };
}

export async function fetchKeywordAlerts() {
  return {
    mode: isMockMode() ? "mock" : "live",
    alerts: keywordAlerts,
  };
}

export async function fetchExternalAuthorityRecommendations() {
  return {
    mode: isMockMode() ? "mock" : "live",
    recommendations: externalAuthorityRecommendations,
  };
}

export async function fetchDescriptionAudits() {
  return {
    mode: isMockMode() ? "mock" : "live",
    audits: descriptionAudits,
  };
}

export async function fetchPaidAdsMonitoring() {
  return {
    mode: isMockMode() ? "mock" : "live",
    campaigns: paidAdsCampaigns,
    alerts: paidAdsAlerts,
    landingPages: paidLandingPageObservations,
  };
}

export async function testCmsConnection(type: "wordpress" | "shopify") {
  const integration = integrations.find((item) => item.type === type);

  return {
    ok: integration?.status === "connected" || integration?.status === "needs_setup",
    mode: isMockMode() ? "mock" : "live",
    message:
      type === "wordpress"
        ? "WordPress-stub er klar for test connection og create draft."
        : "Shopify-stub er klar for read-only produkt og sidehenting.",
  };
}

export async function createWordPressDraft() {
  // TODO: Opprett WordPress-utkast via REST API. Ikke publiser automatisk.
  return {
    status: "draft_created_stub",
    url: "https://regnskapspartner-demo.no/wp-admin/post.php?post=demo&action=edit",
  };
}
