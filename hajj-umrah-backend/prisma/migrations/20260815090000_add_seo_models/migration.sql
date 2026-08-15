-- CreateTable
CREATE TABLE "global_seo" (
    "key" TEXT NOT NULL DEFAULT 'global',
    "siteName" TEXT NOT NULL DEFAULT '',
    "defaultTitle" TEXT NOT NULL DEFAULT '',
    "defaultTitleTemplate" TEXT NOT NULL DEFAULT '%s | Site',
    "defaultDescription" TEXT NOT NULL DEFAULT '',
    "defaultKeywords" TEXT[],
    "defaultOgImage" TEXT,
    "defaultOgImageAlt" TEXT,
    "defaultOgType" TEXT NOT NULL DEFAULT 'website',
    "defaultOgSiteName" TEXT,
    "defaultOgLocale" TEXT NOT NULL DEFAULT 'bn_BD',
    "defaultTwitterCard" TEXT NOT NULL DEFAULT 'summary_large_image',
    "defaultTwitterSite" TEXT,
    "defaultTwitterCreator" TEXT,
    "defaultTwitterImage" TEXT,
    "defaultRobots" TEXT NOT NULL DEFAULT 'index,follow',
    "themeColor" TEXT,
    "themeColorDark" TEXT,
    "siteUrl" TEXT NOT NULL DEFAULT '',
    "favicon" TEXT,
    "appleTouchIcon" TEXT,
    "organizationJsonLd" JSONB,
    "websiteJsonLd" JSONB,
    "verificationGoogle" TEXT,
    "verificationBing" TEXT,
    "verificationYandex" TEXT,
    "verificationFacebook" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "global_seo_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "page_seo" (
    "id" TEXT NOT NULL,
    "pageKey" TEXT NOT NULL,
    "pagePath" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'bn-BD',
    "pageName" TEXT NOT NULL,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT,
    "metaDescription" TEXT,
    "keywords" TEXT[],
    "robots" TEXT,
    "robotsMaxSnippet" INTEGER,
    "robotsMaxImagePreview" TEXT,
    "robotsMaxVideoPreview" INTEGER,
    "canonicalUrl" TEXT,
    "canonicalAuto" BOOLEAN NOT NULL DEFAULT true,
    "author" TEXT,
    "language" TEXT,
    "themeColor" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "ogImageAlt" TEXT,
    "ogUrl" TEXT,
    "ogType" TEXT,
    "ogSiteName" TEXT,
    "ogLocale" TEXT,
    "twitterCard" TEXT,
    "twitterTitle" TEXT,
    "twitterDescription" TEXT,
    "twitterImage" TEXT,
    "twitterImageAlt" TEXT,
    "twitterSite" TEXT,
    "twitterCreator" TEXT,
    "structuredData" JSONB,
    "customMeta" JSONB,
    "breadcrumbs" JSONB,
    "seoStatus" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "page_seo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "page_seo_pagePath_locale_key" ON "page_seo"("pagePath", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "page_seo_pageKey_locale_key" ON "page_seo"("pageKey", "locale");

-- CreateIndex
CREATE INDEX "page_seo_pagePath_idx" ON "page_seo"("pagePath");

-- CreateIndex
CREATE INDEX "page_seo_locale_idx" ON "page_seo"("locale");
