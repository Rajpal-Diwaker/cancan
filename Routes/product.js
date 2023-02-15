/*
* @Author: Ambuj Srivastava
* @Date: October 04, 2018
* @Last Modified by: Ambuj Srivastava
* @Last Modified On: 18-1-2019
*/


let express = require('express'),
    router = express.Router(),
    util = require('../Utilities/util'),
    userService = require('../Services/product');
const axios = require('axios');

var fileExtension = require('file-extension')
var crypto = require('crypto')

//****************************************************Start Multer********************************************* */
var multer = require('multer')
var fs = require('fs');

//var minSize = 1 * 1000 * 1000;
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/productImage')
    },
    filename: function (req, file, cb) {
        
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + fileExtension(file.mimetype));
        });
    }
});
let upload = multer({ storage: storage });
let cpUpload = upload.fields([{ name: 'productImage', maxCount: 10 }]);

//Promotion Storage
let storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/promotion')
    },
    filename: function (req, file, cb) {
        
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + fileExtension(file.mimetype));
        });
    }
});
let upload1 = multer({ storage: storage1 });
let promotion = upload1.fields([{ name: 'promotionImage', maxCount: 1 }]);

//style storage
let storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/style')
    },
    filename: function (req, file, cb) {
        
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + fileExtension(file.mimetype));
        });
    }
});
let upload2 = multer({ storage: storage2 });
let style = upload2.fields([{ name: 'styleImage', maxCount: 1 }]);

//typeOfCloth storage
let storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/cloth')
    },
    filename: function (req, file, cb) {
        
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + fileExtension(file.mimetype));
        });
    }
});
let upload3 = multer({ storage: storage3 });
let cloth = upload3.fields([{ name: 'clothImage', maxCount: 1 }]);

//color storage
let storage4 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/colors')
    },
    filename: function (req, file, cb) {
        
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + fileExtension(file.mimetype));
        });
    }
});
let upload4 = multer({ storage: storage4 });
let color = upload4.fields([{ name: 'colorImage', maxCount: 1 }]);

//shades storage
let storage5 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/Shades')
    },
    filename: function (req, file, cb) {
        
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + fileExtension(file.mimetype));
        });
    }
});
let upload5 = multer({ storage: storage5 });
let shades = upload5.fields([{ name: 'shadesImage', maxCount: 1 }]);

//sideLine storage
let storage6 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/sideLines')
    },
    filename: function (req, file, cb) {
        
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + fileExtension(file.mimetype));
        });
    }
});
let upload6 = multer({ storage: storage6 });
let sideLineImage = upload6.fields([{ name: 'sideLineImage', maxCount: 1 }]);

//stitching storage
let storage7 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/stitchingType')
    },
    filename: function (req, file, cb) {
        
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + fileExtension(file.mimetype));
        });
    }
});
let upload7 = multer({ storage: storage7 });
let stitchingImage = upload7.fields([{ name: 'stitchingImage', maxCount: 1 }]);

//farukh storage
let storage8 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/faruka')
    },
    filename: function (req, file, cb) {
        
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + fileExtension(file.mimetype));
        });
    }
});
let upload8 = multer({ storage: storage8 });
let farukaImage = upload8.fields([{ name: 'farukaImage', maxCount: 1 }]);

//turbosh storage
let storage9 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/tarbosh')
    },
    filename: function (req, file, cb) {
        
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + fileExtension(file.mimetype));
        });
    }
});
let upload9 = multer({ storage: storage9 });
let turboshImage = upload9.fields([{ name: 'turboshImage', maxCount: 1 }]);

//Video Tutorial
let storage10 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/video')
    },
    filename: function (req, file, cb) {
        
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + fileExtension(file.mimetype));
        });
    }
});
let upload10 = multer({ storage: storage10 });
let videoTutorial = upload10.fields([{ name: 'videoTutorial', maxCount: 1 }]);



//*************************************************END************************************************************ */

//Add product 
router.post('/addProduct', cpUpload,(req, res) => {
    userService.addProduct(req.body, req.files, (data) => {
        res.send(data);
    });
});

//Get product details
router.post('/getProduct', (req, res) => {
    userService.getProduct(req.body, (data) => {
        res.send(data);
    });
});

//Get All product details
router.get('/getAllProducts', (req, res) => {
    userService.getAllProduct(req.query, (data) => {
        res.send(data);
    });
});

//Get sort product
router.post('/getSortProduct', (req, res) => {
    userService.getAllSortProduct(req.body, (data) => {
        res.send(data);
    });
});


