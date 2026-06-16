import {
  descriptionAudits,
  externalAuthorityRecommendations,
  keywordAlerts,
  monitoredKeywords,
  pageSnapshots,
  queryRows,
  visibilityActions,
} from "./demo-data";
import type { ActionCategory, OpportunityType, VisibilityAction } from "./types";

export type Opportunity = {
  id: string;
  category: ActionCategory;
  opportunityType: OpportunityType;
  url: string;
  query?: string;
  score: number;
  reason: string;
  evidence: Record<string, string | number | boolean | undefined>;
};

export function scoreOpportunity(input: {
  potentialTrafficScore: number;
  businessValueScore: number;
  confidenceScore: number;
  easeScore: number;
  difficultyPenalty: number;
  riskPenalty: number;
}) {
  const raw =
    input.potentialTrafficScore * 0.32 +
    input.businessValueScore * 0.24 +
    input.confidenceScore * 0.22 +
    input.easeScore * 0.22 -
    input.difficultyPenalty -
    input.riskPenalty;

  return Math.max(0, Math.min(100, Math.round(raw)));
}

export function findLowCtrOpportunities(): Opportunity[] {
  return queryRows
    .filter((row) => row.impressions > 500 && row.position >= 3 && row.position <= 12 && row.ctr < 0.025)
    .map((row) => ({
      id: `opp-low-ctr-${row.id}`,
      category: "ctr_optimization",
      opportunityType: "low_ctr",
      url: row.page,
      query: row.query,
      score: scoreOpportunity({
        potentialTrafficScore: Math.min(100, row.impressions / 35),
        businessValueScore: row.intent === "local_intent" ? 86 : 78,
        confidenceScore: 82,
        easeScore: 92,
        difficultyPenalty: 4,
        riskPenalty: 2,
      }),
      reason: "Høy synlighet, men lav CTR for posisjonen.",
      evidence: {
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position,
      },
    }));
}

export function findAnswerReadinessOpportunities(): Opportunity[] {
  return pageSnapshots
    .filter((page) => page.aeoScore < 70)
    .map((page) => ({
      id: `opp-answer-${page.id}`,
      category: "answer_readiness",
      opportunityType: "answer_readiness",
      url: page.url,
      score: scoreOpportunity({
        potentialTrafficScore: 70,
        businessValueScore: page.url.includes("regnskapsforer") ? 88 : 64,
        confidenceScore: 74,
        easeScore: 72,
        difficultyPenalty: 8,
        riskPenalty: 4,
      }),
      reason: "Siden mangler tydelige svarblokker eller struktur for svarbaserte søk.",
      evidence: {
        aeoScore: page.aeoScore,
        wordCount: page.wordCount,
        firstIssue: page.issues[0],
      },
    }));
}

export function findInternalLinkingOpportunities(): Opportunity[] {
  return pageSnapshots
    .filter((page) => page.opportunities.some((item) => item.toLowerCase().includes("lenk")))
    .map((page) => ({
      id: `opp-internal-${page.id}`,
      category: "internal_linking",
      opportunityType: "internal_linking",
      url: page.url,
      score: scoreOpportunity({
        potentialTrafficScore: 68,
        businessValueScore: 76,
        confidenceScore: 78,
        easeScore: 94,
        difficultyPenalty: 3,
        riskPenalty: 2,
      }),
      reason: "Siden har organisk trafikk eller relevans, men mangler internlenke til neste kommersielle steg.",
      evidence: {
        opportunity: page.opportunities.find((item) => item.toLowerCase().includes("lenk")),
        seoScore: page.seoScore,
      },
    }));
}

export function findTrustOpportunities(): Opportunity[] {
  return pageSnapshots
    .filter((page) => page.issues.some((issue) => issue.toLowerCase().includes("sosialt bevis")))
    .map((page) => ({
      id: `opp-trust-${page.id}`,
      category: "entity_authority",
      opportunityType: "trust",
      url: page.url,
      score: scoreOpportunity({
        potentialTrafficScore: 58,
        businessValueScore: 82,
        confidenceScore: 68,
        easeScore: 60,
        difficultyPenalty: 10,
        riskPenalty: 4,
      }),
      reason: "Siden mangler tydelige trust-signaler nær konverteringspunktet.",
      evidence: {
        issue: page.issues.find((issue) => issue.toLowerCase().includes("sosialt bevis")),
        localScore: page.localScore,
      },
    }));
}

export function findLocalVisibilityOpportunities(): Opportunity[] {
  return pageSnapshots
    .filter((page) => page.localScore < 75)
    .map((page) => ({
      id: `opp-local-${page.id}`,
      category: "local_visibility",
      opportunityType: "local_visibility",
      url: page.url,
      score: scoreOpportunity({
        potentialTrafficScore: page.url.includes("oslo") || page.url === "/kontakt" ? 72 : 44,
        businessValueScore: 80,
        confidenceScore: 66,
        easeScore: 70,
        difficultyPenalty: 7,
        riskPenalty: 3,
      }),
      reason: "Siden har lokale signaler som kan gjøres tydeligere for brukere og søkesystemer.",
      evidence: {
        localScore: page.localScore,
        firstIssue: page.issues[0],
      },
    }));
}

