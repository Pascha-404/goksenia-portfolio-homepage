const express = require('express');
const router = express.Router();

const catchAsync = require('../utilitys/catchAsync');
const {
    isLoggedIn,
    hasPermission,
    validateProject
} = require('../middleware');

const cms = require('../controllers/cms');

const {
    storage
} = require('../cloudinary')
const multer = require('multer');
const upload = multer({
    storage
});
const uploadInput = upload.fields([{
    name: 'imgHome'
}, {
    name: 'imgProject1'
}, {
    name: 'imgProject2'
}]);


// route for cms index/dashboard page
router.get('/index', isLoggedIn, catchAsync(cms.index));

router.route('/add')
    .get(isLoggedIn, cms.showAddPage)
    .post(isLoggedIn, hasPermission, uploadInput, validateProject, catchAsync(cms.addPage))

// route for editing existing projects
router.get('/:id/edit', isLoggedIn, catchAsync(cms.showEditProject));

router.route('/:id')
    .put(isLoggedIn, hasPermission, uploadInput, validateProject, catchAsync(cms.editProject))
    .delete(isLoggedIn, hasPermission, catchAsync(cms.deleteProject));

module.exports = router;