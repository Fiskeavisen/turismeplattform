# Datamodell: Synlighetsassistenten

Dette dokumentet beskriver MVP-entitetene. Første versjon bruker TypeScript-typer og mock-data. Når Supabase/Postgres kobles på, bør tabellene opprettes med RLS og organisasjonsisolasjon fra start.

## Identitet og tilgang

### users

- `id`
- `name`
- `email`
- `image`
- `createdAt`
- `updatedAt`

### organizations

- `id`
- `name`
- `slug`
- `plan`
- `createdAt`
- `updatedAt`

Planverdier: `starter`, `growth`, `pro_agency`, `done_for_you`.

### memberships

- `id`
- `userId`
- `organizationId`
- `role`
- `createdAt`

Roller: `owner`, `admin`, `member`, `viewer`.

## Nettsteder

### sites

- `id`
- `organizationId`
- `domain`
- `name`
- `defaultCountry`
- `defaultLanguage`
- `cmsType`
- `createdAt`
- `updatedAt`

CMS-typer: `none`, `wordpress`, `shopify`, `webflow`, `custom`.

## Google-data

### google_connections

- `id`
- `organizationId`
- `userId`
- `accessTokenEncrypted`
- `refreshTokenEncrypted`
- `scopes`
- `expiresAt`
- `status`
- `createdAt`
- `updatedAt`

### gsc_properties

- `id`
- `siteId`
- `googleConnectionId`
- `siteUrl`
- `permissionLevel`
- `isSelected`
- `createdAt`
- `updatedAt`

### ga4_properties

- `id`
- `siteId`
- `googleConnectionId`
- `propertyId`
- `displayName`
- `isSelected`
- `createdAt`
- `updatedAt`

### gsc_daily_rows

- `id`
- `siteId`
- `date`
- `page`
- `query`
- `device`
- `country`
- `clicks`
- `impressions`
- `ctr`
- `position`
- `createdAt`

Anbefalte indekser:

- `siteId, date`
- `siteId, page`
- `siteId, query`
- `siteId, page, query`

### ga4_daily_rows

- `id`
- `siteId`
- `date`
- `landingPage`
- `sourceMedium`
- `sessions`
- `engagedSessions`
- `engagementRate`
- `conversions`
- `revenue`
- `createdAt`

## Betalte annonser

### paid_ads_campaigns

- `id`
- `siteId`
- `channel`
- `externalCampaignId`
- `name`
- `status`
- `objective`
- `spend`
- `previousSpend`
- `impressions`
- `clicks`
- `ctr`
- `cpc`
- `conversions`
- `conversionRate`
- `costPerConversion`
- `revenue`
- `roas`
- `landingPage`
- `qualityScore`
- `nextAction`
- `syncedAt`
- `createdAt`
- `updatedAt`

Kanaler: `google_ads`, `meta_ads`, `linkedin_ads`, `microsoft_ads`.

### paid_ads_alerts

- `id`
- `siteId`
- `campaignId`
- `type`
- `severity`
- `title`
- `description`
- `recommendedAction`
- `createdAt`
- `resolvedAt`

Alert-typer: `spend_spike`, `cpa_increase`, `roas_drop`, `low_quality_score`, `landing_page_mismatch`, `organic_paid_overlap`, `budget_limited`, `conversion_drop`.

### paid_landing_page_observations

- `id`
- `siteId`
- `url`
- `paidSpend`
- `paidConversions`
- `organicClicks`
- `pageScore`
- `issue`
- `recommendedAction`
- `createdAt`
- `updatedAt`

Brukes til å koble annonsekostnad mot landingssider, organisk synlighet og innholdskvalitet.

## Søkeordovervåkning

### monitored_keywords

- `id`
- `siteId`
- `keyword`
- `targetUrl`
- `currentUrl`
- `intent`
- `priority`
- `conversionValue`
- `status`
- `nextAction`
- `createdAt`
- `updatedAt`

Status: `watching`, `action_needed`, `measuring`, `ignored`.

### keyword_position_snapshots

- `id`
- `keywordId`
- `measuredAt`
- `position`
- `bestPosition`
- `clicks`
- `impressions`
- `ctr`
- `currentUrl`
- `serpFeaturesJson`
- `competitorsJson`
- `createdAt`

Brukes til trend, posisjonsfall, nær topp 3 og før/etter-måling på søkeordnivå.

### keyword_alerts

- `id`
- `siteId`
- `keywordId`
- `type`
- `severity`
- `title`
- `description`
- `recommendedAction`
- `resolvedAt`
- `createdAt`

Alert-typer: `near_top_3`, `low_ctr`, `position_drop`, `new_query`, `wrong_url`, `competitor_gap`, `serp_feature_opportunity`.

### keyword_clusters

- `id`
- `siteId`
- `name`
- `intent`
- `commercialValue`
- `coverageScore`
- `keywordIdsJson`
- `winningPageType`
- `gap`
- `recommendedNextStep`
- `createdAt`
- `updatedAt`

### competitor_observations

- `id`
- `siteId`
- `competitor`
- `domain`
- `sharedKeywords`
- `strongerOnJson`
- `weakerOnJson`
- `contentPatternsJson`
- `recommendedResponse`
- `createdAt`
- `updatedAt`

## Autoritet og eksterne signaler

