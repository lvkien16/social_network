import express from 'express';
import authRoutes from './auth.route';
import mailerRoutes from './mailer.route';
import postRoutes from './post.route';
import userRoutes from './user.route';
import eventRoutes from './event.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/mailer', mailerRoutes);
router.use('/post', postRoutes);
router.use('/user', userRoutes);
router.use('/event', eventRoutes);

export default router;