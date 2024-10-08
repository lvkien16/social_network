import express from 'express';
import authRoutes from './auth.route';
import mailerRoutes from './mailer.route';
import postRoutes from './post.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/mailer', mailerRoutes);
router.use('/post', postRoutes);

export default router;