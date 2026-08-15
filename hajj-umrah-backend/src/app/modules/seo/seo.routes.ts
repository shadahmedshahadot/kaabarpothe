import { Router } from 'express';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import SEOController from './seo.controller';
import SEOValidation from './seo.validation';

const router = Router();

// ---- Public read endpoints (used by Next.js server-side metadata) ----
router.get('/global', SEOController.GetGlobal);
router.get('/pages/resolve', SEOController.GetPageByPath);
router.get('/pages/by-key/:pageKey', SEOController.GetPageByKey);
router.get('/public/pages', SEOController.ListPublishedPages);

// ---- Admin endpoints ----
router.get('/pages', auth(UserRole.ADMIN), SEOController.ListPages);
router.get('/pages/:id', auth(UserRole.ADMIN), SEOController.GetPageById);

router.post(
  '/pages',
  auth(UserRole.ADMIN),
  validateRequest(SEOValidation.CreatePageSEOSchema),
  SEOController.CreatePage,
);

router.patch(
  '/pages/:id',
  auth(UserRole.ADMIN),
  validateRequest(SEOValidation.UpdatePageSEOSchema),
  SEOController.UpdatePage,
);

router.delete('/pages/:id', auth(UserRole.ADMIN), SEOController.DeletePage);

router.put(
  '/global',
  auth(UserRole.ADMIN),
  validateRequest(SEOValidation.UpsertGlobalSEOSchema),
  SEOController.UpsertGlobal,
);

router.post('/seed-defaults', auth(UserRole.ADMIN), SEOController.SeedDefaults);

export const SEORoutes = router;
