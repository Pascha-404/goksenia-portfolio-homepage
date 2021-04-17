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
    // .post(validateProject, isLoggedIn, hasPermission, catchAsync(cms.addPage))
    .post(uploadInput, (req, res) => {
        if (req.files.imgHome) {
            const filename1 = req.files.imgHome[0].originalname;
            console.log(filename1)
        }
        if (req.files.imgProject1) {
            const filename2 = req.files.imgProject1[0].originalname;
            console.log(filename2)
        }
        if (req.files.imgProject2) {
            const filename3 = req.files.imgProject2[0].originalname;
            console.log(filename3)
        }
        res.send('Finished upload!')
    })

// route for editing existing projects
router.get('/:id/edit', isLoggedIn, catchAsync(cms.showEditProject));

router.route('/:id')
    .put(validateProject, isLoggedIn, hasPermission, catchAsync(cms.editProject))
    .delete(isLoggedIn, hasPermission, catchAsync(cms.deleteProject));

module.exports = router;