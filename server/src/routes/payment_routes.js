// import express module for router
import express from 'express';

// import multer for upload configuration of payment receipt files
import multer from 'multer';

// import payment receipt controller object for payment receipt controller methods
import paymentController from '../controller/payment_controller.js';

// import jwt token middleware for user authentication
import token from '../middleware/token.js';

// get express router
const router = express.Router();

// set up multer for uploading payment receipt files
const paymentFileStorage = multer.diskStorage({
  // where the report image files will be uploaded
  destination: function (req, file, cb) {
    cb(null, './src/public/payment_images');
  },

  // filename format for report images
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const paymentFileUpload = multer({ storage: paymentFileStorage });

// route for getting all payment receipts from the database
router.get('/', token.authenticateToken, paymentController.getAllPayments);

// route for getting all payment receipts of a user from the database
router.get(
  '/:username',
  token.authenticateToken,
  paymentController.getUserPayments
);

// route for getting a specific payment receipt from the database
router.get(
  '/details/:id',
  token.authenticateToken,
  paymentController.getPayment
);

// route for adding new payment receipt to database
router.post(
  '/add/new',
  token.authenticateToken,
  paymentFileUpload.single('payment-image'),
  paymentController.addPayment
);

// route for deleting a payment receipt from the database
router.delete(
  '/delete/:id',
  token.authenticateToken,
  paymentController.deletePayment
);

export default router;
