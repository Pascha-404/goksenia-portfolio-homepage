const express = require('express');
const router = express.Router();

const catchAsync = require('../utilitys/catchAsync')
const {
    isLoggedIn,
    hasPermission,
    validateProject
} = require('../middleware')

const cms = require('../controllers/cms')

// route for cms index/dashboard page
router.get('/index', isLoggedIn, catchAsync(cms.index));

router.route('/add')
    .get(isLoggedIn, cms.showAddPage)
    .post(validateProject, isLoggedIn, hasPermission, catchAsync(cms.addPage))

// route for editing existing projects
router.get('/:id/edit', isLoggedIn, catchAsync(cms.showEditProject));

router.route('/:id')
    .put(validateProject, isLoggedIn, hasPermission, catchAsync(cms.editProject))
    .delete(isLoggedIn, hasPermission, catchAsync(cms.deleteProject));

module.exports = router;