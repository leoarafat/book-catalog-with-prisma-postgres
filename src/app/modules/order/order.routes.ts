import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();
router.post('/create-order', auth(ENUM_USER_ROLE.CUSTOMER));
export const OrderRoutes = router;
