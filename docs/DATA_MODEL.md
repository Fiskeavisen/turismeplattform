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

## Crawl og sideinnhold

### page_snapshots

- `id`
- `siteId`
- `url`
- `title`
- `metaDescription`
- `h1`
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

## Sikkerhetsnotater for Supabase

- Aktiver RLS på alle tabeller i `public`.
- Bruk membership-tabellen for organisasjonstilgang.
- Ikke bruk `user_metadata` til autorisasjon.
- Krypter OAuth- og CMS-tokens før lagring.
- Ikke eksponer `service_role` i frontend.
- Logg viktige endringer i `audit_logs`.
