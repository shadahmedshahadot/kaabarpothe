import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { userRouter } from '../modules/user/user.router';
import { PackageRoutes } from '../modules/package/package.routes';
import { TransportRoutes } from '../modules/transport/transport.routes';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { PaymentRoutes } from '../modules/payment/payment.routes';
import { InvoiceRoutes } from '../modules/invoice/invoice.routes';
import { InquiryRoutes } from '../modules/inquiry/inquiry.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { FaqRoutes } from '../modules/faq/faq.routes';
import { TestimonialRoutes } from '../modules/testimonial/testimonial.routes';
import { SiteContentRoutes } from '../modules/siteContent/siteContent.routes';
import { UserDocumentRoutes } from '../modules/userDocument/userDocument.routes';
import { UploadRoutes } from '../modules/upload/upload.routes';
import { NotificationRoutes } from '../modules/notification/notification.routes';
import { SEORoutes } from '../modules/seo/seo.routes';

const router = express.Router();

type Route = {
  path: string;
  route: express.Router;
};

const routes: Route[] = [
  { path: '/auth', route: AuthRoutes },
  { path: '/user', route: userRouter },
  { path: '/packages', route: PackageRoutes },
  { path: '/transports', route: TransportRoutes },
  { path: '/bookings', route: BookingRoutes },
  { path: '/payments', route: PaymentRoutes },
  { path: '/invoices', route: InvoiceRoutes },
  { path: '/inquiries', route: InquiryRoutes },
  { path: '/blogs', route: BlogRoutes },
  { path: '/faqs', route: FaqRoutes },
  { path: '/testimonials', route: TestimonialRoutes },
  { path: '/site-content', route: SiteContentRoutes },
  { path: '/documents', route: UserDocumentRoutes },
  { path: '/uploads', route: UploadRoutes },
  { path: '/notifications', route: NotificationRoutes },
  { path: '/seo', route: SEORoutes },
];

routes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
