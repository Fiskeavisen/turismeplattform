export type VisibilityPlan = "starter" | "growth" | "pro_agency" | "done_for_you";

export type CmsType = "none" | "wordpress" | "shopify" | "webflow" | "custom";

export type ActionStatus =
  | "new"
  | "approved"
  | "sent_to_cms"
  | "in_progress"
  | "completed"
  | "measuring"
  | "ignored"
  | "failed";

export type ActionCategory =
  | "technical_seo"
  | "content_gap"
  | "ctr_optimization"
  | "content_decay"
  | "answer_readiness"
  | "entity_authority"
  | "local_visibility"
  | "structured_data"
  | "conversion_opportunity"
  | "ai_visibility_gap"
  | "agent_readiness"
  | "reputation_signal"
  | "internal_linking";

export type OpportunityType =
  | "low_ctr"
  | "answer_readiness"
  | "internal_linking"
  | "content_gap"
  | "trust"
  | "local_visibility"
  | "schema"
  | "conversion"
  | "content_decay";

export type Difficulty = "low" | "medium" | "high";

export type QaStatus = "passed" | "needs_review" | "rejected";

export type IntegrationStatus = "connected" | "needs_setup" | "mocked" | "error" | "coming_soon";

export type WeeklyReportStatus = "draft" | "needs_review" | "approved" | "sent" | "failed";

export type SearchIntentCategory =
  | "transactional_intent"
  | "local_intent"
  | "commercial_research"
  | "price_cost_comparison"
  | "problem_friction_intent"
  | "trust_safety_doubt"
  | "ai_answer_intent";

export type VisibilityOrganization = {
  id: string;
  name: string;
  slug: string;
  plan: VisibilityPlan;
};

export type VisibilitySite = {
  id: string;
  organizationId: string;
  domain: string;
  name: string;
  defaultCountry: string;
  defaultLanguage: string;
  cmsType: CmsType;
};

export type SourceData = {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  conversions?: number;
  query?: string;
};

export type Measurement = {
  clicksBefore: number;
  clicksAfter: number;
  impressionsBefore: number;
  impressionsAfter: number;
  ctrBefore: number;
  ctrAfter: number;
  positionBefore: number;
  positionAfter: number;
  conversionsBefore: number;
  conversionsAfter: number;
  measuredAt: string;
};

export type VisibilityAction = {
  id: string;
  organizationId: string;
  siteId: string;
  url: string;
  title: string;
  category: ActionCategory;
  priorityScore: number;
  opportunityType: OpportunityType;
  issue: string;
  recommendation: string;
  whyItMatters: string;
  suggestedChange: string;
  implementationSteps: string[];
  expectedImpact: "lav" | "medium" | "medium/høy" | "høy";
  difficulty: Difficulty;
  estimatedTimeMinutes: number;
  confidence: number;
  sourceData: SourceData;
  status: ActionStatus;
  assignedTo?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  measurementStartAt?: string;
  measurementEndAt?: string;
  qaStatus: QaStatus;
  qaScore: number;
  qaIssues: string[];
  qaDecision: string;
  measurement?: Measurement;
};

export type PageSnapshot = {
  id: string;
  siteId: string;
  url: string;
  title: string;
  metaDescription: string;
  h1: string;
  wordCount: number;
  statusCode: number;
  seoScore: number;
  aeoScore: number;
  localScore: number;
  issues: string[];
  opportunities: string[];
  crawledAt: string;
};

export type QueryRow = {
  id: string;
  page: string;
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  intent: SearchIntentCategory;
  trend: "up" | "down" | "flat";
};

export type AiVisibilityTest = {
  id: string;
  prompt: string;
  testedAt: string;
  provider: string;
  mentionedBrand: boolean;
  mentionedCompetitors: string[];
  citedSources: string[];
  summary: string;
  gaps: string[];
  recommendedActions: string[];
};

export type WeeklyReport = {
  id: string;
  organizationId: string;
  siteId: string;
  weekStart: string;
  weekEnd: string;
  summary: string;
  focusActions: string[];
  quickWin: string;
  biggestRisk: string;
  status: WeeklyReportStatus;
  html: string;
  sentAt?: string;
};

export type Integration = {
  id: string;
  siteId: string;
  type:
    | "google_search_console"
    | "google_analytics"
    | "wordpress"
    | "shopify"
    | "google_business_profile"
    | "bing_webmaster_tools"
    | "slack"
    | "trello"
    | "asana"
    | "clickup";
  name: string;
  status: IntegrationStatus;
  description: string;
  lastSyncedAt?: string;
  nextStep: string;
};

export type AiUsageLog = {
  id: string;
  model: string;
  taskType: string;
  inputTokens: number;
  outputTokens: number;
  costEstimate: number;
  createdAt: string;
};
