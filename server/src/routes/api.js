const express = require('express');
const router = express.Router();
const { registerUser, getAllRegistrations, deleteRegistration } = require('../controllers/registrationController');
const { adminLogin } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.post('/register', upload.single('image'), registerUser);
router.post('/admin/login', adminLogin);

// Protected routes (Admin only)
router.get('/registrations', protect, getAllRegistrations);
router.delete('/registration/:id', protect, deleteRegistration);

module.exports = router;