//Home API For All Product
router.get('/getHomeDetails', (req, res) => {
    userService.getHomeDetails(req.query, (data) => {
        res.send(data);
    });
});

//Add new product
router.post('/addNewOffer', cpUpload,(req, res) => {
    userService.addOfferOnProduct(req.body, req.files, (data) => {
        res.send(data);
    });
});

//Add promotion
router.post('/addPromotion', promotion,(req, res) => {
    userService.addPromotion(req.body, req.files, (data) => {
        res.send(data);
    });
});

router.post('/editPromotion', promotion,(req, res) => {
    userService.editPromotion(req.body, req.files, (data) => {
        res.send(data);
    });
});

router.post('/editProductAdmin', cpUpload,(req, res) => {
    console.log("kamalal");
    
    userService.editProductAdmin(req.body, req.files, (data) => {
        res.send(data);
    });
});


//*************************************Faberic DAO****************************/

//Add Style
router.post('/addstyle', style,(req, res) => {
    userService.addstyle(req.body, req.files, (data) => {
        res.send(data);
    });
});

//Edit Style
router.post('/editStyle', style,(req, res) => {
    userService.editstyle(req.body, req.files, (data) => {
        res.send(data);
    });
});


//Add cloth types
router.post('/addCloth', cloth,(req, res) => {
    userService.addCloth(req.body, req.files, (data) => {
        res.send(data);
    });
});

//Edit cloth types
router.post('/editCloth', cloth,(req, res) => {
    userService.editCloth(req.body, req.files, (data) => {
        res.send(data);
    });
});

//Add color
router.post('/addColors', color,(req, res) => {
    userService.addColors(req.body, req.files, (data) => {
        res.send(data);
    });
});

//Edit color
router.post('/editColor', color,(req, res) => {
    userService.editColors(req.body, req.files, (data) => {
        res.send(data);
    });
});

//Add shade
router.post('/addShade', shades,(req, res) => {
    userService.addShade(req.body, req.files, (data) => {
        res.send(data);
    });
});

//Edit shade
router.post('/editShade', shades,(req, res) => {
    userService.editShade(req.body, req.files, (data) => {
        res.send(data);
    });
});

//Add side line
router.post('/addSideLine', sideLineImage,(req, res) => {
    userService.addSideLine(req.body, req.files, (data) => {
        res.send(data);
    });
});

//Edit side line
router.post('/editSideLine', sideLineImage,(req, res) => {
    userService.editSideLine(req.body, req.files, (data) => {
        res.send(data);
    });
});

//Add stitching
router.post('/addStitching', stitchingImage,(req, res) => {
    userService.addStitching(req.body, req.files, (data) => {
        res.send(data);
    });
});

//edit stitching
router.post('/editStitching', stitchingImage,(req, res) => {
    userService.editStitching(req.body, req.files, (data) => {
        res.send(data);
    });
});

//Add faruka
router.post('/addFaruka', farukaImage,(req, res) => {
    userService.addFaruka(req.body, req.files, (data) => {
        res.send(data);
    });
});

//Edit faruka
router.post('/editFaruka', farukaImage,(req, res) => {
    userService.editFaruka(req.body, req.files, (data) => {
        res.send(data);
    });
});

//Add tarbosh
router.post('/addTarbosh', turboshImage,(req, res) => {
    userService.addTarbosh(req.body, req.files, (data) => {
        res.send(data);
    });
});

//Edit tarbosh
router.post('/editTarbosh', turboshImage,(req, res) => {
    userService.editTarbosh(req.body, req.files, (data) => {
        res.send(data);
    });
});

//get fabric data
router.post('/getfabric',(req, res) => {
    userService.getfabric(req.body, (data) => {
        res.send(data);
    });
});

//Add fitting
router.post('/addFitting',(req, res) => {
    userService.addFitting(req.body, (data) => {
        res.send(data);
    });
});

//Edit Fitting
router.post('/editFitting',(req, res) => {
    userService.editFitting(req.body, (data) => {
        res.send(data);
    });
});



//*******************************************************End*********************************** */

//Add custom kandora
router.post('/addCustomKandora', (req, res) => {
    userService.addFabric(req.body, (data) => {
        res.send(data);
    });
});

//Get custom kandora
router.post('/getCustomKandora', (req, res) => {
    userService.getCustomKandora(req.body, (data) => {
        res.send(data);
    });
});

