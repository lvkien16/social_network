import express from 'express';
import { createComment, getComments, getReplyComments, likeComment } from '../controllers/eventcomment.controller';

const router = express.Router();

router.post('/create/:eventid/:username', createComment);
router.get('/get-comment/:eventid', getComments);
router.get('/get-replycomments/:commentid', getReplyComments);
router.post('/like-comment/:commentid/:username', likeComment);

export default router;