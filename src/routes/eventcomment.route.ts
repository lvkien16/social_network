import express from 'express';
import { createComment, getComments, getReplyComments } from '../controllers/eventcomment.controller';

const router = express.Router();

router.post('/create/:eventid/:username', createComment);
router.get('/get-comment/:eventid', getComments);
router.get('/get-replycomments/:commentid', getReplyComments);

export default router;