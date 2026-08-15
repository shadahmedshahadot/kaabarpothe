import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import SEOService from './seo.service';

const GetGlobal = catchAsync(async (_req: Request, res: Response) => {
  const result = await SEOService.GetGlobalSEO();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Global SEO retrieved successfully',
    data: result,
  });
});

const UpsertGlobal = catchAsync(async (req: Request, res: Response) => {
  const result = await SEOService.UpsertGlobalSEO(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Global SEO updated successfully',
    data: result,
  });
});

const ListPublishedPages = catchAsync(async (req: Request, res: Response) => {
  const { locale } = req.query;
  const result = await SEOService.ListPublishedPages(
    locale ? String(locale) : undefined,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Published pages retrieved successfully',
    data: result,
  });
});

const ListPages = catchAsync(async (req: Request, res: Response) => {
  const { locale, search } = req.query;
  const result = await SEOService.ListPages({
    locale: locale ? String(locale) : undefined,
    search: search ? String(search) : undefined,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Page SEO list retrieved successfully',
    data: result,
  });
});

const GetPageById = catchAsync(async (req: Request, res: Response) => {
  const result = await SEOService.GetPageById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Page SEO retrieved successfully',
    data: result,
  });
});

const GetPageByPath = catchAsync(async (req: Request, res: Response) => {
  const { path, locale } = req.query;
  if (!path) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: 'Query parameter "path" is required',
      data: null,
    });
    return;
  }
  const result = await SEOService.GetPageByPath(
    String(path),
    locale ? String(locale) : undefined,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Page SEO resolved successfully',
    data: result,
  });
});

const GetPageByKey = catchAsync(async (req: Request, res: Response) => {
  const { locale } = req.query;
  const result = await SEOService.GetPageByKey(
    req.params.pageKey,
    locale ? String(locale) : undefined,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Page SEO resolved successfully',
    data: result,
  });
});

const CreatePage = catchAsync(async (req: Request, res: Response) => {
  const result = await SEOService.CreatePage(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Page SEO created successfully',
    data: result,
  });
});

const UpdatePage = catchAsync(async (req: Request, res: Response) => {
  const result = await SEOService.UpdatePage(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Page SEO updated successfully',
    data: result,
  });
});

const DeletePage = catchAsync(async (req: Request, res: Response) => {
  const result = await SEOService.DeletePage(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Page SEO deleted successfully',
    data: result,
  });
});

const SeedDefaults = catchAsync(async (_req: Request, res: Response) => {
  const result = await SEOService.SeedDefaults();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Default SEO pages seeded successfully',
    data: result,
  });
});

const SEOController = {
  GetGlobal,
  UpsertGlobal,
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

export default SEOController;
