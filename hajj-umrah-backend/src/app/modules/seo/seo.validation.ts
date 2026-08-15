import { z } from 'zod';

const nullableString = z.string().trim().optional().nullable();
const nullableInt = z.number().int().optional().nullable();

const StructuredDataSchema = z
  .union([z.array(z.record(z.any())), z.record(z.any()), z.null()])
  .optional();

const CustomMetaSchema = z
  .union([
    z.array(z.object({ name: z.string(), content: z.string() })),
    z.null(),
  ])
  .optional();

const BreadcrumbSchema = z
  .union([
    z.array(z.object({ name: z.string(), url: z.string() })),
    z.null(),
  ])
  .optional();

const BasePageSEOFields = {
  pageKey: z.string().min(1).max(120),
  pagePath: z.string().min(1).max(500),
  locale: z.string().min(2).max(20).default('bn-BD'),
  pageName: z.string().min(1).max(200),
  isSystem: z.boolean().optional(),

  title: nullableString,
  metaDescription: nullableString,
  keywords: z.array(z.string()).optional().default([]),
  robots: nullableString,
  robotsMaxSnippet: nullableInt,
  robotsMaxImagePreview: nullableString,
  robotsMaxVideoPreview: nullableInt,
  canonicalUrl: nullableString,
  canonicalAuto: z.boolean().optional(),
  author: nullableString,
  language: nullableString,
  themeColor: nullableString,

  ogTitle: nullableString,
  ogDescription: nullableString,
  ogImage: nullableString,
  ogImageAlt: nullableString,
  ogUrl: nullableString,
  ogType: nullableString,
  ogSiteName: nullableString,
  ogLocale: nullableString,

  twitterCard: nullableString,
  twitterTitle: nullableString,
  twitterDescription: nullableString,
  twitterImage: nullableString,
  twitterImageAlt: nullableString,
  twitterSite: nullableString,
  twitterCreator: nullableString,

  structuredData: StructuredDataSchema,
  customMeta: CustomMetaSchema,
  breadcrumbs: BreadcrumbSchema,

  seoStatus: z.enum(['DRAFT', 'PUBLISHED']).optional(),
};

const CreatePageSEOSchema = z.object({
  body: z.object(BasePageSEOFields),
});

const UpdatePageSEOSchema = z.object({
  body: z.object({
    pageKey: z.string().min(1).max(120).optional(),
    pagePath: z.string().min(1).max(500).optional(),
    locale: z.string().min(2).max(20).optional(),
    pageName: z.string().min(1).max(200).optional(),

    title: nullableString,
    metaDescription: nullableString,
    keywords: z.array(z.string()).optional(),
    robots: nullableString,
    robotsMaxSnippet: nullableInt,
    robotsMaxImagePreview: nullableString,
    robotsMaxVideoPreview: nullableInt,
    canonicalUrl: nullableString,
    canonicalAuto: z.boolean().optional(),
    author: nullableString,
    language: nullableString,
    themeColor: nullableString,

    ogTitle: nullableString,
    ogDescription: nullableString,
    ogImage: nullableString,
    ogImageAlt: nullableString,
    ogUrl: nullableString,
    ogType: nullableString,
    ogSiteName: nullableString,
    ogLocale: nullableString,

    twitterCard: nullableString,
    twitterTitle: nullableString,
    twitterDescription: nullableString,
    twitterImage: nullableString,
    twitterImageAlt: nullableString,
    twitterSite: nullableString,
    twitterCreator: nullableString,

    structuredData: StructuredDataSchema,
    customMeta: CustomMetaSchema,
    breadcrumbs: BreadcrumbSchema,

    seoStatus: z.enum(['DRAFT', 'PUBLISHED']).optional(),
  }),
});

const UpsertGlobalSEOSchema = z.object({
  body: z.object({
    siteName: z.string().optional(),
    defaultTitle: z.string().optional(),
    defaultTitleTemplate: z.string().optional(),
    defaultDescription: z.string().optional(),
    defaultKeywords: z.array(z.string()).optional(),
    defaultOgImage: nullableString,
    defaultOgImageAlt: nullableString,
    defaultOgType: z.string().optional(),
    defaultOgSiteName: nullableString,
    defaultOgLocale: z.string().optional(),
    defaultTwitterCard: z.string().optional(),
    defaultTwitterSite: nullableString,
    defaultTwitterCreator: nullableString,
    defaultTwitterImage: nullableString,
    defaultRobots: z.string().optional(),
    themeColor: nullableString,
    themeColorDark: nullableString,
    siteUrl: z.string().optional(),
    favicon: nullableString,
    appleTouchIcon: nullableString,
    organizationJsonLd: z.record(z.any()).optional().nullable(),
    websiteJsonLd: z.record(z.any()).optional().nullable(),
    verificationGoogle: nullableString,
    verificationBing: nullableString,
    verificationYandex: nullableString,
    verificationFacebook: nullableString,
  }),
});

const SEOValidation = {
  CreatePageSEOSchema,
  UpdatePageSEOSchema,
  UpsertGlobalSEOSchema,
};

export default SEOValidation;
