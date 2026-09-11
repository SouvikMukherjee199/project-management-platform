import express from 'express';
import healthCheck from '../controllers/healthcheck.controller.js';

const router = express.Router({ caseSensitive: true, strict: true });
// router.route('/').get(healthCheck);
router.get('/', healthCheck
);
export default router;