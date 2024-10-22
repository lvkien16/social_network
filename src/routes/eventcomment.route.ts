import express from 'express';
import { createComment, getComments } from '../controllers/eventcomment.controller';

const router = express.Router();

router.post('/create/:eventid/:username', createComment);
router.get('/get-comment/:eventid', getComments);

export default router;