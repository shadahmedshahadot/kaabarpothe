import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import {
  DEFAULT_GLOBAL_SEO,
  DEFAULT_LOCALE,
  STATIC_PAGE_REGISTRY,
} from './seo.registry';

const GLOBAL_KEY = 'global';

const normalizePath = (path: string) => {
  if (!path) return '/';
  const trimmed = path.trim();
  if (trimmed === '/' || trimmed === '') return '/';
  return trimmed.startsWith('/') ? trimmed.replace(/\/+$/, '') : `/${trimmed}`.replace(/\/+$/, '');
};

const GetGlobalSEO = async () => {
  const existing = await prisma.globalSEO.findUnique({ where: { key: GLOBAL_KEY } });
  if (existing) return existing;
  return prisma.globalSEO.create({
    data: { key: GLOBAL_KEY, ...DEFAULT_GLOBAL_SEO },
  });
};

const UpsertGlobalSEO = async (payload: Record<string, unknown>) => {
  return prisma.globalSEO.upsert({
    where: { key: GLOBAL_KEY },
    update: payload as Prisma.GlobalSEOUpdateInput,
    create: { key: GLOBAL_KEY, ...DEFAULT_GLOBAL_SEO, ...(payload as object) } as Prisma.GlobalSEOCreateInput,
  });
};

const ListPublishedPages = async (locale?: string) => {
  const where: Prisma.PageSEOWhereInput = { seoStatus: 'PUBLISHED' };
  if (locale) where.locale = locale;
  return prisma.pageSEO.findMany({
    where,
    select: {
      pageKey: true,
      pagePath: true,
      locale: true,
      robots: true,
      seoStatus: true,
      updatedAt: true,
    },
    orderBy: [{ pagePath: 'asc' }],
  });
};

const ListPages = async (query: { locale?: string; search?: string }) => {
  const { locale, search } = query;
  const where: Prisma.PageSEOWhereInput = {};
  if (locale) where.locale = locale;
  if (search)
    where.OR = [
      { pageName: { contains: search, mode: 'insensitive' } },
      { pagePath: { contains: search, mode: 'insensitive' } },
      { pageKey: { contains: search, mode: 'insensitive' } },
    ];
  return prisma.pageSEO.findMany({ where, orderBy: [{ pageName: 'asc' }] });
};

const GetPageById = async (id: string) => {
  const page = await prisma.pageSEO.findUnique({ where: { id } });
  if (!page) throw new AppError(httpStatus.NOT_FOUND, 'Page SEO not found');
  return page;
};

const GetPageByPath = async (path: string, locale?: string) => {
  const targetLocale = locale ?? DEFAULT_LOCALE;
  const normalized = normalizePath(path);
  const exact = await prisma.pageSEO.findFirst({
    where: { pagePath: normalized, locale: targetLocale },
  });
  if (exact) return exact;
  return prisma.pageSEO.findFirst({
    where: { pagePath: normalized },
  });
};

const GetPageByKey = async (pageKey: string, locale?: string) => {
  const targetLocale = locale ?? DEFAULT_LOCALE;
  const exact = await prisma.pageSEO.findFirst({
    where: { pageKey, locale: targetLocale },
  });
  if (exact) return exact;
  return prisma.pageSEO.findFirst({ where: { pageKey } });
};

const CreatePage = async (payload: Record<string, unknown>) => {
  const data = { ...payload } as Prisma.PageSEOUncheckedCreateInput;
  if (data.pagePath) data.pagePath = normalizePath(String(data.pagePath));
  try {
    return await prisma.pageSEO.create({ data });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      throw new AppError(
        httpStatus.CONFLICT,
        'A page with this path or key already exists for this locale',
      );
    }
    throw err;
  }
};

const UpdatePage = async (id: string, payload: Record<string, unknown>) => {
  const existing = await prisma.pageSEO.findUnique({ where: { id } });
  if (!existing) throw new AppError(httpStatus.NOT_FOUND, 'Page SEO not found');
  const data = { ...payload } as Prisma.PageSEOUncheckedUpdateInput;
  if (data.pagePath) data.pagePath = normalizePath(String(data.pagePath));
  try {
    return await prisma.pageSEO.update({ where: { id }, data });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      throw new AppError(
        httpStatus.CONFLICT,
        'Path or key conflicts with another SEO entry for this locale',
      );
    }
    throw err;
  }
};

const DeletePage = async (id: string) => {
  const existing = await prisma.pageSEO.findUnique({ where: { id } });
  if (!existing) throw new AppError(httpStatus.NOT_FOUND, 'Page SEO not found');
  if (existing.isSystem)
    throw new AppError(
      httpStatus.FORBIDDEN,
      'System pages cannot be deleted. Update fields instead.',
    );
  return prisma.pageSEO.delete({ where: { id } });
};

const SeedDefaults = async () => {
  await UpsertGlobalSEO({});
  const results: { pageKey: string; created: boolean }[] = [];
  for (const entry of STATIC_PAGE_REGISTRY) {
    const existing = await prisma.pageSEO.findFirst({
      where: { pageKey: entry.pageKey, locale: DEFAULT_LOCALE },
    });
    if (existing) {
      results.push({ pageKey: entry.pageKey, created: false });
      continue;
    }
    await prisma.pageSEO.create({
      data: {
        pageKey: entry.pageKey,
        pagePath: normalizePath(entry.pagePath),
        locale: DEFAULT_LOCALE,
        pageName: entry.pageName,
        isSystem: true,
        title: entry.title,
        metaDescription: entry.metaDescription,
        keywords: entry.keywords ?? [],
        robots: entry.robots ?? 'index,follow',
        ogType: entry.ogType ?? 'website',
        twitterCard: entry.twitterCard ?? 'summary_large_image',
        structuredData: (entry.structuredData ?? undefined) as Prisma.InputJsonValue | undefined,
        canonicalAuto: true,
        seoStatus: 'PUBLISHED',
      },
    });
    results.push({ pageKey: entry.pageKey, created: true });
  }
  return {
    globalSeoEnsured: true,
    pages: results,
    created: results.filter(r => r.created).length,
    skipped: results.filter(r => !r.created).length,
  };
};

const SEOService = {
  GetGlobalSEO,
  UpsertGlobalSEO,
  ListPublishedPages,
  ListPages,
  GetPageById,
  GetPageByPath,
  GetPageByKey,
  CreatePage,
  UpdatePage,
  DeletePage,
  SeedDefaults,
};

export default SEOService;
