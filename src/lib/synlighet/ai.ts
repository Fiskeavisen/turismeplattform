import { z } from "zod";
import type { Opportunity } from "./analysis";

export const enrichedRecommendationSchema = z.object({
  priority: z.enum(["low", "medium", "high"]),
  recommendedAction: z.string().min(10),
  suggestedTitle: z.string().optional(),
  suggestedMeta: z.string().optional(),
  why: z.string().min(10),
  difficulty: z.enum(["low", "medium", "high"]),
  estimatedTimeMinutes: z.number().int().positive(),
  confidence: z.number().min(0).max(1),
});

export type EnrichedRecommendation = z.infer<typeof enrichedRecommendationSchema>;

export function buildEvidencePayload(opportunity: Opportunity) {
  return {
    url: opportunity.url,
    query: opportunity.query,
    category: opportunity.category,
    opportunityType: opportunity.opportunityType,
    score: opportunity.score,
    reason: opportunity.reason,
    evidence: opportunity.evidence,
  };
}

export async function enrichOpportunity(opportunity: Opportunity): Promise<EnrichedRecommendation> {
  if (!process.env.OPENAI_API_KEY || process.env.MOCK_MODE !== "false") {
    return fallbackEnrichment(opportunity);
  }

  // TODO: Kall OpenAI Responses API med json schema/structured output.
  // Viktig: send kun buildEvidencePayload(opportunity), aldri rå GSC-/GA4-datasett eller secrets.
  return fallbackEnrichment(opportunity);
}

export function fallbackEnrichment(opportunity: Opportunity): EnrichedRecommendation {
  const priority = opportunity.score >= 80 ? "high" : opportunity.score >= 65 ? "medium" : "low";
  const minutes = opportunity.category === "ctr_optimization" ? 15 : opportunity.category === "internal_linking" ? 10 : 30;

  return {
    priority,
    recommendedAction: actionText(opportunity),
    suggestedTitle:
      opportunity.category === "ctr_optimization"
        ? "Regnskapsfører i Oslo for små bedrifter | Regnskapspartner"
        : undefined,
    suggestedMeta:
      opportunity.category === "ctr_optimization"
        ? "Få hjelp med regnskap, lønn og rapportering i Oslo. Fast kontaktperson og tydelige priser for små bedrifter."
        : undefined,
    why: opportunity.reason,
    difficulty: minutes <= 15 ? "low" : "medium",
    estimatedTimeMinutes: minutes,
    confidence: Math.min(0.92, Math.max(0.55, opportunity.score / 100)),
  };
}

function actionText(opportunity: Opportunity) {
  const byCategory: Record<string, string> = {
    ctr_optimization: `Skriv om title og meta for ${opportunity.url}.`,
    answer_readiness: `Legg til en kort svarblokk og relevante spørsmål på ${opportunity.url}.`,
    internal_linking: `Legg inn en kontekstuell internlenke fra ${opportunity.url}.`,
    entity_authority: `Legg til trust-signaler og konkret bevis på ${opportunity.url}.`,
    local_visibility: `Gjør lokale signaler tydeligere på ${opportunity.url}.`,
    conversion_opportunity: `Gjør neste steg tydeligere på ${opportunity.url}.`,
    structured_data: `Legg til relevant schema på ${opportunity.url}.`,
  };

  return byCategory[opportunity.category] ?? `Forbedre ${opportunity.url} basert på datagrunnlaget.`;
}
