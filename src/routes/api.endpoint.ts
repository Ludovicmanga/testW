import express from 'express'
import { handleProcessed } from '../controller/api.endpoint.controller';
const router = express.Router();

router.post("/processed", handleProcessed);

export default router;