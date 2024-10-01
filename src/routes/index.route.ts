import express from 'express';
import authRoutes from './auth.route';
import mailerRoutes from './mailer.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/mailer', mailerRoutes);

export default router;