export function findConversionOpportunities(): Opportunity[] {
  return pageSnapshots
    .filter((page) => page.issues.some((issue) => issue.toLowerCase().includes("cta")))
    .map((page) => ({
      id: `opp-conversion-${page.id}`,
      category: "conversion_opportunity",
      opportunityType: "conversion",
      url: page.url,
      score: scoreOpportunity({
        potentialTrafficScore: 64,
        businessValueScore: 88,
        confidenceScore: 70,
        easeScore: 76,
        difficultyPenalty: 6,
        riskPenalty: 3,
      }),
      reason: "Siden har organisk verdi, men neste steg er ikke tydelig nok.",
      evidence: {
        issue: page.issues.find((issue) => issue.toLowerCase().includes("cta")),
        wordCount: page.wordCount,
      },
    }));
}

export function findSchemaOpportunities(): Opportunity[] {
  return pageSnapshots
    .filter((page) => page.url.includes("regnskapsforer") || page.url === "/")
    .map((page) => ({
      id: `opp-schema-${page.id}`,
      category: "structured_data",
      opportunityType: "schema",
      url: page.url,
      score: scoreOpportunity({
        potentialTrafficScore: 42,
        businessValueScore: 62,
        confidenceScore: 64,
        easeScore: 66,
        difficultyPenalty: 8,
        riskPenalty: 4,
      }),
      reason: "Siden bør strukturere organisasjon, lokal virksomhet og brødsmuler tydeligere.",
      evidence: {
        recommendedSchema: page.url === "/" ? "Organization" : "LocalBusiness + BreadcrumbList",
        statusCode: page.statusCode,
      },
    }));
}

export function findKeywordMonitoringOpportunities(): Opportunity[] {
  return keywordAlerts.map((alert) => {
    const keyword = monitoredKeywords.find((item) => item.id === alert.keywordId);
    const score = alert.severity === "high" ? 86 : alert.severity === "medium" ? 74 : 58;

    return {
      id: `opp-keyword-${alert.id}`,
      category:
        alert.type === "low_ctr"
          ? "ctr_optimization"
          : alert.type === "wrong_url"
            ? "internal_linking"
            : alert.type === "serp_feature_opportunity"
              ? "answer_readiness"
              : "content_gap",
      opportunityType:
        alert.type === "low_ctr"
          ? "low_ctr"
          : alert.type === "position_drop"
            ? "content_decay"
            : alert.type === "wrong_url"
              ? "internal_linking"
              : "content_gap",
      url: keyword?.targetUrl ?? keyword?.currentUrl ?? "/",
      query: keyword?.keyword,
      score,
      reason: alert.description,
      evidence: {
        alertType: alert.type,
        severity: alert.severity,
        position: keyword?.position,
        previousPosition: keyword?.previousPosition,
        currentUrl: keyword?.currentUrl,
        targetUrl: keyword?.targetUrl,
      },
    } satisfies Opportunity;
  });
}

export function findExternalAuthorityOpportunities(): Opportunity[] {
  return externalAuthorityRecommendations.map((recommendation) => ({
    id: `opp-authority-${recommendation.id}`,
    category: recommendation.type === "outbound_citations" ? "entity_authority" : "reputation_signal",
    opportunityType: recommendation.type === "outbound_citations" ? "outbound_citation" : "external_authority",
    url: recommendation.relatedUrl,
    score: recommendation.priority,
    reason: recommendation.issue,
    evidence: {
      type: recommendation.type,
      suggestedTargets: recommendation.suggestedTargets.join(", "),
      measurement: recommendation.measurement,
    },
  }));
}

export function findWeakDescriptionOpportunities(): Opportunity[] {
  return descriptionAudits
    .filter((audit) => audit.descriptionScore < 65)
    .map((audit) => ({
      id: `opp-description-${audit.id}`,
      category: "content_gap",
      opportunityType: "weak_description",
      url: audit.url,
      score: audit.priority,
      reason: audit.issue,
      evidence: {
        pageType: audit.pageType,
        descriptionScore: audit.descriptionScore,
        wordCount: audit.wordCount,
        missingElements: audit.missingElements.join(", "),
        source: audit.source,
      },
    }));
}

export function runMockAnalysis() {
  const opportunities = [
    ...findLowCtrOpportunities(),
    ...findAnswerReadinessOpportunities(),
    ...findInternalLinkingOpportunities(),
    ...findTrustOpportunities(),
    ...findLocalVisibilityOpportunities(),
    ...findConversionOpportunities(),
    ...findSchemaOpportunities(),
    ...findKeywordMonitoringOpportunities(),
    ...findExternalAuthorityOpportunities(),
    ...findWeakDescriptionOpportunities(),
  ].sort((a, b) => b.score - a.score);

  return {
    mode: "mock",
    opportunities,
    recommendations: visibilityActions,
  };
}

export function runQualityGate(action: VisibilityAction) {
  const hasUrl = action.url.length > 0;
  const hasEvidence = action.sourceData.impressions > 0 || action.sourceData.clicks > 0;
  const isConcrete = action.suggestedChange.length > 30 && action.implementationSteps.length > 0;
  const isMeasurable = Boolean(action.measurementStartAt || action.sourceData);
  const score = [hasUrl, hasEvidence, isConcrete, isMeasurable].filter(Boolean).length * 25;

  return {
    qaStatus: score >= 80 ? "passed" : "needs_review",
    qaScore: score,
    qaIssues: [
      !hasUrl ? "Tiltaket mangler URL." : null,
      !hasEvidence ? "Tiltaket mangler datagrunnlag." : null,
      !isConcrete ? "Tiltaket er for generisk." : null,
      !isMeasurable ? "Tiltaket er ikke målbart." : null,
    ].filter((issue): issue is string => Boolean(issue)),
  };
}
