const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Create project (managers and admins)
router.post('/', auth, role(['admin','manager']), [
  body('name').notEmpty().withMessage('name is required'),
  body('client').optional().isMongoId(),
  body('startDate').optional().isISO8601(),
  body('deadline').optional().isISO8601(),
  body('budget').optional().isNumeric(),
  body('priority').optional().isIn(['Low','Medium','High'])
], projectController.create);

// List projects with pagination & filters
router.get('/', auth, projectController.list);

// Get project details
router.get('/:id', auth, projectController.getById);

// Update project
router.put('/:id', auth, role(['admin','manager']), projectController.update);

// Update status only
router.put('/:id/status', auth, role(['admin','manager']), [
  body('status').isIn(['Pending','In Progress','Completed','On Hold','Cancelled'])
], projectController.updateStatus);

// Milestones
router.post('/:id/milestones', auth, role(['admin','manager']), [
  body('title').notEmpty().withMessage('title required')
], projectController.createMilestone);

router.put('/:id/milestones/:mid', auth, role(['admin','manager']), projectController.updateMilestone);

module.exports = router;
