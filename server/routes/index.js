const express=require('express');
const router=express.Router();
const mainController=require('../controllers/mainController');

//App Routers
router.get('/',mainController.Homepage);
router.get('/about',mainController.about);


module.exports=router