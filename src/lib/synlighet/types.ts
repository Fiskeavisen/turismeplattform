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
  | "paid_ads"
  | "ai_visibility_gap"
  | "agent_readiness"
  | "reputation_signal"
  | "internal_linking";

export type OpportunityType =
  | "low_ctr"
  | "answer_readiness"
  | "internal_linking"
  | "external_authority"
  | "outbound_citation"
  | "weak_description"
  | "content_gap"
  | "trust"
  | "local_visibility"
  | "schema"
  | "conversion"
  | "paid_ads_waste"
  | "paid_ads_opportunity"
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

export type KeywordAlertType =
  | "near_top_3"
  | "low_ctr"
  | "position_drop"
  | "new_query"
  | "wrong_url"
  | "competitor_gap"
  | "serp_feature_opportunity";

export type KeywordAlertSeverity = "low" | "medium" | "high";

export type PaidAdsChannel = "google_ads" | "meta_ads" | "linkedin_ads" | "microsoft_ads";

export type PaidAdsAlertType =
  | "spend_spike"
  | "cpa_increase"
  | "roas_drop"
  | "low_quality_score"
  | "landing_page_mismatch"
  | "organic_paid_overlap"
  | "budget_limited"
  | "conversion_drop";

export type PaidAdsAlertSeverity = "low" | "medium" | "high";

export type SerpFeature =
  | "local_pack"
  | "people_also_ask"
  | "featured_snippet"
  | "ai_overview"
  | "reviews"
  | "video"
  | "shopping"
  | "site_links";

export type PageType = "home" | "service" | "article" | "product" | "collection" | "category" | "contact" | "other";

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
  pageType: PageType;
  descriptionScore: number;
  wordCount: number;
  statusCode: number;
  seoScore: number;
  aeoScore: number;
  localScore: number;
  issues: string[];
  opportunities: string[];
  crawledAt: string;
};

export type DescriptionAudit = {
  id: string;
  siteId: string;
  url: string;
  pageType: PageType;
  title: string;
  currentDescription: string;
  descriptionScore: number;
  wordCount: number;
  issue: string;
  missingElements: string[];
  recommendedDescriptionBrief: string;
  suggestedSections: string[];
  priority: number;
  expectedImpact: "lav" | "medium" | "medium/høy" | "høy";
  estimatedTimeMinutes: number;
  source: "crawl" | "shopify" | "wordpress" | "woocommerce" | "manual";
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

export type MonitoredKeyword = {
  id: string;
  siteId: string;
  keyword: string;
  targetUrl: string;
  currentUrl: string;
  intent: SearchIntentCategory;
  priority: number;
  position: number;
  previousPosition: number;
  bestPosition: number;
  clicks: number;
  impressions: number;
  ctr: number;
  conversionValue: "lav" | "medium" | "høy";
  serpFeatures: SerpFeature[];
  competitors: string[];
  status: "watching" | "action_needed" | "measuring" | "ignored";
  nextAction: string;
  updatedAt: string;
};

export type KeywordAlert = {
  id: string;
  siteId: string;
  keywordId: string;
  type: KeywordAlertType;
  severity: KeywordAlertSeverity;
  title: string;
  description: string;
  recommendedAction: string;
  createdAt: string;
  resolvedAt?: string;
};

export type KeywordCluster = {
  id: string;
  siteId: string;
  name: string;
  intent: SearchIntentCategory;
  commercialValue: number;
  coverageScore: number;
  keywordIds: string[];
  winningPageType: string;
  gap: string;
  recommendedNextStep: string;
};

export type CompetitorObservation = {
  id: string;
  siteId: string;
  competitor: string;
  domain: string;
  sharedKeywords: number;
  strongerOn: string[];
  weakerOn: string[];
  contentPatterns: string[];
  recommendedResponse: string;
  updatedAt: string;
};

export type PaidAdsCampaign = {
  id: string;
  siteId: string;
  channel: PaidAdsChannel;
  name: string;
  status: "enabled" | "paused" | "limited" | "learning";
  objective: "leads" | "sales" | "traffic" | "awareness";
  spend: number;
  previousSpend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  conversions: number;
  conversionRate: number;
  costPerConversion: number;
  revenue?: number;
  roas?: number;
  landingPage: string;
  qualityScore?: number;
  updatedAt: string;
  nextAction: string;
};

export type PaidAdsAlert = {
  id: string;
  siteId: string;
  campaignId: string;
  type: PaidAdsAlertType;
  severity: PaidAdsAlertSeverity;
  title: string;
  description: string;
  recommendedAction: string;
  createdAt: string;
  resolvedAt?: string;
};

export type PaidLandingPageObservation = {
  id: string;
  siteId: string;
  url: string;
  paidSpend: number;
  paidConversions: number;
  organicClicks: number;
  pageScore: number;
  issue: string;
  recommendedAction: string;
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
  authorityAdvice: string[];
  quickWin: string;
  biggestRisk: string;
  status: WeeklyReportStatus;
  html: string;
  sentAt?: string;
};

export type ExternalAuthorityRecommendation = {
  id: string;
  siteId: string;
  title: string;
  type: "external_mentions" | "outbound_citations" | "reputation_signal" | "expert_source";
  priority: number;
  relatedUrl: string;
  issue: string;
  recommendation: string;
  whyItMatters: string;
  suggestedTargets: string[];
  measurement: string;
  riskNote: string;
};

export type Integration = {
  id: string;
  siteId: string;
  type:
    | "google_search_console"
    | "google_analytics"
    | "google_ads"
    | "meta_ads"
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

export type LeadStatus = "scanning" | "report_sent" | "contacted" | "won" | "lost";

export type Lead = {
  id: string;
  website: string;
  companyName: string;
  orgNumber?: string;
  phone: string;
  email: string;
  brregVerified: boolean;
  scanScore?: number;
  status: LeadStatus;
  createdAt: string;
};

export type BrregUnit = {
  organisasjonsnummer: string;
  navn: string;
  organisasjonsform?: string;
  forretningsadresse?: string;
  hjemmeside?: string;
};