### external_authority_recommendations

- `id`
- `siteId`
- `title`
- `type`
- `priority`
- `relatedUrl`
- `issue`
- `recommendation`
- `whyItMatters`
- `suggestedTargetsJson`
- `measurement`
- `riskNote`
- `createdAt`
- `updatedAt`

Typer: `external_mentions`, `outbound_citations`, `reputation_signal`, `expert_source`.

Brukes til råd om eksterne omtaler, troverdige kildehenvisninger, ekspertprofiler og omdømmesignaler. Skal ikke brukes til kjøpte lenker eller irrelevante kataloger.

## Crawl og sideinnhold

### page_snapshots

- `id`
- `siteId`
- `url`
- `title`
- `metaDescription`
- `h1`
- `pageType`
- `descriptionScore`
- `headingsJson`
- `bodyExcerpt`
- `wordCount`
- `statusCode`
- `canonical`
- `robotsMeta`
- `schemaJson`
- `internalLinksJson`
- `externalLinksJson`
- `crawledAt`
- `createdAt`

### description_audits

- `id`
- `siteId`
- `url`
- `pageType`
- `title`
- `currentDescription`
- `descriptionScore`
- `wordCount`
- `issue`
- `missingElementsJson`
- `recommendedDescriptionBrief`
- `suggestedSectionsJson`
- `priority`
- `expectedImpact`
- `estimatedTimeMinutes`
- `source`
- `createdAt`
- `updatedAt`

Kilder: `crawl`, `shopify`, `wordpress`, `woocommerce`, `manual`.

Brukes til å finne produkter, kategorier, samlinger og tjenestesider med svake eller generiske beskrivelser.

## Muligheter, anbefalinger og tiltak

### opportunities

- `id`
- `siteId`
- `url`
- `query`
- `category`
- `opportunityType`
- `score`
- `evidenceJson`
- `status`
- `createdAt`
- `updatedAt`

### recommendations

- `id`
- `opportunityId`
- `siteId`
- `title`
- `issue`
- `recommendation`
- `whyItMatters`
- `suggestedChangeJson`
- `implementationStepsJson`
- `expectedImpact`
- `difficulty`
- `estimatedTimeMinutes`
- `confidence`
- `aiModel`
- `inputTokens`
- `outputTokens`
- `costEstimate`
- `qaStatus`
- `qaScore`
- `qaIssuesJson`
- `createdAt`
- `updatedAt`

QA-status: `passed`, `needs_review`, `rejected`.

### actions

- `id`
- `recommendationId`
- `organizationId`
- `siteId`
- `assignedToUserId`
- `status`
- `dueDate`
- `completedAt`
- `measurementStartAt`
- `measurementEndAt`
- `createdAt`
- `updatedAt`

Status: `new`, `approved`, `sent_to_cms`, `in_progress`, `completed`, `measuring`, `ignored`, `failed`.

### measurements

- `id`
- `actionId`
- `clicksBefore`
- `clicksAfter`
- `impressionsBefore`
- `impressionsAfter`
- `ctrBefore`
- `ctrAfter`
- `positionBefore`
- `positionAfter`
- `conversionsBefore`
- `conversionsAfter`
- `measuredAt`
- `createdAt`

## Rapporter og integrasjoner

### weekly_reports

- `id`
- `organizationId`
- `siteId`
- `weekStart`
- `weekEnd`
- `summary`
- `authorityAdviceJson`
- `html`
- `status`
- `sentAt`
- `createdAt`
- `updatedAt`

Status: `draft`, `needs_review`, `approved`, `sent`, `failed`.

### integrations

- `id`
- `siteId`
- `type`
- `status`
- `configEncrypted`
- `lastSyncedAt`
- `createdAt`
- `updatedAt`

Typer: `google_search_console`, `google_analytics`, `wordpress`, `shopify`, `google_business_profile`, `bing_webmaster_tools`, `slack`, `trello`, `asana`, `clickup`.

## AI og revisjon

### ai_usage_logs

- `id`
- `organizationId`
- `siteId`
- `model`
- `taskType`
- `inputTokens`
- `outputTokens`
- `costEstimate`
- `createdAt`

### audit_logs

- `id`
- `organizationId`
- `userId`
- `action`
- `entityType`
- `entityId`
- `metadataJson`
- `createdAt`

### visibility_leads

Innkommende leads fra den offentlige leadgeneratoren («Få første rapport gratis»).

- `id`
- `website`
- `companyName`
- `orgNumber` (slått opp i Brønnøysundregistrene)
- `phone`
- `email`
- `brregVerified` (bekreftet mot Enhetsregisteret)
- `scanScore` (foreløpig synlighetsscore fra hurtig-scan)
- `status` (`scanning`, `report_sent`, `contacted`, `won`, `lost`)
- `createdAt`
- `updatedAt`

Det offentlige skjemaet kan kun `insert`. Lesing skjer via `service_role` i admin-panelet.

## Sikkerhetsnotater for Supabase

- Aktiver RLS på alle tabeller i `public`.
- Bruk membership-tabellen for organisasjonstilgang.
- Ikke bruk `user_metadata` til autorisasjon.
- Krypter OAuth- og CMS-tokens før lagring.
- Ikke eksponer `service_role` i frontend.
- Logg viktige endringer i `audit_logs`.