//fabric
router.post('/getfabrics', (req, res) => {
    userService.getfabrics(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getAllCustomKandora', (req, res) => {
    userService.getAllCustomKandora(req.body, (data) => {
        res.send(data);
    });
});

/**************************************Add custom Kandora*********************************/
//Add custom kandora
router.post('/addCustomDetails',(req, res) => {
    userService.addCustomKandora(req.body, (data) => {
        res.send(data);
    });
});


router.post('/addStandardCustomKandora',(req, res) => {
    userService.addStandardCustomKandora(req.body, (data) => {
        res.send(data);
    });
});
/**********************************Remove****************************** */

router.post('/removeCloth', (req, res) => {
    userService.removeCloth(req.body, (data) => {
        res.send(data);
    });
});

router.post('/removeColor', (req, res) => {
    userService.removeColor(req.body, (data) => {
        res.send(data);
    });
});

router.post('/removeFaruka', (req, res) => {
    userService.removeFaruka(req.body, (data) => {
        res.send(data);
    });
});

router.post('/removeShades', (req, res) => {
    userService.removeShades(req.body, (data) => {
        res.send(data);
    });
});

router.post('/removeSideLines', (req, res) => {
    userService.removeSideLines(req.body, (data) => {
        res.send(data);
    });
});

router.post('/removeStitchingType', (req, res) => {
    userService.removeStitchingType(req.body, (data) => {
        res.send(data);
    });
});

router.post('/removeStyle', (req, res) => {
    userService.removeStyle(req.body, (data) => {
        res.send(data);
    });
});

router.post('/removeTarbosh', (req, res) => {
    userService.removeTarbosh(req.body, (data) => {
        res.send(data);
    });
});

router.post('/removeFitting', (req, res) => {
    userService.removeFitting(req.body, (data) => {
        res.send(data);
    });
});

router.post('/removeProduct', (req, res) => {
    userService.removeFitting(req.body, (data) => {
        res.send(data);
    });
});
/****************************************/

router.post('/getAllOffer', (req, res) => {
    userService.getAllOffer(req.body, (data) => {
        res.send(data);
    });
});

router.post('/removeOffer', (req, res) => {
    userService.removeOffer(req.body, (data) => {
        res.send(data);
    });
});
/****************************************/

router.post('/getClothData', (req, res) => {
    userService.getClothData(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getStyleAdmin', (req, res) => {
    userService.getStyleAdmin(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getColorAdmin', (req, res) => {
    userService.getColorAdmin(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getShadeAdmin', (req, res) => {
    userService.getShadeAdmin(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getSideLineAdmin', (req, res) => {
    userService.getSideLineAdmin(req.body, (data) => {
        res.send(data);
    });
});


router.post('/getStitchingAdmin', (req, res) => {
    userService.getStitchingAdmin(req.body, (data) => {
        res.send(data);
    });
});


router.post('/getFarukaAdmin', (req, res) => {
    userService.getFarukaAdmin(req.body, (data) => {
        res.send(data);
    });
});


router.post('/getTarboshAdmin', (req, res) => {
    userService.getTarboshAdmin(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getFittingAdmin', (req, res) => {
    userService.getFittingAdmin(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getAllProductAdmin', (req, res) => {
    userService.getAllProductAdmin(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getProductForAdmin', (req, res) => {
    userService.getProductForAdmin(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getAllBanner', (req, res) => {
    userService.getAllBanner(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getBannerById', (req, res) => {
    userService.getBannerById(req.body, (data) => {
        res.send(data);
    });
});
/****************************************************************************/
router.post('/addCart', (req, res) => {
    userService.addCart(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getCart', (req, res) => {
    userService.getCartDetails(req.body, (data) => {
        res.send(data);
    });
});

router.post('/updateUserKeyInCart', (req, res) => {
    userService.updateUserKeyInCart(req.body, (data) => {
        res.send(data);
    });
});

router.post('/removeCart', (req, res) => {
    userService.removeCart(req.body, (data) => {
        res.send(data);
    });
});

router.post('/updateQuantity', (req, res) => {
    userService.updateQuantity(req.body, (data) => {
        res.send(data);
    });
});
/*********************************************************************** */
router.post('/addCardDetail', (req, res) => {
    userService.addCardDetail(req.body, (data) => {
        res.send(data);
    });
});

router.post('/addMeasurement', (req, res) => {
    userService.addMeasurement(req.body, (data) => {
        res.send(data);
    });
});

router.post('/addMTransaction', (req, res) => {
    userService.addMTransaction(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getMeasurement', (req, res) => {
    userService.getMeasurement(req.body, (data) => {
        res.send(data);
    });
});

router.post('/checkMPayment', (req, res) => {
    userService.checkMPayment(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getFreeMeasurement', (req, res) => {
    userService.getFreeMeasurement(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getPaidMeasurement', (req, res) => {
    userService.getPaidMeasurement(req.body, (data) => {
        res.send(data);
    });
});

router.post('/updateIsSelected', (req, res) => {
    userService.updateIsSelected(req.body, (data) => {
        res.send(data);
    });
});

router.post('/removeMeasurement', (req, res) => {
    userService.removeMeasurement(req.body, (data) => {
        res.send(data);
    });
});

router.post('/viewMeasurement', (req, res) => {
    userService.viewMeasurement(req.body, (data) => {
        res.send(data);
    });
});

/****************************Check Out*********************** */
router.post('/addCheckOut', (req, res) => {
    userService.addCheckOut(req.body, (data) => {
        res.send(data);
    });
});

router.post('/checkOut', (req, res) => {
    userService.checkOut(req.body, (data) => {
        res.send(data);
    });
});

/******************************************** */
router.post('/addOrder', (req, res) => {
    userService.addOrder(req.body, (data) => {
        res.send(data);
    });
});


router.post('/getOrderDetails', (req, res) => {
    userService.getOrderList(req.body, (data) => {
        res.send(data);
    });
});

/***************************************************************/
router.post('/getSendNotification', (req, res) => {
    userService.getSendNotification(req.body, (data) => {
        res.send(data);
    });
});


router.post('/getNotificationList', (req, res) => {
    userService.getNotificationList(req.body, (data) => {
        res.send(data);
    });
});

router.post('/addVideoTutorial', videoTutorial,(req, res) => {
    userService.addVideoTutorial(req.body, req.files, (data) => {
        res.send(data);
    });
});


router.post('/getVideoLink', (req, res) => {
    userService.getVideoLink(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getAllVideoLink', (req, res) => {
    userService.getAllVideoLink(req.body, (data) => {
        res.send(data);
    });
});


router.post('/addFAQ', (req, res) => {
    userService.addFAQ(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getFAQ', (req, res) => {
    userService.getFAQ(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getFAQAdmin', (req, res) => {
    userService.getFAQAdmin(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getOrderNumber', (req, res) => {
    userService.getOrderNumber(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getOrderRecieved', (req, res) => {
    userService.getOrderRecieved(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getOrderShipped', (req, res) => {
    userService.getOrderShipped(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getOrderDelivered', (req, res) => {
    userService.getOrderDelivered(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getOrderDeliveredHistory', (req, res) => {
    userService.getOrderDeliveredHistory(req.body, (data) => {
        res.send(data);
    });
});


router.post('/getOrderListForUser', (req, res) => {
    userService.getOrderListForUser(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getOrderDetailForUser', (req, res) => {
    userService.getOrderDetailForUser(req.body, (data) => {
        res.send(data);
    });
});


router.post('/removeOrderNumber', (req, res) => {
    userService.removeOrderNumber(req.body, (data) => {
        res.send(data);
    });
});


router.post('/addTransaction', (req, res) => {
    userService.addTransaction(req.body, (data) => {
        res.send(data);
    });
});

router.post('/updateOrderPackingStatus', (req, res) => {
    userService.updateOrderPackingStatus(req.body, (data) => {
        res.send(data);
    });
});


router.post('/updateOrderShippedStatus', (req, res) => {
    userService.updateOrderShippedStatus(req.body, (data) => {
        res.send(data);
    });
});

router.post('/updateOrderDeliveredStatus', (req, res) => {
    userService.updateOrderDeliveredStatus(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getOrderTransaction', (req, res) => {
    userService.getOrderTransaction(req.body, (data) => {
        res.send(data);
    });
});

router.post('/filterProduct', (req, res) => {
    userService.getFilterByPrice(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getMeasurementPriceHistory', (req, res) => {
    userService.getMeasurementPriceHistory(req.body, (data) => {
        res.send(data);
    });
});

router.post('/addMeasurementPriceHistory', (req, res) => {
    userService.addMeasurementPriceHistory(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getMeasurementPrice', (req, res) => {
    userService.getMeasurementHistoryForUser(req.body, (data) => {
        res.send(data);
    });
});

router.post('/removePromotion', (req, res) => {
    userService.removePromotion(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getRevenue', (req, res) => {
    userService.getRevenue(req.body, (data) => {
        res.send(data);
    });
});
module.exports = router;