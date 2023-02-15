/*
* @Author: Ambuj Srivastava
* @Date: May 22 2019
* @Last Modified by: Ambuj Srivastava
* @Last Modified On: may 22 2019
*/

let async = require('async'),
    queryString = require('querystring');

let util = require('../Utilities/util'),
    userDAO = require('../DAO/productDAO');
COMMON = require('../Services/common/common');

// var Client = require('node-rest-client').Client;
// var client = new Client();

var accountSid = 'AC07270c1cdbc91ac350f3c1834dbed6f7'; // Your Account SID from www.twilio.com/console
var authToken = '23406d50b076203fe76873683a167e34';   // Your Auth Token from www.twilio.com/console
const client = require('twilio')(accountSid, authToken);




//Add product 
let addProduct = (data, files, callback) => {
    console.log(data, files, "Ambuj")
    async.auto({
        addProductInDB: (cb) => {
            if (!data.productName) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }

            var dataToSet = {
                "productName": data.productName,
                "productNameAR": data.productNameAR ? data.productNameAR : '',
                "productTitle": data.productTitle ? data.productTitle : '',
                "productTitleAR": data.productTitleAR ? data.productTitleAR : '',
                "productDescription": data.productDescription ? data.productDescription : '',
                "productDescriptionAR": data.productDescriptionAR ? data.productDescriptionAR : '',
                "productPrice": data.productPrice ? data.productPrice : '',
                "productType": data.productType ? data.productType : '',
                "style": data.style ? data.style : '',
                "typeOfCloth": data.typeOfCloth ? data.typeOfCloth : '',
                "color": data.color ? data.color : '',
                "shades": data.shades ? data.shades : '',
                "sideLine": data.sideLine ? data.sideLine : '',
                "stitchingType": data.stitchingType ? data.stitchingType : '',
                "faruka": data.faruka ? data.faruka : '',
                "turbosh": data.turbosh ? data.turbosh : '',
                "fitting": data.fitting ? data.fitting : '',
                "productType": data.productType ? data.productType : "Standard Kandora"
            }

            userDAO.addProduct(dataToSet, async (err, dbData) => {

                for (i = 0; i < files.productImage.length; i++) {
                    var dataToSet2 = {
                        "productId": dbData.insertId,
                        "productImage": files.productImage[i].filename
                    }
                    await userDAO.addProductImage(dataToSet2, (err, dbData) => { })
                }
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.PRODUCTADD[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.addProductInDB);
    })


}

//Get all product
let getAllProduct = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            // var criteria ={
            //     userId : data.userId
            // }
            userDAO.getAllProduct((err, dbData) => {

                dbData.forEach(element => {
                    element.productImage = util.productUrl() + 'productImage/' + element.productImage
                })
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                } if (data.lang == 'ar') {
                    dbData.forEach(element => {
                        element.productName = element.productNameAR; delete element.productNameAR;
                        element.productTitle = element.productTitleAR; delete element.productTitleAR;
                        element.productDescription = element.productDescriptionAR; delete element.productDescriptionAR;

                    });
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
                } else {
                    dbData.forEach(element => {
                        element.productName = element.productName;
                        element.productTitle = element.productTitle;
                        element.productDescription = element.productDescription;


                        element.productNameAR; delete element.productNameAR;
                        element.productTitleAR; delete element.productTitleAR;
                        element.productDescriptionAR; delete element.productDescriptionAR;

                    });
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
                }

            })
        },

    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
}

//Get product by Admin
let getAllProductAdmin = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            userDAO.getAllProductAdmin((err, dbData) => {
                console.log(dbData, "kamal sharma");

                dbData.forEach(element => {
                    element.productImage = util.productUrl() + 'productImage/' + element.productImage
                })
                console.log(dbData, err, "opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
            })
        },

    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
}

// product sorting API
let getAllSortProduct = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            if (data.productSort == 'HighToLow') {
                userDAO.getHighToLowProduct((err, dbData) => {

                    dbData.forEach(element => {
                        element.productImage = util.productUrl() + 'productImage/' + element.productImage
                    })
                    console.log(dbData, err, "opo")
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                    }
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
                })
            }
            if (data.productSort == 'LowToHigh') {
                userDAO.getLowT0HighProduct((err, dbData) => {

                    dbData.forEach(element => {
                        element.productImage = util.productUrl() + 'productImage/' + element.productImage
                    })
                    console.log(dbData, err, "opo")
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                    }
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
                })
            } else {
                return;
            }
        },

    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
}

// product Image use in get product
let productImage = (criteria, cb) => {
    userDAO.getProductImage(criteria, (err, dbSubData) => {
        console.log(err,"post image data");
        
        if (err) {
            cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR })
        }
        cb(null, dbSubData);
    })
}

// product details use in get product
let productDetail = (criteria, cb) => {
    userDAO.getProduct(criteria, (err, dbSubData) => {
        console.log(err,"pasiiiiiiiiiiiiiiiiiiiiiii")
        if (err) {
            cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR })
        }
        cb(null, dbSubData);
    })
}

//get product details
let getProduct = (data, callback) => {
    async.parallel({
        productDetail: (cb) => {
            var criteria = {
                productId: data.productId,
                userId: data.userId ? data.userId : '0'
            }
            productDetail(criteria, (err, response) => {
                // console.log(response, "post...................")
                cb(null, response);
            });
        },
        Image: (cb) => {
            var criteria = {
                productId: data.productId,
            }
            productImage(criteria, (err, response) => {

                cb(null, response);
            });
        },

    }, (err, response) => {
        console.log(response, "post.......final.........")
        let res1 = {};
        if (data.lang == 'ar') {
            let {
                productId,
                productName,
                productNameAR,
                productTitle,
                productTitleAR,
                productDescription,
                productDescriptionAR,
                productPrice,
                productType,
                styleId,
                StyleTitle,
                StyleTitleAR,
                clothId,
                typeOfClothTitle,
                typeOfClothTitleAR,
                colorId,
                colorTitle,
                colorTitleAR,
                shadeId,
                shadesTitle,
                shadesTitleAR,
                lineId,
                SideLineTitle,
                SideLineTitleAR,
                stitchingId,
                StitchingTypeTitle,
                StitchingTypeTitleAR,
                farukaId,
                farukaTitle,
                farukaTitleAR,
                tarboshId,
                tarboshTitle,
                tarboshTitleAR,
                fittingId,
                fittingTitle,
                fittingTitleAR,
                status,
                TotalAmount } = response.productDetail[0]

            productName = productNameAR
            productTitle = productTitleAR
            productDescription = productDescriptionAR
            StyleTitle = StyleTitleAR
            typeOfClothTitle = typeOfClothTitleAR

            res1.productDetail = {
                productId,
                productName,
                productNameAR,
                productTitle,
                productTitleAR,
                productDescription,
                productDescriptionAR,
                productPrice,
                productType,
                status,
                TotalAmount,
                style: {
                    id: styleId ? styleId : '',
                    name: StyleTitle ? StyleTitleAR : ''
                },
                cloth: {
                    id: clothId ? clothId : '',
                    name: typeOfClothTitle ? typeOfClothTitleAR : ''
                },
                color: {
                    id: colorId ? colorId : '',
                    name: colorTitle ? colorTitleAR : ''
                },
                shade: {
                    id: shadeId ? shadeId : '',
                    name: shadesTitle ? shadesTitleAR : ''
                },
                line: {
                    id: lineId ? lineId : '',
                    name: SideLineTitle ? SideLineTitleAR : ''
                },
                stitching: {
                    id: stitchingId ? stitchingId : '',
                    name: StitchingTypeTitle ? StitchingTypeTitleAR : ''
                },
                faruka: {
                    id: farukaId ? farukaId : '',
                    name: farukaTitle ? farukaTitleAR : ''
                },
                tarbosh: {
                    id: tarboshId ? tarboshId : '',
                    name: tarboshTitle ? tarboshTitleAR : ''
                },
                fitting: {
                    id: fittingId ? fittingId : '',
                    name: fittingTitle ? fittingTitleAR : ''
                },

            }

            delete res1.productDetail.productNameAR
            delete res1.productDetail.productTitleAR
            delete res1.productDetail.productDescriptionAR
            delete res1.productDetail.StyleTitleAR
            delete res1.productDetail.typeOfClothTitleAR

            delete res1.productDetail.colorTitleAR
            delete res1.productDetail.shadesTitleAR
            delete res1.productDetail.SideLineTitleAR
            delete res1.productDetail.StitchingTypeTitleAR
            delete res1.productDetail.farukaTitleAR
            delete res1.productDetail.tarboshTitleAR
            delete res1.productDetail.fittingTitleAR


            response.Image.forEach(element => {
                element.productImage = util.productUrl() + 'productImage/' + element.productImage
            });

            res1.productImage = response.Image;

            callback({ "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_FATCH[data.lang], "result": res1 });
        } else {
            const {
                productId,
                productName,
                productTitle,
                productDescription,
                productPrice,
                productType,
                styleId,
                StyleTitle,
                clothId,
                typeOfClothTitle,
                colorId,
                colorTitle,
                shadeId,
                shadesTitle,
                lineId,
                SideLineTitle,
                stitchingId,
                StitchingTypeTitle,
                farukaId,
                farukaTitle,
                tarboshId,
                tarboshTitle,
                fittingId,
                fittingTitle,
                status,
                TotalAmount } = response.productDetail[0]


            res1.productDetail = {
                productId,
                productName,
                productTitle,
                productDescription,
                productPrice,
                productType,
                status,
                TotalAmount,
                style: {
                    id: styleId ? styleId : '',
                    name: StyleTitle ? StyleTitle : ''
                },
                cloth: {
                    id: clothId ? clothId : '',
                    name: typeOfClothTitle ? typeOfClothTitle : ''
                },
                color: {
                    id: colorId ? colorId : '',
                    name: colorTitle ? colorTitle : ''
                },
                shade: {
                    id: shadeId ? shadeId : '',
                    name: shadesTitle ? shadesTitle : ''
                },
                line: {
                    id: lineId ? lineId : '',
                    name: SideLineTitle ? SideLineTitle : ''
                },
                stitching: {
                    id: stitchingId ? stitchingId : '',
                    name: StitchingTypeTitle ? StitchingTypeTitle : ''
                },
                faruka: {
                    id: farukaId ? farukaId : '',
                    name: farukaTitle ? farukaTitle : ''
                },
                tarbosh: {
                    id: tarboshId ? tarboshId : '',
                    name: tarboshTitle ? tarboshTitle : ''
                },
                fitting: {
                    id: fittingId ? fittingId : '',
                    name: fittingTitle ? fittingTitle : ''
                },
            }

            response.Image.forEach(element => {
                element.productImage = util.productUrl() + 'productImage/' + element.productImage
            });

            res1.productImage = response.Image;

            callback({ "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_FATCH[data.lang], "result": res1 });
        }
    }),
        (err) => {
            callback(err);
        }
}

//Create Offer || Admin offer
let addOfferOnProduct = (data, files, callback) => {
    console.log(files, "Ambuj")
    async.auto({
        addProductInDB: (cb) => {
            if (!data.productId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                "productId": data.productId,
            }
            var dataToSet = {
                "productId": data.productId,
                "offerTitle": data.offerTitle ? data.offerTitle : '',
                "offerTitleAR": data.offerTitleAR ? data.offerTitleAR : '',
                "offerDescription": data.offerDescription ? data.offerDescription : '',
                "offerDescriptionAR": data.offerDescriptionAR ? data.offerDescriptionAR : '',

            }
            userDAO.getProductForAdmin(criteria, (err, dbData) => {
                if (dbData && dbData.length) {
                    userDAO.addOffer(dataToSet, (err, dbData) => {
                        console.log(err, "Ambuj.............")
                        if (err) {
                            cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                        }
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dataToSet });
                    })
                } else {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": "Please enter correct productId" });
                }
            })
        },

    }, (err, response) => {
        callback(response.addProductInDB);
    })


}

//ADD Promotion
let addPromotion = (data, files, callback) => {
    console.log(files, "Ambuj")
    async.auto({
        addProductInDB: (cb) => {
            if (!data.promotionTitle) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }

            var dataToSet = {
                "productId": 0,
                "promotionTitle": data.promotionTitle ? data.promotionTitle : '',
                "promotionTitleAR": data.promotionTitleAR ? data.promotionTitleAR : '',
                "promotionImage": files.promotionImage[0].filename,
            }
            userDAO.addPromotion(dataToSet, (err, dbData) => {
                console.log(err, "post........................")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.addProductInDB);
    })


}

//Edit Promotion Banner By Admin
let editPromotion = (data, files, callback) => {
    async.auto({
        editDataInDB: (cb) => {
            if (!data.promotionTitle) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                "promotionId": data.promotionId,
            }
            var dataToSet = {
                "promotionTitle": data.promotionTitle ? data.promotionTitle : '',
                "promotionTitleAR": data.promotionTitleAR ? data.promotionTitleAR : '',


            }
            if (files.promotionImage != undefined) {
                dataToSet.promotionImage = files.promotionImage[0].filename
            }
            userDAO.editPromotion(criteria, dataToSet, (err, dbData) => {
                console.log(err, "podt")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_EDIT[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.editDataInDB);
    })
}

// product Image use in get product
let productImageAdmin = (criteria, cb) => {
    userDAO.getProductImageForAdmin(criteria, (err, dbSubData) => {
        if (err) {
            cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
        }
        cb(null, dbSubData);
    })
}

// product details use in get product
let productDetailAdmin = (criteria, cb) => {
    userDAO.getProductForAdmin(criteria, (err, dbSubData) => {
        console.log(err, "Ambuj")
        if (err) {
            cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
        }
        cb(null, dbSubData);
    })
}

//get product details
let getProductForAdmin = (data, callback) => {
    async.parallel({
        productDetail: (cb) => {
            var criteria = {
                productId: data.productId
            }
            productDetailAdmin(criteria, (err, response) => {
                cb(null, response);
            });
        },
        Image: (cb) => {
            var criteria = {
                productId: data.productId,
            }
            productImageAdmin(criteria, (err, response) => {

                cb(null, response);
            });
        },

    }, (err, response) => {
        console.log(response, "post................")
        let res1 = {};

        //let url = 'http://13.126.131.184:9898/media/productImage/';

        response.Image.forEach(element => {
            element.productImage = util.productUrl() + 'productImage/' + element.productImage
        });
        res1.productDetails = response.productDetail[0];

        res1.productImage = response.Image;

        callback({ "statusCode": util.statusCode.OK, "statusMessage": "User data fetch successfully", "result": res1 });
        //   }
    }),
        (err) => {
            callback(err);
        }
}

//update product by admin
let editProductAdmin = (data, files, callback) => {
    console.log(data.productId, "kamalalalallalalalal");

    console.log(files, data, "post")
    async.auto({
        editDataInDB: (cb) => {
            if (!data.productId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                "productId": data.productId,
            }
            var dataToSet = {
                "productName": data.productName ? data.productName : '',
                "productTitle": data.productTitle ? data.productTitle : '',
                "productDescription": data.productDescription ? data.productDescription : '',
                "productPrice": data.productPrice ? data.productPrice : '',
                "style": data.styleId ? data.styleId : '',
                "typeOfCloth": data.clothId ? data.clothId : '',
                "color": data.colorId ? data.colorId : '',
                "shades": data.shadeId ? data.shadeId : '',
                "sideLine": data.lineId ? data.lineId : '',
                "stitchingType": data.stitchingId ? data.stitchingId : '',
                "faruka": data.farukaId ? data.farukaId : '',
                "turbosh": data.tarboshId ? data.tarboshId : '',
                "fitting" : data.fittingId ? data.fittingId :'' 
            }
            userDAO.editProductAdmin(criteria, dataToSet, (err, dbData) => {
                console.log(err, "ambuj")
                if (err) {
                    console.log(err, "errorrrrrrrrrrrrrrrr");

                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                if (files.productImage != undefined) {
                    var data_array = JSON.parse(data.imageId);
                    console.log(data_array, "kkkkamal");

                    var images_array = files.productImage;

                    for (i = 0; i < files.productImage.length; i++) {
                        var criteria = {
                            imageId: data_array[i]
                        }
                        var dataToSet1 = {
                            "productImage": images_array[i].filename
                        }
                        userDAO.editProductImageAdmin(criteria, dataToSet1, (err, dbData) => { })
                    }
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_EDIT[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.editDataInDB);
    })
}

//Get All Banner
let getAllBanner = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        getBannerData: (cb) => {
            userDAO.getBannerAdmin((err, dbData) => {
                console.log(err, "Ambuj")
                dbData.forEach(element => {
                    element.promotionImage = util.productUrl() + 'promotion/' + element.promotionImage
                })
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_FATCH[data.lang], result: dbData });
            })
        },
    }, (err, response) => {
        callback(response.getBannerData);
    })
}

//Get Banner by Id
let getBannerById = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        getBannerData: (cb) => {
            var criteria = {
                promotionId: data.promotionId
            }
            userDAO.getBannerById(criteria, (err, dbData) => {
                console.log(dbData, "Ambuj")
                dbData.forEach(element => {
                    element.promotionImage = util.productUrl() + 'promotion/' + element.promotionImage
                })
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_FATCH[data.lang], result: dbData[0] });
            })
        },
    }, (err, response) => {
        callback(response.getBannerData);
    })
}

//**************************************HOME**************************************************** */

// promotion data 
let promotionList = (cb) => {
    userDAO.promotion((err, dbSubData) => {
        if (err) {
            cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
        }
        cb(null, dbSubData);
    })
}

// product Image use in get product
let productList = (cb) => {
    userDAO.getAllProducts((err, dbSubData) => {
        if (err) {
            console.log(err, "kamal");

            cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
        }
        cb(null, dbSubData);
    })
}

// product details use in get product
let productOffer = (cb) => {
    userDAO.getAllOffer((err, dbSubData) => {
        if (err) {
            cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
        }
        cb(null, dbSubData);
    })
}

//Deshbord API For all 
let getHomeDetails = (data, callback) => {
    console.log(data, "post")
    async.parallel({
        promotion: (cb) => {
            promotionList((err, response) => {
                cb(null, response);
            })
        },
        productListData: (cb) => {
            // var criteria = {
            //     productId: data.productId
            // }
            productList((err, response) => {
                // console.log(response,"post")
                cb(null, response);
            });
        },

        Offer: (cb) => {
            // var criteria = {
            //     productId: data.productId,
            // }
            productOffer((err, response) => {

                cb(null, response);
            });
        },

    }, (err, response) => {
        let res1 = {};

        if (data.lang == 'ar') {
            res1.productListData = response.productListData;
            res1.productOffer = response.Offer;
            res1.promotion = response.promotion;
            res1.productUrl = util.productUrl() + 'productImage/';
            res1.promotionUrl = util.promotionUrl() + 'promotion/';

            response.promotion.forEach(element => {
                element.promotionTitle = element.promotionTitleAR; delete element.promotionTitleAR;
            });
            response.Offer.forEach(element => {
                element.offerTitle = element.offerTitleAR; delete element.offerTitleAR;
                element.offerDescription = element.offerDescriptionAR; delete element.offerDescriptionAR;

                element.productName = element.productNameAR; delete element.productNameAR;
                element.productTitle = element.productTitleAR; delete element.productTitleAR;
                element.productDescription = element.productDescriptionAR; delete element.productDescriptionAR;
            });
            response.productListData.forEach(element => {
                element.productName = element.productNameAR; delete element.productNameAR;
                element.productTitle = element.productTitleAR; delete element.productTitleAR;
                element.productDescription = element.productDescriptionAR; delete element.productDescriptionAR;

            });
            callback({ "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_FATCH[data.lang], "result": res1 });

        } else {
            res1.productListData = response.productListData;
            res1.productOffer = response.Offer;
            res1.promotion = response.promotion;
            res1.productUrl = util.productUrl() + 'productImage/';
            res1.promotionUrl = util.promotionUrl() + 'promotion/';

            response.Offer.forEach(element => {
                element.offerTitle = element.offerTitle;
                element.offerTitleAR; delete element.offerTitleAR;

                element.offerDescription = element.offerDescription;
                element.offerDescriptionAR; delete element.offerDescriptionAR;

                element.productNameAR = element.productNameAR; delete element.productNameAR
                element.productTitleAR = element.productTitleAR; delete element.productTitleAR
                element.productDescriptionAR = element.productDescriptionAR; delete element.productDescriptionAR
            });

            response.promotion.forEach(element => {
                element.promotionTitle = element.promotionTitle
                element.promotionTitleAR; delete element.promotionTitleAR;
            });
            response.productListData.forEach(element => {
                element.productNameAR = element.productNameAR; delete element.productNameAR
                element.productTitleAR = element.productTitleAR; delete element.productTitleAR
                element.productDescriptionAR = element.productDescriptionAR; delete element.productDescriptionAR
            });
            callback({ "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_FATCH[data.lang], "result": res1 });

        }

    }),
        (err) => {
            callback(err);
        }

}

//*******************************************END**************************************************/

//**************************************Select febric prefrence API*****************************/

//************************************ADD AND EDIT*****************************************************/
//Add style
let addstyle = (data, files, callback) => {
    async.auto({
        addProductInDB: (cb) => {
            if (!data.styleDescription) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }

            var dataToSet = {
                "StyleTitle": data.StyleTitle ? data.StyleTitle : '',
                "styleDescription": data.styleDescription ? data.styleDescription : '',
                "StyleTitleAR": data.StyleTitleAR ? data.StyleTitleAR : '',
                "styleDescriptionAR": data.styleDescriptionAR ? data.styleDescriptionAR : '',
                "styleImage": files.styleImage[0].filename,
                "price": data.price ? data.price : ''
            }
            userDAO.addStyle(dataToSet, (err, dbData) => {
                console.log(err, "Ambuj")

                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.addProductInDB);
    })
}
//Edit Style
let editstyle = (data, files, callback) => {
    async.auto({
        editDataInDB: (cb) => {
            if (!data.styleDescription) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                "styleId": data.styleId,
            }
            var dataToSet = {
                "StyleTitle": data.StyleTitle ? data.StyleTitle : '',
                "price": data.price ? data.price : '',
                "styleDescription": data.styleDescription ? data.styleDescription : '',
                "StyleTitleAR": data.StyleTitleAR ? data.StyleTitleAR : '',
                "styleDescriptionAR": data.styleDescriptionAR ? data.styleDescriptionAR : '',
                "price": data.price ? data.price : ''
            }
            if (files.styleImage != undefined) {
                console.log("akamalmbuj");

                dataToSet.styleImage = files.styleImage[0].filename
            }
            userDAO.editStyle(criteria, dataToSet, (err, dbData) => {
                console.log(err, dbData, "Ambuj.........................")

                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_EDIT[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.editDataInDB);
    })
}

//Add cloth
let addCloth = (data, files, callback) => {
    console.log(data, "kamal")
    async.auto({
        addProductInDB: (cb) => {
            if (!data.clothDescription && !data.typeOfClothTitle) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }

            var dataToSet = {
                "typeOfClothTitle": data.typeOfClothTitle ? data.typeOfClothTitle : '',
                "typeOfClothTitleAR": data.typeOfClothTitleAR ? data.typeOfClothTitleAR : '',

                "price": data.price ? data.price : '',
                "clothDescription": data.clothDescription ? data.clothDescription : '',
                "clothDescriptionAR": data.clothDescriptionAR ? data.clothDescriptionAR : '',

                "clothImage": files.clothImage[0].filename,
                "price": data.price ? data.price : ''

            }
            userDAO.addCloth(dataToSet, (err, dbData) => {
                console.log(err, "Ambuj")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.addProductInDB);
    })
}

//Edit cloth
let editCloth = (data, files, callback) => {
    console.log(data, "kamal sharma")
    async.auto({
        editDataInDB: (cb) => {
            if (!data.clothDescription && !data.typeOfClothTitle) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                "clothId": data.clothId
            }
            var dataToSet = {
                "typeOfClothTitle": data.typeOfClothTitle ? data.typeOfClothTitle : '',
                "typeOfClothTitleAR": data.typeOfClothTitleAR ? data.typeOfClothTitleAR : '',

                "price": data.price ? data.price : '',
                "clothDescription": data.clothDescription ? data.clothDescription : '',
                "clothDescriptionAR": data.clothDescriptionAR ? data.clothDescriptionAR : '',

                "price": data.price ? data.price : ''
            }
            if (files.clothImage != undefined) {
                console.log("akamalmbuj");

                dataToSet.clothImage = files.clothImage[0].filename
            }
            userDAO.editCloth(criteria, dataToSet, (err, dbData) => {
                console.log(err, "Ambuj")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_EDIT[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.editDataInDB);
    })
}

//Add color
let addColors = (data, files, callback) => {
    async.auto({
        addProductInDB: (cb) => {
            if (!data.colorDescription) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }

            var dataToSet = {
                "price": data.price ? data.price : '',
                "colorTitle": data.colorTitle ? data.colorTitle : '',
                "colorDescription": data.colorDescription ? data.colorDescription : '',
                "colorTitleAR": data.colorTitleAR ? data.colorTitleAR : '',
                "colorDescriptionAR": data.colorDescriptionAR ? data.colorDescriptionAR : '',
                "colorImage": files.colorImage[0].filename,
                "price": data.price ? data.price : ''

            }
            userDAO.addColors(dataToSet, (err, dbData) => {
                console.log(err, "Ambuj")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.addProductInDB);
    })
}

//Edit color
let editColors = (data, files, callback) => {
    async.auto({
        addProductInDB: (cb) => {
            if (!data.colorDescription) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                "colorId": data.colorId
            }
            var dataToSet = {
                "price": data.price ? data.price : '',
                "colorTitle": data.colorTitle ? data.colorTitle : '',
                "colorDescription": data.colorDescription ? data.colorDescription : '',
                "colorTitleAR": data.colorTitleAR ? data.colorTitleAR : '',
                "colorDescriptionAR": data.colorDescriptionAR ? data.colorDescriptionAR : '',
                "price": data.price ? data.price : ''
            }
            if (files.colorImage != undefined) {
                console.log("akamalmbuj");

                dataToSet.colorImage = files.colorImage[0].filename
            }
            userDAO.editColor(criteria, dataToSet, (err, dbData) => {
                console.log(err, "Ambuj")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_EDIT[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.addProductInDB);
    })
}

//Add Shades
let addShade = (data, files, callback) => {
    console.log(files, data, "Ambuj")
    async.auto({
        addProductInDB: (cb) => {
            if (!data.shadeDescription) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }

            var dataToSet = {
                "price": data.price ? data.price : '',
                "shadesTitle": data.shadesTitle ? data.shadesTitle : '',
                "shadeDescription": data.shadeDescription ? data.shadeDescription : '',
                "shadesTitleAR": data.shadesTitleAR ? data.shadesTitleAR : '',
                "shadeDescriptionAR": data.shadeDescriptionAR ? data.shadeDescriptionAR : '',
                "shadeImage": files.shadesImage[0].filename,
                "price": data.price ? data.price : ''

            }
            userDAO.addShades(dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.addProductInDB);
    })
}

//Edit Shades
let editShade = (data, files, callback) => {
    console.log(files, data, "Ambuj")
    async.auto({
        editDataInDB: (cb) => {
            if (!data.shadeDescription) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                "shadeId": data.shadeId
            }
            var dataToSet = {
                "shadesTitle": data.shadesTitle ? data.shadesTitle : '',
                "price": data.price ? data.price : '',
                "shadeDescription": data.shadeDescription ? data.shadeDescription : '',
                "shadesTitleAR": data.shadesTitleAR ? data.shadesTitleAR : '',
                "shadeDescriptionAR": data.shadeDescriptionAR ? data.shadeDescriptionAR : '',
                "price": data.price ? data.price : ''
            }
            if (files.shadesImage != undefined) {
                console.log("akamalmbuj");

                dataToSet.shadeImage = files.shadesImage[0].filename
            }
            userDAO.editShades(criteria, dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_EDIT[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.editDataInDB);
    })
}
//Add Side line
let addSideLine = (data, files, callback) => {
    console.log(files, "Ambuj")
    async.auto({
        addProductInDB: (cb) => {
            if (!data.sideLineDescription) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }

            var dataToSet = {
                "price": data.price ? data.price : '',
                "SideLineTitle": data.SideLineTitle ? data.SideLineTitle : '',
                "sideLineDescription": data.sideLineDescription ? data.sideLineDescription : '',
                "SideLineTitleAR": data.SideLineTitleAR ? data.SideLineTitleAR : '',
                "sideLineDescriptionAR": data.sideLineDescriptionAR ? data.sideLineDescriptionAR : '',
                "sideLineImage": files.sideLineImage[0].filename,
                "price": data.price ? data.price : ''

            }
            userDAO.addSideLines(dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.addProductInDB);
    })
}

//Edit Side line
let editSideLine = (data, files, callback) => {
    console.log(files, "Ambuj")
    async.auto({
        editDataInDB: (cb) => {
            if (!data.sideLineDescription) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                "lineId": data.lineId
            }
            var dataToSet = {
                "SideLineTitle": data.SideLineTitle ? data.SideLineTitle : '',
                "price": data.price ? data.price : '',
                "sideLineDescription": data.sideLineDescription ? data.sideLineDescription : '',
                "SideLineTitleAR": data.SideLineTitleAR ? data.SideLineTitleAR : '',
                "sideLineDescriptionAR": data.sideLineDescriptionAR ? data.sideLineDescriptionAR : '',
                "price": data.price ? data.price : ''

            }
            // console.log(files.sideLineImage,"mm");

            if (files.sideLineImage != undefined) {
                console.log("akamalmbuj");

                dataToSet.sideLineImage = files.sideLineImage[0].filename
            }
            userDAO.editSideLine(criteria, dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_EDIT[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.editDataInDB);
    })
}

//Add Stitching
let addStitching = (data, files, callback) => {
    console.log(files, "Ambuj")
    async.auto({
        addProductInDB: (cb) => {
            if (!data.stitchingDescription) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }

            var dataToSet = {
                "price": data.price ? data.price : '',
                "StitchingTypeTitle": data.StitchingTypeTitle ? data.StitchingTypeTitle : '',
                "stitchingDescription": data.stitchingDescription ? data.stitchingDescription : '',
                "StitchingTypeTitleAR": data.StitchingTypeTitleAR ? data.StitchingTypeTitleAR : '',
                "stitchingDescriptionAR": data.stitchingDescriptionAR ? data.stitchingDescriptionAR : '',
                "stitchingImage": files.stitchingImage[0].filename,
                "price": data.price ? data.price : ''

            }
            userDAO.addStitchingType(dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.addProductInDB);
    })
}

//Edit Stitching
let editStitching = (data, files, callback) => {
    console.log(files, "Ambuj")
    async.auto({
        editDataInDB: (cb) => {
            if (!data.stitchingDescription) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                stitchingId: data.stitchingId
            }
            var dataToSet = {
                "StitchingTypeTitle": data.StitchingTypeTitle ? data.StitchingTypeTitle : '',
                "price": data.price ? data.price : '',
                "stitchingDescription": data.stitchingDescription ? data.stitchingDescription : '',
                "StitchingTypeTitleAR": data.StitchingTypeTitleAR ? data.StitchingTypeTitleAR : '',
                "stitchingDescriptionAR": data.stitchingDescriptionAR ? data.stitchingDescriptionAR : '',
                "price": data.price ? data.price : ''
            }
            if (files.stitchingImage != undefined) {
                console.log("akamalmbuj");

                dataToSet.stitchingImage = files.stitchingImage[0].filename
            }
            userDAO.editStitchingType(criteria, dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.editDataInDB);
    })
}

//Add Stitching
let addFaruka = (data, files, callback) => {
    console.log(files, "Ambuj")
    async.auto({
        addProductInDB: (cb) => {
            if (!data.farukaDescription) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }

            var dataToSet = {
                "price": data.price ? data.price : '',
                "farukaTitle": data.farukaTitle ? data.farukaTitle : '',
                "farukaTitleAR": data.farukaTitleAR ? data.farukaTitleAR : '',
                "farukaDescriptionAR": data.farukaDescriptionAR ? data.farukaDescriptionAR : '',
                "farukaDescription": data.farukaDescription ? data.farukaDescription : '',
                "farukaImage": files.farukaImage[0].filename,
                "price": data.price ? data.price : ''

            }
            userDAO.addFaruka(dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.addProductInDB);
    })
}
//Edit Stitching
let editFaruka = (data, files, callback) => {
    console.log(files, "Ambuj")
    async.auto({
        editDataInDB: (cb) => {
            if (!data.farukaDescription) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                farukaId: data.farukaId
            }
            var dataToSet = {
                "farukaTitle": data.farukaTitle ? data.farukaTitle : '',
                "price": data.price ? data.price : '',
                "farukaDescription": data.farukaDescription ? data.farukaDescription : '',
                "farukaTitleAR": data.farukaTitleAR ? data.farukaTitleAR : '',
                "farukaDescriptionAR": data.farukaDescriptionAR ? data.farukaDescriptionAR : '',
                "price": data.price ? data.price : ''
            }
            if (files.farukaImage != undefined) {
                console.log("akamalmbuj");

                dataToSet.farukaImage = files.farukaImage[0].filename
            }
            userDAO.editFaruka(criteria, dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_EDIT[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.editDataInDB);
    })
}

//Add Turbosh
let addTarbosh = (data, files, callback) => {
    console.log(files, "Ambuj")
    async.auto({
        addProductInDB: (cb) => {
            if (!data.tarboshDescription) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }

            var dataToSet = {
                "price": data.price ? data.price : '',
                "tarboshTitle": data.tarboshTitle ? data.tarboshTitle : '',
                "tarboshDescription": data.tarboshDescription ? data.tarboshDescription : '',
                "tarboshTitleAR": data.tarboshTitleAR ? data.tarboshTitleAR : '',
                "tarboshDescriptionAR": data.tarboshDescriptionAR ? data.tarboshDescriptionAR : '',
                "tarboshImage": files.turboshImage[0].filename,
                "price": data.price ? data.price : ''

            }
            userDAO.addTarbosh(dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.addProductInDB);
    })
}

//edit Turbosh
let editTarbosh = (data, files, callback) => {
    async.auto({
        addProductInDB: (cb) => {
            if (!data.tarboshDescription) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                tarboshId: data.tarboshId
            }
            var dataToSet = {
                "tarboshTitle": data.tarboshTitle ? data.tarboshTitle : '',
                "price": data.price ? data.price : '',
                "tarboshDescription": data.tarboshDescription ? data.tarboshDescription : '',
                "tarboshTitleAR": data.tarboshTitleAR ? data.tarboshTitleAR : '',
                "tarboshDescriptionAR": data.tarboshDescriptionAR ? data.tarboshDescriptionAR : '',
                "price": data.price ? data.price : ''
            }
            if (files.turboshImage != undefined) {
                // console.log("akamalmbuj");

                dataToSet.tarboshImage = files.turboshImage[0].filename
            }
            userDAO.editTarbosh(criteria, dataToSet, (err, dbData) => {
                console.log(err, "Ambuj")

                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_EDIT[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.addProductInDB);
    })
}

//Add Fitting
let addFitting = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        addProductInDB: (cb) => {
            if (!data.fittingTitle) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }

            var dataToSet = {
                "fittingTitle": data.fittingTitle ? data.fittingTitle : '',
                "fittingTitleAR": data.fittingTitleAR ? data.fittingTitleAR : '',
                "fittingDescription": data.fittingDescription ? data.fittingDescription : '',
                "fittingDescriptionAR": data.fittingDescriptionAR ? data.fittingDescriptionAR : '',
                "price": data.price ? data.price : ''

            }
            userDAO.addFitting(dataToSet, (err, dbData) => {
                console.log(err,"post..............");
                
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.addProductInDB);
    })
}

//edit Fitting
let editFitting = (data, callback) => {
    console.log(data,"Test")
    async.auto({
        addProductInDB: (cb) => {
            if (!data.fittingDescription) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                fittingId: data.fittingId
            }
            var dataToSet = {
                "fittingTitle": data.fittingTitle ? data.fittingTitle : '',
                "fittingTitleAR": data.fittingTitleAR ? data.fittingTitleAR : '',
                "fittingDescription": data.fittingDescription ? data.fittingDescription : '',
                "fittingDescriptionAR": data.fittingDescriptionAR ? data.fittingDescriptionAR : '',
                "price": data.price ? data.price : ''
            }
            
            userDAO.editFitting(criteria, dataToSet, (err, dbData) => {
                console.log(criteria, "Ambuj")

                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_EDIT[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.addProductInDB);
    })
}

//******************************************Save Fabric***************************************************/

//Save fabric in db
let addFabric = (data, callback) => {
    async.auto({
        addCustomKandoraInDB: (cb) => {
            if (!data.Description) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var dataToSet = {
                "style": data.style ? data.style : '',
                "typeOfCloth": data.typeOfCloth ? data.typeOfCloth : '',
                "color": data.color ? data.color : '',
                "shades": data.shades ? data.shades : '',
                "sideLine": data.sideLine ? data.sideLine : '',
                "stitchingType": data.stitchingType ? data.stitchingType : '',
                "faruka": data.faruka ? data.faruka : '',
                "turbosh": data.turbosh ? data.turbosh : '',
                "Description": data.Description ? data.Description : '',
            }
            userDAO.addFabric(dataToSet, (err, dbData) => {
                console.log(err, "Ambuj")

                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.addCustomKandoraInDB);
    })
}

//Get Custom Kandora
let getCustomKandora = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        getCustomKandoraFromDB: (cb) => {

            var criteria = {
                "customKandoraId": data.customKandoraId
            }
            userDAO.getCustomKandora(criteria, (err, dbData) => {
                console.log(err, "Ambuj")

                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": "Data fetch successfully", result: dbData });
            })
        },

    }, (err, response) => {
        callback(response.getCustomKandoraFromDB);
    })


}

//get custom fabric API   
let getfabrics = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        addProductInDB: (cb) => {

            var criteria = {
                "type": data.type
            }
            userDAO.getAllFabric(criteria, (err, dbData) => {
                console.log(err, "Ambuj")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                } if (data.type == 'colors') {
                    dbData.forEach(element => {
                        element.id = element.colorId; delete element.colorId
                        element.image = util.productUrl() + 'colors/' + element.colorImage; delete element.colorImage
                        element.title = element.colorTitle; delete element.colorTitle
                        element.description = element.colorDescription; delete element.colorDescription
                        element.createdAt = element.createdAt
                        element.isSelectedVal = false

                    });
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": "Data fetch successfully", result: dbData });
                }
                if (data.type == 'faruka') {
                    dbData.forEach(element => {
                        element.id = element.farukaId; delete element.farukaId
                        element.image = util.productUrl() + 'faruka/' + element.farukaImage; delete element.farukaImage
                        element.title = element.farukaTitle; delete element.farukaTitle
                        element.description = element.farukaDescription; delete element.farukaDescription
                        element.createdAt = element.createdAt
                        element.isSelectedVal = false
                    });
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": "Data fetch successfully", result: dbData });
                }
                if (data.type == 'shades') {
                    dbData.forEach(element => {
                        element.id = element.shadeId; delete element.shadeId
                        element.image = util.productUrl() + 'Shades/' + element.shadeImage; delete element.shadeImage
                        element.title = element.shadesTitle; delete element.shadesTitle
                        element.description = element.shadeDescription; delete element.shadeDescription
                        element.createdAt = element.createdAt
                        element.isSelectedVal = false
                    });
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": "Data fetch successfully", result: dbData });
                }
                if (data.type == 'sideLines') {
                    dbData.forEach(element => {
                        element.id = element.lineId; delete element.lineId
                        element.image = util.productUrl() + 'sideLines/' + element.sideLineImage; delete element.sideLineImage
                        element.title = element.SideLineTitle; delete element.SideLineTitle
                        element.description = element.sideLineDescription; delete element.sideLineDescription
                        element.createdAt = element.createdAt
                        element.isSelectedVal = false
                    });
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": "Data fetch successfully", result: dbData });
                }
                if (data.type == 'stitchingType') {
                    dbData.forEach(element => {
                        element.id = element.stitchingId; delete element.stitchingId
                        element.image = util.productUrl() + 'stitchingType/' + element.stitchingImage; delete element.stitchingImage
                        element.title = element.StitchingTypeTitle; delete element.StitchingTypeTitle
                        element.description = element.stitchingDescription; delete element.stitchingDescription
                        element.createdAt = element.createdAt
                        element.isSelectedVal = false
                    });
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": "Data fetch successfully", result: dbData });
                }
                if (data.type == 'style') {
                    dbData.forEach(element => {
                        element.id = element.styleId; delete element.styleId
                        element.image = util.productUrl() + 'style/' + element.styleImage; delete element.styleImage
                        element.title = element.StyleTitle; delete element.StyleTitle
                        element.description = element.styleDescription; delete element.styleDescription
                        element.createdAt = element.createdAt
                        element.isSelectedVal = false
                    });
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": "Data fetch successfully", result: dbData });
                }
                if (data.type == 'tarbosh') {
                    dbData.forEach(element => {
                        element.id = element.tarboshId; delete element.tarboshId
                        element.image = util.productUrl() + 'tarbosh/' + element.tarboshImage; delete element.tarboshImage
                        element.title = element.tarboshTitle; delete element.tarboshTitle
                        element.description = element.tarboshDescription; delete element.tarboshDescription
                        element.createdAt = element.createdAt
                        element.isSelectedVal = false
                    });
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": "Data fetch successfully", result: dbData });
                }
                if (data.type == 'typeOfCloth') {
                    dbData.forEach(element => {
                        element.id = element.clothId; delete element.clothId
                        element.image = util.productUrl() + 'cloth/' + element.clothImage; delete element.clothImage
                        element.title = element.typeOfClothTitle; delete element.typeOfClothTitle
                        element.description = element.clothDescription; delete element.clothDescription
                        element.createdAt = element.createdAt
                        element.isSelectedVal = false
                    });
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": "Data fetch successfully", result: dbData });
                }
                if (data.type == 'fitting') {
                    dbData.forEach(element => {
                        element.id = element.fittingId; delete element.fittingId
                        element.title = element.fittingTitle; delete element.fittingTitle
                        element.description = element.fittingDescription; delete element.fittingDescription
                        element.createdAt = element.createdAt
                        element.isSelectedVal = false
                    });
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": "Data fetch successfully", result: dbData });
                }
            })
        },
    }, (err, response) => {
        callback(response.addProductInDB);
    })
}

//Get all custom kandora
let getAllCustomKandora = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        getCustomKandoraFromDB: (cb) => {

            userDAO.getAllCustomKandora((err, dbData) => {
                console.log(err, "Ambuj")
                dbData.forEach(element => {
                    element.customKandoraId = element.customKandoraId;
                    element.StyleTitle = element.StyleTitle;
                    element.typeOfClothTitle = element.typeOfClothTitle;
                    element.colorTitle = element.colorTitle;
                    element.shadesTitle = element.shadesTitle;
                    element.SideLineTitle = element.SideLineTitle;
                    element.StitchingTypeTitle = element.StitchingTypeTitle;
                    element.farukaTitle = element.farukaTitle;
                    element.tarboshTitle = element.tarboshTitle;
                    element.productImage = util.productUrl() + 'productImage/' + element.productImage;
                });
                // util.productUrl()+'colors/' +
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": "Data fetch successfully", result: dbData });
            })
        },

    }, (err, response) => {
        callback(response.getCustomKandoraFromDB);
    })


}
/*************************Standard Kandora************************/
//Get custom kandora
let getCustomDetail = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                customKandoraId: data.customKandoraId
            }
            userDAO.getCustomDetail(criteria, (err, dbData) => {
                dbData.forEach(element => {
                    element.tarboshImage = util.productUrl() + 'tarbosh/' + element.tarboshImage
                })
                console.log(dbData, err, "opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData[0] });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}
let addCustomKandora = (data, callback) => {
    console.log(data, "anvujvdvkdfg")
    async.auto({
        checkUserExistsinDB: (cb) => {
            if (!data.userId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] })
                return;
            }
            var criteria = {
                userId: data.userId
            }
            userDAO.getCustomPaymentDelail(criteria, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                    return;
                } else {
                    cb(null)

                }
            });
        },
        createUserinDB: ['checkUserExistsinDB', (cb, functionData) => {
            if (functionData && functionData.checkUserExistsinDB) {
                cb(null, functionData.checkUserExistsinDB);
                return;
            }
            var dataToSet = {
                "userId": data.userId,
                "title": data.title ? data.title : '',
                "titleAR": data.titleAR ? data.titleAR : '',

                "productId": data.productId ? data.productId : '',
                "style": data.style ? data.style : '',
                "typeOfCloth": data.typeOfCloth ? data.typeOfCloth : '',
                "color": data.color ? data.color : '',
                "shades": data.shades ? data.shades : '',
                "sideLine": data.sideLine ? data.sideLine : '',
                "stitchingType": data.stitchingType ? data.stitchingType : '',
                "faruka": data.faruka ? data.faruka : '',
                "turbosh": data.turbosh ? data.turbosh : '',
                "fitting": data.fitting ? data.fitting : '',

                "Description": data.Description ? data.Description : '',
                "DescriptionAR": data.DescriptionAR ? data.DescriptionAR : '',

                "price": data.price ? data.price : '',
                "Mid": data.Mid ? data.Mid : '',
                "productType": 'custom',
            }

            userDAO.addCustomKandora(dataToSet, (err, dbData) => {
                console.log(err, "post")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                var criteria = {
                    customKandoraId: dbData.insertId
                }
                userDAO.getCustomDetail(criteria, (err, dbData) => {
                    if (data.lang == 'ar') {
                        dbData.forEach(element => {
                            element.title = element.titleAR; delete element.titleAR;
                            element.Description = element.DescriptionAR; delete element.DescriptionAR;

                            element.StyleTitle = element.StyleTitleAR; delete element.StyleTitleAR;
                            element.typeOfClothTitle = element.typeOfClothTitleAR; delete element.typeOfClothTitleAR;
                            element.colorTitle = element.colorTitleAR; delete element.colorTitleAR;
                            element.shadesTitle = element.shadesTitleAR; delete element.shadesTitleAR;
                            element.SideLineTitle = element.SideLineTitleAR; delete element.SideLineTitleAR;
                            element.StitchingTypeTitle = element.StitchingTypeTitleAR; delete element.StitchingTypeTitleAR;
                            element.farukaTitle = element.farukaTitleAR; delete element.farukaTitleAR;
                            element.tarboshTitle = element.tarboshTitleAR; delete element.tarboshTitleAR;
                            element.fittingTitle = element.fittingTitleAR; delete element.fittingTitleAR;

                            element.styleImage = util.productUrl() + 'style/' + element.styleImage;
                            element.Mid = element.Mid;

                        });
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData[0] });
                    } else {
                        dbData.forEach(element => {
                            element.title = element.title;
                            element.Description = element.Description;

                            element.StyleTitle = element.StyleTitle;
                            element.typeOfClothTitle = element.typeOfClothTitle;
                            element.colorTitle = element.colorTitle;
                            element.shadesTitle = element.shadesTitle;
                            element.SideLineTitle = element.SideLineTitle;
                            element.StitchingTypeTitle = element.StitchingTypeTitle;
                            element.farukaTitle = element.farukaTitle;
                            element.tarboshTitle = element.tarboshTitle;
                            element.fittingTitle = element.fittingTitle;

                            element.Mid = element.Mid;


                            element.titleAR; delete element.titleAR;
                            element.DescriptionAR; delete element.DescriptionAR;

                            element.StyleTitleAR; delete element.StyleTitleAR;
                            element.typeOfClothTitleAR; delete element.typeOfClothTitleAR;
                            element.colorTitleAR; delete element.colorTitleAR;
                            element.shadesTitleAR; delete element.shadesTitleAR;
                            element.SideLineTitleAR; delete element.SideLineTitleAR;
                            element.StitchingTypeTitleAR; delete element.StitchingTypeTitleAR;
                            element.farukaTitleAR; delete element.farukaTitleAR;
                            element.tarboshTitleAR; delete element.tarboshTitleAR;
                            element.fittingTitleAR; delete element.fittingTitleAR;

                            element.styleImage = util.productUrl() + 'style/' + element.styleImage;


                        });
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData[0] });
                    }
                    // cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dbData[0] });
                })
            })
        }]
    }, (err, response) => {
        callback(response.createUserinDB);
    });
}
let addStandardCustomKandora = (data, callback) => {
    console.log(data, "anvujvdvkdfg")
    async.auto({
        checkUserExistsinDB: (cb) => {
            if (!data.userId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] })
                return;
            }
            var criteria = {
                userId: data.userId
            }
            userDAO.getCustomPaymentDelail(criteria, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                    return;
                } else {
                    cb(null)

                }
            });
        },
        createUserinDB: ['checkUserExistsinDB', (cb, functionData) => {
            if (functionData && functionData.checkUserExistsinDB) {
                cb(null, functionData.checkUserExistsinDB);
                return;
            }
            var dataToSet = {
                "userId": data.userId,
                "title": data.title ? data.title : '',
                "titleAR": data.titleAR ? data.titleAR : '',

                "productId": data.productId ? data.productId : '',
                "style": data.style ? data.style : '',
                "typeOfCloth": data.typeOfCloth ? data.typeOfCloth : '',
                "color": data.color ? data.color : '',
                "shades": data.shades ? data.shades : '',
                "sideLine": data.sideLine ? data.sideLine : '',
                "stitchingType": data.stitchingType ? data.stitchingType : '',
                "faruka": data.faruka ? data.faruka : '',
                "turbosh": data.turbosh ? data.turbosh : '',
                "fitting": data.fitting ? data.fitting : '',

                "Description": data.Description ? data.Description : '',
                "DescriptionAR": data.DescriptionAR ? data.DescriptionAR : '',
                "Mid": data.Mid ? data.Mid : '',
                "price": data.price ? data.price : '',
                "productType": 'custom',
            }

            userDAO.addCustomKandora(dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                var criteria = {
                    customKandoraId: dbData.insertId
                }
                userDAO.getStandardCustomDetail(criteria, (err, dbData) => {

                    console.log(dbData, "post")

                    let res;
                    const { productId, productName, productTitle,
                        productDescription, productPrice, productType, styleId, StyleTitle, clothId,
                        typeOfClothTitle, colorId, colorTitle, shadeId, shadesTitle, lineId,
                        SideLineTitle, stitchingId, StitchingTypeTitle, farukaId, farukaTitle,
                        tarboshId, tarboshTitle,fittingId,fittingTitle, status, TotalAmount, customKandoraId, productImage, Mid } = dbData[0]


                    dbData = {
                        productId,
                        customKandoraId,
                        Mid,
                        productName,
                        productTitle,
                        productDescription,
                        
                        productType,
                        status: 0,
                        productPrice : TotalAmount.toString(),
                        productImage,
                        style: {
                            id: styleId ? styleId : '',
                            name: StyleTitle ? StyleTitle : ''
                        },
                        cloth: {
                            id: clothId ? clothId : '',
                            name: typeOfClothTitle ? typeOfClothTitle : ''
                        },
                        color: {
                            id: colorId ? colorId : '',
                            name: colorTitle ? colorTitle : ''
                        },
                        shade: {
                            id: shadeId ? shadeId : '',
                            name: shadesTitle ? shadesTitle : ''
                        },
                        line: {
                            id: lineId ? lineId : '',
                            name: SideLineTitle ? SideLineTitle : ''
                        },
                        stitching: {
                            id: stitchingId ? stitchingId : '',
                            name: StitchingTypeTitle ? StitchingTypeTitle : ''
                        },
                        faruka: {
                            id: farukaId ? farukaId : '',
                            name: farukaTitle ? farukaTitle : ''
                        },
                        tarbosh: {
                            id: tarboshId ? tarboshId : '',
                            name: tarboshTitle ? tarboshTitle : ''
                        },
                        fitting: {
                            id: fittingId ? fittingId : '',
                            name: fittingTitle ? fittingTitle : ''
                        },
                    }
                    cb(null, {
                        "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": {
                            "productDetail": dbData, productImage: [{
                                productImage: dbData.productImage
                            }]
                        }
                    });
                })
            })
        }]
    }, (err, response) => {
        callback(response.createUserinDB);
    });
}

/*************************Remove************************/

let removeCloth = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        getCustomKandoraFromDB: (cb) => {
            var criteria = {
                clothId: data.clothId
            }
            var dataToSet = {
                status : 'Deactive'
            }
            userDAO.removeCloth(criteria,dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_REMOVE[data.lang] });
            })
        },
    }, (err, response) => {
        callback(response.getCustomKandoraFromDB);
    })
}

let removeColor = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        getCustomKandoraFromDB: (cb) => {
            var criteria = {
                colorId: data.colorId
            }
            var dataToSet = {
                status : 'Deactive'
            }
            userDAO.removeColor(criteria,dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_REMOVE[data.lang] });
            })
        },

    }, (err, response) => {
        callback(response.getCustomKandoraFromDB);
    })


}

let removeFaruka = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        getCustomKandoraFromDB: (cb) => {
            var criteria = {
                farukaId: data.farukaId
            }
            var dataToSet = {
                status : 'Deactive'
            }
            userDAO.removeFaruka(criteria,dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_REMOVE[data.lang] });
            })
        },

    }, (err, response) => {
        callback(response.getCustomKandoraFromDB);
    })


}

let removeShades = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        getCustomKandoraFromDB: (cb) => {
            var criteria = {
                shadeId: data.shadeId
            }
            var dataToSet = {
                status : 'Deactive'
            }
            userDAO.removeShades(criteria,dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_REMOVE[data.lang] });
            })
        },

    }, (err, response) => {
        callback(response.getCustomKandoraFromDB);
    })


}

let removeSideLines = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        getCustomKandoraFromDB: (cb) => {
            var criteria = {
                lineId: data.lineId
            }
            var dataToSet = {
                status : 'Deactive'
            }
            userDAO.removeSideLines(criteria,dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_REMOVE[data.lang] });
            })
        },

    }, (err, response) => {
        callback(response.getCustomKandoraFromDB);
    })


}

let removeStitchingType = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        getCustomKandoraFromDB: (cb) => {
            var criteria = {
                stitchingId: data.stitchingId
            }
            var dataToSet = {
                status : 'Deactive'
            }
            userDAO.removeStitchingType(criteria,dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_REMOVE[data.lang] });
            })
        },

    }, (err, response) => {
        callback(response.getCustomKandoraFromDB);
    })


}

let removeStyle = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        getCustomKandoraFromDB: (cb) => {
            var criteria = {
                styleId: data.styleId
            }
            var dataToSet = {
                status : 'Deactive'
            }
            userDAO.removeStyle(criteria,dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_REMOVE[data.lang] });
            })
        },

    }, (err, response) => {
        callback(response.getCustomKandoraFromDB);
    })


}

let removeTarbosh = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        getCustomKandoraFromDB: (cb) => {
            var criteria = {
                tarboshId: data.tarboshId
            }
            var dataToSet = {
                status : 'Deactive'
            }
            userDAO.removeTarbosh(criteria,dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_REMOVE[data.lang] });
            })
        },

    }, (err, response) => {
        callback(response.getCustomKandoraFromDB);
    })
}

let removeFitting = (data, callback) => {
    console.log(data, "ambuj................................")
    async.auto({
        getCustomKandoraFromDB: (cb) => {
            var criteria = {
                fittingId: data.fittingId
            }
            var dataToSet = {
                status : 'Deactive'
            }
            userDAO.removeFitting(criteria,dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_REMOVE[data.lang] });
            })
        },

    }, (err, response) => {
        callback(response.getCustomKandoraFromDB);
    })
}

let removeProduct = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        removeDataFromDB: (cb) => {

            var criteria = {
                productId: data.productId
            }
            userDAO.removeProduct(criteria, (err, dbData) => {

                userDAO.removeCProductImage(criteria, (err, dbData) => {
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                    }
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_REMOVE[data.lang] });
                })
            })
        },
    }, (err, response) => {
        callback(response.removeDataFromDB);
    })


}

let removePromotion = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        removeDataFromDB: (cb) => {

            var criteria = {
                promotionId: data.promotionId
            }
            userDAO.removePromotion(criteria, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_REMOVE[data.lang] });
            })
        },
    }, (err, response) => {
        callback(response.removeDataFromDB);
    })


}

/********************************Get Offer API*********************************/
//Get all Offer
let getAllOffer = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            userDAO.getAdminOffer((err, dbData) => {

                dbData.forEach(element => {
                    element.productImage = util.productUrl() + 'productImage/' + element.productImage
                })
                console.log(dbData, err, "opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
            })
        },

    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let editOffer = (data, files, callback) => {
    console.log(files, "Ambuj")
    async.auto({
        editDataInDB: (cb) => {
            if (!data.tarboshDescription) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                offerId: data.offerId
            }
            var dataToSet = {
                "productId": data.productId ? data.productId : '',
                "offerTitle": data.offerTitle ? data.offerTitle : '',
                "offerDescription": data.offerDescription ? data.offerDescription : '',

                // "tarboshImage": files.turboshImage[0].filename,
            }
            // if(files.turboshImage!=undefined){
            //     console.log("akamalmbuj");

            //     dataToSet.turboshImage = files.turboshImage[0].filename
            // }           
            userDAO.editTarbosh(criteria, dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_EDIT[data.lang], result: dataToSet });
            })
        },

    }, (err, response) => {
        callback(response.editDataInDB);
    })
}

let removeOffer = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        removeDataFromDB: (cb) => {

            var criteria = {
                offerId: data.offerId
            }
            userDAO.removeOffer(criteria, (err, dbData) => {

                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_REMOVE[data.lang] });
            })
        },
    }, (err, response) => {
        callback(response.removeDataFromDB);
    })


}
/********************Get fabric**********************/

let getClothData = (data, callback) => {
    console.log(data, "kamal sharma.................................................");

    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                clothId: data.clothId
            }
            userDAO.getClothAdmin(criteria, (err, dbData) => {
                console.log(dbData, "ambuj.........................................................");

                dbData.forEach(element => {
                    element.clothImage = util.productUrl() + 'cloth/' + element.clothImage
                })
                // console.log(dbData,err,"opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData[0] });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let getStyleAdmin = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                styleId: data.styleId
            }
            userDAO.getStyleAdmin(criteria, (err, dbData) => {
                dbData.forEach(element => {
                    element.styleImage = util.productUrl() + 'style/' + element.styleImage
                })
                console.log(dbData, err, "opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData[0] });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let getColorAdmin = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                colorId: data.colorId
            }
            userDAO.getColorAdmin(criteria, (err, dbData) => {
                dbData.forEach(element => {
                    element.colorImage = util.productUrl() + 'colors/' + element.colorImage
                })
                console.log(dbData, err, "opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData[0] });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let getShadeAdmin = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                shadeId: data.shadeId
            }
            userDAO.getShadeAdmin(criteria, (err, dbData) => {
                dbData.forEach(element => {
                    element.shadeImage = util.productUrl() + 'Shades/' + element.shadeImage
                })
                console.log(dbData, err, "opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData[0] });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let getSideLineAdmin = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                lineId: data.lineId
            }
            userDAO.getSideLineAdmin(criteria, (err, dbData) => {
                dbData.forEach(element => {
                    element.sideLineImage = util.productUrl() + 'sideLines/' + element.sideLineImage
                })
                console.log(dbData, err, "opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData[0] });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let getStitchingAdmin = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                stitchingId: data.stitchingId
            }
            userDAO.getStitchingAdmin(criteria, (err, dbData) => {
                dbData.forEach(element => {
                    element.stitchingImage = util.productUrl() + 'stitchingType/' + element.stitchingImage
                })
                // console.log(dbData,err,"opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData[0] });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let getFarukaAdmin = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                farukaId: data.farukaId
            }
            userDAO.getFarukaAdmin(criteria, (err, dbData) => {
                dbData.forEach(element => {
                    element.farukaImage = util.productUrl() + 'faruka/' + element.farukaImage
                })
                console.log(dbData, err, "opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData[0] });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let getTarboshAdmin = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                tarboshId: data.tarboshId
            }
            userDAO.getTarboshAdmin(criteria, (err, dbData) => {
                dbData.forEach(element => {
                    element.tarboshImage = util.productUrl() + 'tarbosh/' + element.tarboshImage
                })
                console.log(dbData, err, "opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData[0] });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let getFittingAdmin = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                fittingId: data.fittingId
            }
            userDAO.getFittingAdmin(criteria, (err, dbData) => {
              
                console.log(dbData, err, "opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData[0] });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

/**************Add cart**************/
//addCart  Details
let addCart = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        addDataInDB: (cb) => {
            if (!data.userId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }

            var dataToSet = {
                "userId": data.userId,
                "productId": data.productId ? data.productId : '',
                "customKandoraId": data.customKandoraId ? data.customKandoraId : '',
                "quantity": data.quantity,
                "Mid": data.Mid ? data.Mid : '',
                "price": data.price ? data.price : '',
                "status": '1'
            }

            userDAO.addCart(dataToSet, (err, dbData) => {
                console.log(err, "post")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                var criteria = {
                    userId: data.userId
                }
                userDAO.getSentNotification(criteria, (err, dbData) => {
                    console.log(dataToSet, "notification")
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR })
                    } else {
                        let title = util.statusMessage.ITEM_ADDED[data.lang]
                        //  let dataType = 'cart'
                        //  let notification = {
                        //     type: 'cart',
                        // };
                        if (dbData[0].device_token != null) {
                            let notifiyData = {
                                deviceId: dbData[0].device_token,
                                deviceType: dbData[0].device_type,
                                notificationType: 'cart',
                                payload: {
                                    data: "notification",
                                    // type: dataType,
                                    title: title,
                                }
                            };
                            // COMMON.sendNotification(notifiyData);
                            var dataToSet = {
                                title: title,
                                userId: data.userId,
                                notificationType: notifiyData.notificationType
                            }
                            userDAO.addNotification(dataToSet, (err, dbData) => {
                                console.log(err, "post")
                            })

                        }
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.ITEM_ADDED[data.lang], status: '1' })

                    }
                });
                //cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], status: dataToSet.status });
            })
        },

    }, (err, response) => {
        callback(response.addDataInDB);
    })


}
//Get cart Details
let getCartDetails = (data, callback) => {
    console.log("request--------------------------->>>>", data)
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                userId: data.userId,
            }
            var arr = []
            var count = 0
            userDAO.getCartDetail(criteria, async (err, dbData) => {
                console.log(dbData, "post", err)
                userDAO.quantityOfProduct(criteria, async (err, quantityData) => {
                    userDAO.totalPriceOfProduct(criteria, async (err, totalPrice) => {

                        if (err) {
                            cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                        }
                        if (data.lang == 'ar') {


                            for (var i = 0; dbData.length > i; i++) {
                                if (dbData[i].productId == '' && dbData[i].customKandoraId != '') {

                                    var criteria = {
                                        customKandoraId: dbData[i].customKandoraId
                                    }

                                    var kandooraData = await getKandooraData(criteria)

                                    kandooraData.productTitle = kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                    kandooraData.titleAR; delete kandooraData.titleAR;
                                    kandooraData.Description = kandooraData.DescriptionAR; delete kandooraData.DescriptionAR;

                                    kandooraData.StyleTitle = kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                    kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                                    kandooraData.colorTitle = kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                                    kandooraData.shadesTitle = kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                                    kandooraData.SideLineTitle = kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                                    kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                                    kandooraData.farukaTitle = kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                                    kandooraData.tarboshTitle = kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;
                                    kandooraData.quantity = kandooraData.quantity;
                                    kandooraData.cartId = kandooraData.cartId;
                                    kandooraData.title; delete kandooraData.title;
                                    kandooraData.productPrice = kandooraData.productPrice.toString()

                                    kandooraData.styleImage = util.productUrl() + 'style/' + kandooraData.styleImage;
                                    kandooraData.Mid = dbData[i].Mid
                                    kandooraData.type = 'Custom Kandora'
                                    console.log(kandooraData.styleImage, "post")
                                    arr.push(kandooraData)
                                }

                                if (dbData[i].customKandoraId == '' && dbData[i].productId != '') {

                                    var criteria = {
                                        productId: dbData[i].productId
                                    }

                                    var kandooraData = await getProductData(criteria)

                                    kandooraData.StyleTitle = kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                    kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                                    kandooraData.colorTitle = kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                                    kandooraData.shadesTitle = kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                                    kandooraData.SideLineTitle = kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                                    kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                                    kandooraData.farukaTitle = kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                                    kandooraData.tarboshTitle = kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;
                                    kandooraData.productName = kandooraData.productNameAR; delete kandooraData.productNameAR;
                                    kandooraData.productTitle = kandooraData.productTitleAR; delete kandooraData.productTitleAR;
                                    kandooraData.productDescription = kandooraData.productDescriptionAR; delete kandooraData.productDescriptionAR;
                                    kandooraData.productImage = util.productUrl() + 'productImage/' + kandooraData.productImage;
                                    kandooraData.styleImage = ""

                                    kandooraData.quantity = kandooraData.quantity;
                                    kandooraData.cartId = kandooraData.cartId;
                                    kandooraData.Mid = dbData[i].Mid

                                    kandooraData.type = 'Standard Kandora'
                                    arr.push(kandooraData)


                                }


                            }
                            console.log('response =============================>>>>', arr)

                            if (arr.length == i) {

                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": arr, Quantity: quantityData[0].TotalItemsOrdered, Price: totalPrice[0].TotalPrice });
                            }
                            else {

                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": arr, Quantity: quantityData[0].TotalItemsOrdered, Price: totalPrice[0].TotalPrice });
                            }


                        } else {

                            for (var i = 0; dbData.length > i; i++) {
                                if (dbData[i].productId == '' && dbData[i].customKandoraId != '') {

                                    var criteria = {
                                        customKandoraId: dbData[i].customKandoraId
                                    }

                                    var kandooraData = await getKandooraData(criteria)

                                    kandooraData.StyleTitle = kandooraData.StyleTitle;
                                    kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitle;
                                    kandooraData.colorTitle = kandooraData.colorTitle;
                                    kandooraData.shadesTitle = kandooraData.shadesTitle;
                                    kandooraData.SideLineTitle = kandooraData.SideLineTitle;
                                    kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitle;
                                    kandooraData.farukaTitle = kandooraData.farukaTitle;
                                    kandooraData.tarboshTitle = kandooraData.tarboshTitle;
                                    kandooraData.productTitle = kandooraData.StyleTitle;//kandooraData.title;
                                    kandooraData.Description = kandooraData.Description;


                                    kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                    kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                                    kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                                    kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                                    kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                                    kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                                    kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                                    kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;
                                    kandooraData.title; delete kandooraData.title;

                                    kandooraData.titleAR; delete kandooraData.titleAR;
                                    kandooraData.DescriptionAR; delete kandooraData.DescriptionAR;
                                    kandooraData.quantity = kandooraData.quantity;
                                    kandooraData.cartId = kandooraData.cartId;
                                    kandooraData.productPrice = kandooraData.productPrice.toString()

                                    kandooraData.styleImage = util.productUrl() + 'style/' + kandooraData.styleImage;
                                    kandooraData.Mid = dbData[i].Mid

                                    kandooraData.type = 'Custom Kandora'
                                    arr.push(kandooraData)
                                }

                                if (dbData[i].customKandoraId == '' && dbData[i].productId != '') {

                                    var criteria = {
                                        productId: dbData[i].productId
                                    }

                                    var kandooraData = await getProductData(criteria)

                                    kandooraData.StyleTitle = kandooraData.StyleTitle;
                                    kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitle;
                                    kandooraData.colorTitle = kandooraData.colorTitle;
                                    kandooraData.shadesTitle = kandooraData.shadesTitle;
                                    kandooraData.SideLineTitle = kandooraData.SideLineTitle;
                                    kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitle;
                                    kandooraData.farukaTitle = kandooraData.farukaTitle;
                                    kandooraData.tarboshTitle = kandooraData.tarboshTitle;

                                    kandooraData.productName = kandooraData.productName;
                                    kandooraData.productTitle = kandooraData.productTitle;
                                    kandooraData.productDescription = kandooraData.productDescription;

                                    kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                    kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                                    kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                                    kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                                    kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                                    kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                                    kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                                    kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;

                                    kandooraData.productNameAR; delete kandooraData.productNameAR;
                                    kandooraData.productTitleAR; delete kandooraData.productTitleAR;
                                    kandooraData.productDescriptionAR; delete kandooraData.productDescriptionAR;


                                    kandooraData.productImage = util.productUrl() + 'productImage/' + kandooraData.productImage
                                    kandooraData.styleImage = ""
                                    kandooraData.quantity = kandooraData.quantity;
                                    kandooraData.cartId = kandooraData.cartId;
                                    kandooraData.Mid = dbData[i].Mid

                                    kandooraData.type = 'Standard Kandora'
                                    arr.push(kandooraData)


                                }

                            }
                            console.log('response =============================>>>>', arr)

                            if (arr.length == i) {
                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": arr, Quantity: quantityData[0].TotalItemsOrdered, Price: totalPrice[0].TotalPrice });
                            }
                            else {

                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": arr, Quantity: quantityData[0].TotalItemsOrdered, Price: totalPrice[0].TotalPrice });
                            }
                        }
                    })
                })
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}
//Update user key in cart
let updateUserKeyInCart = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        addDataInDB: (cb) => {
            if (!data.userId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                oldUserId: data.oldUserId
            }
            var dataToSet = {
                userId: data.userId
            }
            userDAO.updateUserKeyInCart(criteria, dataToSet, (err, dbData) => {
                console.log(err, "post")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang] });
            })
        },
    }, (err, response) => {
        callback(response.addDataInDB);
    })


}
//Remove cart details
let removeCart = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        addDataInDB: (cb) => {
            if (!data.cartId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                cartId: data.cartId
            }
            userDAO.removeCart(criteria, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_REMOVE[data.lang] });
                // })
            })
        },

    }, (err, response) => {
        callback(response.addDataInDB);
    })


}
//update quantity in cart 
let updateQuantity = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        editDataInDB: (cb) => {
            if (!data.cartId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                cartId: data.cartId
            }
            var dataToSet = {
                "quantity": data.quantity ? data.quantity : '',
                "price": data.price ? data.price : ''
            }

            userDAO.editQuantity(criteria, dataToSet, (err, dbData) => {
                console.log(err, "post")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }

                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.UPDATE_DATA[data.lang] });
                // })
            })
        },

    }, (err, response) => {
        callback(response.editDataInDB);
    })


}
/*****************Add user cards Details**************************/
//Add card 
let addCardDetail = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        addDataInDB: (cb) => {
            if (!data.userId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }

            var dataToSet = {
                userId: data.userId,
                cardNumber: data.cardNumber,
                validThrough: data.validThrough,
                cardHolderName: data.cardHolderName,
                token: "",
            }

            userDAO.cardDetail(dataToSet, (err, dbData) => {
                console.log(err, "post")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                var criteria = {
                    cardId: dbData.insertId
                }
                userDAO.getCardDetail(criteria, (err, dbData) => {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dbData[0] });
                })
            })
        },

    }, (err, response) => {
        callback(response.addDataInDB);
    })


}
//*************************************Measurement**********************************/

let checkMPayment = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                userId: data.userId,
                mType: '1',
            }
            userDAO.isPaid(criteria, (err, dbData) => {
                // console.log(dbData,"post..................")
                userDAO.mTypeCount(criteria, (err, mType) => {
                    // console.log(err,mType,"post..................")
                    // return
                    userDAO.isPaidCount(criteria, (err, payCount) => {
                        console.log(err, payCount, "status..................")

                        if (err) {
                            cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                        }
                        if (dbData && dbData.length == []) {
                            console.log(dbData, "sumit...................test")
                            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FREEMEASUREMENTPAYMENT[data.lang], isPaid: 0 });
                            return;
                        }
                        if (mType && mType.length > 0 && mType[0].mType != 0) {
                            console.log(dbData, "sumit...............kamal....")
                            if (payCount && payCount.length > 0 && payCount[0].status == '0') {
                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FREEMEASUREMENTPAYMENT[data.lang], isPaid: 0 });
                                return;
                            }
                            else {
                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.MEASUREMENTPAYMENT[data.lang], isPaid: 1, price: dbData[0].price });
                                return;
                            }
                        }
                        // if(payCount && payCount[0].status == 0 ){
                        //     console.log(payCount,"postdads")
                        //     cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FREEMEASUREMENTPAYMENT[data.lang],isPaid: 0});
                        // }
                        else {
                            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.MEASUREMENTPAYMENT[data.lang], isPaid: 1, price: dbData[0].price });
                            return;
                        }
                    })
                })
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}
let addMTransaction = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        addDataInDB: (cb) => {
            if (!data.userId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }

            var dataToSet = {
                userId: data.userId,
                transactionId: data.transactionId ? data.transactionId : '',
                price: data.price ? data.price : '',
                status: '0',
            }

            userDAO.addTMeasurement(dataToSet, (err, dbData) => {
                console.log(err, "post")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang] });
            })
        },

    }, (err, response) => {
        callback(response.addDataInDB);
    })
}
let addMeasurement = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        addDataInDB: (cb) => {
            if (!data.title) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
                return;
            }
            var dataToSet = {
                userId: data.userId,
                title: data.title,
                height: data.height,
                chest: data.chest,
                lowHip: data.lowHip,
                highHip: data.highHip,
                shoulder: data.shoulder,
                wrist: data.wrist ? data.wrist : '0',
                waist: data.waist ? data.waist : '0',
                calf: data.calf ? data.calf : '0',
                sleeves: data.sleeves ? data.sleeves : '0',
                back_neck_height: data.back_neck_height ? data.back_neck_height : '0',
                bicep: data.bicep ? data.bicep : '0',
                neck: data.neck ? data.neck : '0',
                mType: data.mType ? data.mType : '0',
            }
            if (data.mType == '0') {
                userDAO.addMeasurement(dataToSet, (err, dbData) => {
                    console.log(err, "post")
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                    }
                    var criteria = {
                        userId: data.userId
                    }
                    userDAO.getSentNotification(criteria, (err, dbData) => {
                        console.log(dbData, "notification")
                        if (err) {
                            cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR })
                        } else {
                            let title = util.statusMessage.SEND_MEASUREMENT[data.lang]
                            //  let dataType = 'measurement'
                            // let notification = {
                            //     type: 'measurement',
                            // };
                            if (dbData[0].device_token != null) {
                                let notifiyData = {
                                    deviceId: dbData[0].device_token,
                                    deviceType: dbData[0].device_type,
                                    notificationType: 'measurement',//util.notificationType.NEW_MESSAGE,
                                    payload: {
                                        data: "notification",
                                        // type: dataType,
                                        title: title,
                                    }
                                };
                                COMMON.sendNotification(notifiyData);
                                var dataToSet = {
                                    title: title,
                                    userId: data.userId,
                                    notificationType: notifiyData.notificationType
                                }
                                userDAO.addNotification(dataToSet, (err, dbData) => {
                                })

                            }
                            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.SEND_MEASUREMENT[data.lang], result: dataToSet[0] })

                        }
                    });
                    //cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dbData[0] });
                    // })
                })
            } if (data.mType == '1') {
                userDAO.addMeasurement(dataToSet, (err, dbData) => {

                    console.log(err, "post")
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                    }
                    var criteria = {
                        userId: data.userId
                    }
                    userDAO.getSentNotification(criteria, (err, dbData) => {
                        console.log(dbData, "notification")
                        if (err) {
                            cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR })
                        } else {
                            //  let title = util.statusMessage.SEND_MEASUREMENT[data.lang]
                            // //  let dataType = 'measurement'
                            // // let notification = {
                            // //     type: 'measurement',
                            // // };
                            // if(dbData[0].device_token != null){
                            //     let notifiyData = {
                            //         deviceId: dbData[0].device_token,
                            //         deviceType: dbData[0].device_type,
                            //         notificationType: 'measurement',//util.notificationType.NEW_MESSAGE,
                            //         payload: {
                            //             data: "notification",
                            //             // type: dataType,
                            //             title: title,
                            //         }
                            //     };
                            //     COMMON.sendNotification(notifiyData);
                            //     var dataToSet = {
                            //         title: title,
                            //         userId: data.userId,
                            //         notificationType:notifiyData.notificationType
                            //     }
                            //     userDAO.addNotification(dataToSet, (err, dbData)=>{
                            //     })

                            // }
                            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.SEND_MEASUREMENT[data.lang], result: dataToSet[0] })

                        }
                    });
                    var dataToSet = {
                        status: '1'
                    }
                    userDAO.editMUserStatus(criteria, dataToSet, (err, dbData) => { })
                    //cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dbData[0] });
                    // })
                })
            } else {
                return;
            }

        },
    }, (err, response) => {
        callback(response.addDataInDB);
    })
}
let getMeasurement = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                userId: data.userId
            }
            userDAO.getMeasurement(criteria, (err, dbData) => {
                // dbData.forEach(element=>{
                //     element.tarboshImage = util.productUrl()+'tarbosh/'+element.tarboshImage
                // })
                console.log(dbData, err, "opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}
let getFreeMeasurement = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {

            userDAO.getFreeMeasurement((err, dbData) => {

                console.log(dbData, err, "opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}
let getPaidMeasurement = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {

            userDAO.getPaidMeasurement((err, dbData) => {

                console.log(dbData, err, "opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}
let updateIsSelected = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        editDataInDB: (cb) => {
            if (!data.userId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                userId: data.userId
            }
            var dataToSet = {
                "isSelected": '0',
            }
            userDAO.notSecleted(criteria, dataToSet, (err, dbData) => {
                console.log(err, "post")

                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                var criteria2 = {
                    Mid: data.Mid
                }
                var dataToSet = {
                    "isSelected": '1',
                }
                userDAO.isSecleted(criteria2, dataToSet, (err, dbData) => { })

                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.UPDATE_DATA[data.lang] });
            })
        },

    }, (err, response) => {
        callback(response.editDataInDB);
    })
}
let removeMeasurement = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        removeDataFromDB: (cb) => {

            var criteria = {
                Mid: data.Mid
            }
            var dataToSet = {
                "status": 1
            }
            userDAO.removeMeasurement(criteria, dataToSet, (err, dbData) => {
                console.log(err, "post")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                    return;
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_REMOVE[data.lang] });
            })
        },
    }, (err, response) => {
        callback(response.removeDataFromDB);
    })
}
let viewMeasurement = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            if (!data.userId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                return;
            }
            var criteria = {
                userId: data.userId,
                Mid: data.Mid
            }
            userDAO.viewMeasurement(criteria, (err, dbData) => {


                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                    return;

                } else {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData[0] });
                }
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}
let addMeasurementPriceHistory = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        addDataInDB: (cb) => {
            if (!data.price) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var dataToSet = {
                "price": data.price ? data.price : '',
            }
            userDAO.addMeasurementHistory(dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang] });
            })
        },
    }, (err, response) => {
        callback(response.addDataInDB);
    })
}
let getMeasurementPriceHistory = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            userDAO.getMeasurementHistory((err, dbData) => {
                // console.log(dbData, err, "opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}
let getMeasurementHistoryForUser = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            userDAO.getMeasurementHistoryForUser((err, dbData) => {
                // console.log(dbData, err, "opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData[0] });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

/**********************************CHECK OUT**************************************** */

//Add check out Details
let addCheckOut = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        addDataInDB: (cb) => {
            if (!data.userId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                userId: data.userId
            }
            userDAO.getCheckOut(criteria, (err, dbData) => {

            })

        },

    }, (err, response) => {
        callback(response.addDataInDB);
    })
}
//Check out API
let checkOut = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                userId: data.userId,
            }
            let orderNumber = util.generateOrderNumber();
            var arr = []
            var count = 0
            userDAO.getCartDetail(criteria, async (err, dbData) => {
                userDAO.quantityOfProduct(criteria, async (err, quantityData) => {

                    userDAO.getAddress(criteria, async (err, getAddress) => {
                        console.log(getAddress, "post")

                        if (err) {
                            cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                        }
                        if (data.lang == 'ar') {


                            for (var i = 0; dbData.length > i; i++) {
                                if (dbData[i].productId == '' && dbData[i].customKandoraId != '') {

                                    var criteria = {
                                        customKandoraId: dbData[i].customKandoraId
                                    }

                                    var kandooraData = await getKandooraData(criteria)

                                    kandooraData.productTitle = kandooraData.titleAR; delete kandooraData.titleAR;
                                    kandooraData.Description = kandooraData.DescriptionAR; delete kandooraData.DescriptionAR;

                                    kandooraData.StyleTitle = kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                    kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                                    kandooraData.colorTitle = kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                                    kandooraData.shadesTitle = kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                                    kandooraData.SideLineTitle = kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                                    kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                                    kandooraData.farukaTitle = kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                                    kandooraData.tarboshTitle = kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;
                                    kandooraData.quantity = kandooraData.quantity;
                                    kandooraData.productPrice = kandooraData.productPrice.toString();
                                    kandooraData.styleImage = util.productUrl() + 'style/' + kandooraData.styleImage;
                                    kandooraData.title; delete kandooraData.title;

                                    kandooraData.type = 'Custom Kandora'
                                    console.log(kandooraData.styleImage, "post")
                                    arr.push(kandooraData)


                                    //let orderNumber = util.generateOrderNumber();
                                    var dataToSet = {
                                        "userId": data.userId,
                                        "orderNumber": orderNumber,
                                        "productId": data.productId ? data.productId : '',
                                        "customKandoraId": dbData[i].customKandoraId ? dbData[i].customKandoraId : '',
                                        "Mid": dbData[i].Mid ? dbData[i].Mid : '0',
                                        "price": dbData[i].price ? dbData[i].price : '',
                                        "quantity": dbData[i].quantity ? dbData[i].quantity : '',
                                        "comments": data.comments ? data.comments : '',
                                        "address": data.address ? data.address : '',
                                        "customerNumber": data.customerNumber ? data.customerNumber : ''
                                    }
                                    userDAO.addOrderDetail(dataToSet, (err, dbData) => { })
                                    var dataToSet1 = {
                                        orderNumber: dataToSet.orderNumber,
                                        orderDate: new Date().toISOString(),
                                        orderPacking: "", orderShipped: "", orderDelivered: "",
                                        paymentType: "", comments: "",
                                        customerNumber: data.customerNumber ? data.customerNumber : '',
                                        orderStatus: '0'
                                    }
                                    userDAO.addOrder(dataToSet1, (err, dbData) => {
                                        console.log(err, "post99999999999999999")
                                    })
                                    // var criteria = {
                                    //     "userId" : data.userId,
                                    //     "customKandoraId": dbData[i].customKandoraId ? dbData[i].customKandoraId : '',
                                    // }
                                    // userDAO.checkOutRemoveCartForCustom(criteria, (err, dbData) => { })
                                }

                                if (dbData[i].customKandoraId == '' && dbData[i].productId != '') {

                                    var criteria = {
                                        productId: dbData[i].productId
                                    }

                                    var kandooraData = await getProductData(criteria)

                                    kandooraData.StyleTitle = kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                    kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                                    kandooraData.colorTitle = kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                                    kandooraData.shadesTitle = kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                                    kandooraData.SideLineTitle = kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                                    kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                                    kandooraData.farukaTitle = kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                                    kandooraData.tarboshTitle = kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;
                                    kandooraData.productName = kandooraData.productNameAR; delete kandooraData.productNameAR;
                                    kandooraData.productTitle = kandooraData.productTitleAR; delete kandooraData.productTitleAR;
                                    kandooraData.productDescription = kandooraData.productDescriptionAR; delete kandooraData.productDescriptionAR;
                                    kandooraData.productImage = util.productUrl() + 'productImage/' + kandooraData.productImage;
                                    kandooraData.quantity = kandooraData.quantity;
                                    kandooraData.styleImage = "";

                                    kandooraData.type = 'Standard Kandora'
                                    arr.push(kandooraData)

                                    //let orderNumber = util.generateOrderNumber();
                                    var dataToSet = {
                                        "userId": data.userId,
                                        "orderNumber": orderNumber,
                                        "productId": dbData[i].productId ? dbData[i].productId : '',
                                        "customKandoraId": data.customKandoraId ? data.customKandoraId : '',
                                        "Mid": dbData[i].Mid ? dbData[i].Mid : '0',
                                        "price": dbData[i].price ? dbData[i].price : '',
                                        "quantity": dbData[i].quantity ? dbData[i].quantity : '',
                                        "comments": data.comments ? data.comments : '',
                                        "address": data.address ? data.address : '',
                                        "customerNumber": data.customerNumber ? data.customerNumber : ''
                                    }
                                    userDAO.addOrderDetail(dataToSet, (err, dbData) => { })
                                    var dataToSet1 = {
                                        orderNumber: dataToSet.orderNumber,
                                        orderDate: new Date().toISOString(),
                                        orderPacking: "", orderShipped: "", orderDelivered: "",
                                        paymentType: "", comments: "",
                                        customerNumber: data.customerNumber ? data.customerNumber : '',
                                        orderStatus: '0'
                                    }
                                    userDAO.addOrder(dataToSet1, (err, dbData) => {
                                        console.log(err, "post99999999999999999")

                                    })
                                    // var criteria = {
                                    //     "userId" : data.userId,
                                    //     "productId": dbData[i].productId ? dbData[i].productId : '',
                                    // }
                                    // userDAO.checkOutRemoveCartForProduct(criteria, (err, dbData) => { })
                                }

                            }

                            if (arr.length == i) {
                                // userDAO.getOrderNumber(criteria,async (err, getOrderNumber) => {

                                cb(null, {
                                    "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": arr, Quantity: quantityData[0].TotalItemsOrdered, Address: getAddress[0] ? getAddress[0] : {
                                        "landMark": "",
                                        "contactName": "",
                                        "address": "",
                                        "addressType": "",
                                        "countryCode": "",
                                        "mobileNumber": ""
                                    }, orderNumber: orderNumber
                                });
                                //  })
                            }


                        } else {

                            for (var i = 0; dbData.length > i; i++) {
                                if (dbData[i].productId == '' && dbData[i].customKandoraId != '') {

                                    var criteria = {
                                        customKandoraId: dbData[i].customKandoraId
                                    }

                                    var kandooraData = await getKandooraData(criteria)

                                    kandooraData.StyleTitle = kandooraData.StyleTitle;
                                    kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitle;
                                    kandooraData.colorTitle = kandooraData.colorTitle;
                                    kandooraData.shadesTitle = kandooraData.shadesTitle;
                                    kandooraData.SideLineTitle = kandooraData.SideLineTitle;
                                    kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitle;
                                    kandooraData.farukaTitle = kandooraData.farukaTitle;
                                    kandooraData.tarboshTitle = kandooraData.tarboshTitle;
                                    kandooraData.productTitle = kandooraData.title;
                                    kandooraData.Description = kandooraData.Description;


                                    kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                    kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                                    kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                                    kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                                    kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                                    kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                                    kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                                    kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;
                                    kandooraData.title; delete kandooraData.title;

                                    kandooraData.titleAR; delete kandooraData.titleAR;
                                    kandooraData.DescriptionAR; delete kandooraData.DescriptionAR;
                                    kandooraData.quantity = kandooraData.quantity;
                                    kandooraData.productPrice = kandooraData.productPrice.toString();
                                    kandooraData.styleImage = util.productUrl() + 'style/' + kandooraData.styleImage;

                                    kandooraData.type = 'Custom Kandora'
                                    arr.push(kandooraData)

                                    //let orderNumber = util.generateOrderNumber();
                                    var dataToSet = {
                                        "userId": data.userId,
                                        "orderNumber": orderNumber,
                                        "productId": data.productId ? data.productId : '',
                                        "customKandoraId": dbData[i].customKandoraId ? dbData[i].customKandoraId : '',
                                        "Mid": dbData[i].Mid ? dbData[i].Mid : '0',
                                        "price": dbData[i].price ? dbData[i].price : '',
                                        "quantity": dbData[i].quantity ? dbData[i].quantity : '',
                                        "comments": data.comments ? data.comments : '',
                                        "address": data.address ? data.address : '',
                                        "customerNumber": data.customerNumber ? data.customerNumber : ''
                                    }
                                    userDAO.addOrderDetail(dataToSet, (err, dbData) => { })
                                    var dataToSet1 = {
                                        orderNumber: dataToSet.orderNumber,
                                        orderDate: new Date().toISOString(),
                                        orderPacking: "", orderShipped: "", orderDelivered: "",
                                        paymentType: "", comments: "",
                                        customerNumber: data.customerNumber ? data.customerNumber : '',
                                        orderStatus: '0'
                                    }
                                    userDAO.addOrder(dataToSet1, (err, dbData) => { })
                                    // var criteria = {
                                    //     "userId" : data.userId,
                                    //     "customKandoraId": dbData[i].customKandoraId ? dbData[i].customKandoraId : '',
                                    // }
                                    // userDAO.checkOutRemoveCartForCustom(criteria, (err, dbData) => { })
                                }

                                if (dbData[i].customKandoraId == '' && dbData[i].productId != '') {

                                    var criteria = {
                                        productId: dbData[i].productId
                                    }

                                    var kandooraData = await getProductData(criteria)

                                    kandooraData.StyleTitle = kandooraData.StyleTitle;
                                    kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitle;
                                    kandooraData.colorTitle = kandooraData.colorTitle;
                                    kandooraData.shadesTitle = kandooraData.shadesTitle;
                                    kandooraData.SideLineTitle = kandooraData.SideLineTitle;
                                    kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitle;
                                    kandooraData.farukaTitle = kandooraData.farukaTitle;
                                    kandooraData.tarboshTitle = kandooraData.tarboshTitle;

                                    kandooraData.productName = kandooraData.productName;
                                    kandooraData.productTitle = kandooraData.productTitle;
                                    kandooraData.productDescription = kandooraData.productDescription;

                                    kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                    kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                                    kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                                    kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                                    kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                                    kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                                    kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                                    kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;

                                    kandooraData.productNameAR; delete kandooraData.productNameAR;
                                    kandooraData.productTitleAR; delete kandooraData.productTitleAR;
                                    kandooraData.productDescriptionAR; delete kandooraData.productDescriptionAR;
                                    kandooraData.styleImage = "";
                                    kandooraData.productImage = util.productUrl() + 'productImage/' + kandooraData.productImage
                                    kandooraData.quantity = kandooraData.quantity;

                                    kandooraData.type = 'Standard Kandora'
                                    arr.push(kandooraData)

                                    //let orderNumber = util.generateOrderNumber();
                                    var dataToSet = {
                                        "userId": data.userId,
                                        "orderNumber": orderNumber,
                                        "productId": dbData[i].productId ? dbData[i].productId : '',
                                        "customKandoraId": data.customKandoraId ? data.customKandoraId : '',
                                        "Mid": dbData[i].Mid ? dbData[i].Mid : '0',
                                        "price": dbData[i].price ? dbData[i].price : '',
                                        "quantity": dbData[i].quantity ? dbData[i].quantity : '',
                                        "comments": data.comments ? data.comments : '',
                                        "address": data.address ? data.address : '',
                                        "customerNumber": data.customerNumber ? data.customerNumber : ''
                                    }
                                    userDAO.addOrderDetail(dataToSet, (err, dbData) => { })
                                    var dataToSet1 = {
                                        orderNumber: dataToSet.orderNumber,
                                        orderDate: new Date().toISOString(),
                                        orderPacking: "", orderShipped: "", orderDelivered: "",
                                        paymentType: "", comments: "",
                                        customerNumber: data.customerNumber ? data.customerNumber : '',
                                        orderStatus: '0'
                                    }
                                    userDAO.addOrder(dataToSet1, (err, dbData) => { })
                                    // var criteria = {
                                    //     "userId" : data.userId,
                                    //     "productId": dbData[i].productId ? dbData[i].productId : '',
                                    // }
                                    // userDAO.checkOutRemoveCartForProduct(criteria, (err, dbData) => { })
                                }

                            }

                            if (arr.length == i) {
                                cb(null, {
                                    "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": arr, Quantity: quantityData[0].TotalItemsOrdered, Address: getAddress[0] ? getAddress[0] :
                                        {
                                            "landMark": "",
                                            "contactName": "",
                                            "address": "",
                                            "addressType": "",
                                            "countryCode": "",
                                            "mobileNumber": ""
                                        }, orderNumber: orderNumber
                                });
                            }
                        }
                        // })
                    })
                })
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

/*******************************ORDER********************************************* */
//Order Details 
let addOrder = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        addDataInDB: (cb) => {
            if (!data.orderId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            // let orderNumber = util.generateOrderNumber();
            var criteria = {
                orderId: data.orderId
            }
            var dataToSet = {
                "MId": data.MId ? data.MId : '0',
                "transactionId": data.transactionId ? data.transactionId : '0',
                "price": data.price ? data.price : '',
                "quantity": data.quantity ? data.quantity : '',
                "comments": data.comments ? data.comments : '',
                "address": data.address ? data.address : '',
                "customerNumber": data.customerNumber ? data.customerNumber : '',
                "orderStatus": 1

            }
            //console.log(dataToSet,"posreerere323244444444444444444444444")

            userDAO.editOrder(criteria, dataToSet, (err, dbData) => {

                console.log(err, dbData, dataToSet, "post")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang] });
                // })
            })

        },

    }, (err, response) => {
        callback(response.addDataInDB);
    })


}

let getOrderList = (data, callback) => {
    console.log(data, "post")
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                orderNumber: data.orderNumber
            }
            var arr = []
            var count = 0
            userDAO.getOrderDetail(criteria, async (err, dbData) => {
                console.log(dbData, "post....")
                var criteria1 = {
                    Mid: dbData[0].Mid
                }
                userDAO.getOrderMeasurement(criteria1, async (err, measuremetDetail) => {
                    console.log(measuremetDetail, "post data.............")
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                    }
                    if (data.lang == 'ar') {


                        for (var i = 0; dbData.length > i; i++) {
                            if (dbData[i].productId == '' && dbData[i].customKandoraId != '') {

                                var criteria = {
                                    customKandoraId: dbData[i].customKandoraId
                                }

                                var kandooraData = await getKandooraData(criteria)

                                kandooraData.Title = kandooraData.titleAR; delete kandooraData.titleAR;
                                kandooraData.Description = kandooraData.DescriptionAR; delete kandooraData.DescriptionAR;

                                kandooraData.StyleTitle = kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                                kandooraData.colorTitle = kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                                kandooraData.shadesTitle = kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                                kandooraData.SideLineTitle = kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                                kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                                kandooraData.farukaTitle = kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                                kandooraData.tarboshTitle = kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;
                                kandooraData.fittingTitle = kandooraData.fittingTitleAR; delete kandooraData.fittingTitleAR;

                                kandooraData.quantity = kandooraData.quantity;
                                kandooraData.styleImage = util.productUrl() + 'style/' + kandooraData.styleImage;

                                kandooraData.type = 'Custom Kandora'
                                console.log(kandooraData.styleImage, "post")
                                arr.push(kandooraData)
                            }

                            if (dbData[i].customKandoraId == '' && dbData[i].productId != '') {

                                var criteria = {
                                    productId: dbData[i].productId
                                }

                                var kandooraData = await getProductData(criteria)
                                kandooraData.Title = kandooraData.productTitleAR; delete kandooraData.productTitleAR;

                                kandooraData.StyleTitle = kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                                kandooraData.colorTitle = kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                                kandooraData.shadesTitle = kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                                kandooraData.SideLineTitle = kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                                kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                                kandooraData.farukaTitle = kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                                kandooraData.tarboshTitle = kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;
                                kandooraData.fittingTitle = kandooraData.fittingTitleAR; delete kandooraData.fittingTitleAR;

                                kandooraData.productName = kandooraData.productNameAR; delete kandooraData.productNameAR;
                                kandooraData.productTitle = kandooraData.productTitleAR; delete kandooraData.productTitleAR;
                                kandooraData.Description = kandooraData.productDescriptionAR; delete kandooraData.productDescriptionAR;
                                kandooraData.productImage = util.productUrl() + 'productImage/' + kandooraData.productImage;
                                kandooraData.styleImage = '';//util.productUrl() + 'style/' + kandooraData.styleImage;
                                // kandooraData.quantity = kandooraData.quantity;
                                kandooraData.type = 'Standard Kandora'
                                arr.push(kandooraData)

                                console.log(kandooraData,"post.........Ambuj..........");

                            }

                        }

                        if (arr.length == i) {
                            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": arr[0], orderData: dbData[0], orderMeasurement: measuremetDetail[0] });
                        }


                    } else {

                        for (var i = 0; dbData.length > i; i++) {
                            if (dbData[i].productId == '' && dbData[i].customKandoraId != '') {

                                var criteria = {
                                    customKandoraId: dbData[i].customKandoraId
                                }

                                var kandooraData = await getKandooraData(criteria)

                                kandooraData.StyleTitle = kandooraData.StyleTitle;
                                kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitle;
                                kandooraData.colorTitle = kandooraData.colorTitle;
                                kandooraData.shadesTitle = kandooraData.shadesTitle;
                                kandooraData.SideLineTitle = kandooraData.SideLineTitle;
                                kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitle;
                                kandooraData.farukaTitle = kandooraData.farukaTitle;
                                kandooraData.tarboshTitle = kandooraData.tarboshTitle;
                                kandooraData.fittingTitle = kandooraData.fittingTitle;
                                kandooraData.Title = kandooraData.title;
                                kandooraData.Description = kandooraData.Description;


                                kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                                kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                                kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                                kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                                kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                                kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                                kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;
                                kandooraData.fittingTitleAR; delete kandooraData.fittingTitleAR;

                                kandooraData.titleAR; delete kandooraData.titleAR;
                                kandooraData.DescriptionAR; delete kandooraData.DescriptionAR;
                                kandooraData.quantity = kandooraData.quantity;
                                kandooraData.styleImage = util.productUrl() + 'style/' + kandooraData.styleImage;

                                kandooraData.type = 'Custom Kandora'
                                arr.push(kandooraData)
                            }

                            if (dbData[i].customKandoraId == '' && dbData[i].productId != '') {

                                var criteria = {
                                    productId: dbData[i].productId
                                }

                                var kandooraData = await getProductData(criteria)
                                kandooraData.Title = kandooraData.productTitle;

                                kandooraData.StyleTitle = kandooraData.StyleTitle;
                                kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitle;
                                kandooraData.colorTitle = kandooraData.colorTitle;
                                kandooraData.shadesTitle = kandooraData.shadesTitle;
                                kandooraData.SideLineTitle = kandooraData.SideLineTitle;
                                kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitle;
                                kandooraData.farukaTitle = kandooraData.farukaTitle;
                                kandooraData.tarboshTitle = kandooraData.tarboshTitle;
                                kandooraData.fittingTitle = kandooraData.fittingTitle;

                                kandooraData.productName = kandooraData.productName;

                                kandooraData.Description = kandooraData.productDescription;
                                kandooraData.productTitle; delete kandooraData.productTitle;

                                kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                                kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                                kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                                kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                                kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                                kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                                kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;
                                kandooraData.fittingTitleAR; delete kandooraData.fittingTitleAR;

                                kandooraData.productNameAR; delete kandooraData.productNameAR;
                                kandooraData.productTitleAR; delete kandooraData.productTitleAR;
                                kandooraData.productDescriptionAR; delete kandooraData.productDescriptionAR;


                                kandooraData.productImage = util.productUrl() + 'productImage/' + kandooraData.productImage
                                kandooraData.styleImage = '';//util.productUrl() + 'style/' + kandooraData.styleImage;

                                kandooraData.quantity = kandooraData.quantity;

                                kandooraData.type = 'Standard Kandora'
                                arr.push(kandooraData)


                            }

                        }

                        if (arr.length == i) {
                            console.log(arr[0],"post.........Ambuj..........");

                            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": arr[0], orderData: dbData[0], orderMeasurement: measuremetDetail[0] });
                            
                        }
                    }
                })
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let getOrderRecieved = (data, callback) => {
    console.log(data, "post")
    async.auto({
        getDatainDB: (cb) => {

            userDAO.getOrderRecieved((err, dbData) => {
                console.log(dbData, err, "opo.................................")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let getOrderShipped = (data, callback) => {
    console.log(data, "post")
    async.auto({
        getDatainDB: (cb) => {

            userDAO.getOrderShipped((err, dbData) => {
                console.log(dbData, err, "opo.................................")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let getOrderDelivered = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {

            userDAO.getOrderDelivered((err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let getOrderDeliveredHistory = (data, callback) => {
    console.log(data, "post")
    async.auto({
        getDatainDB: (cb) => {

            userDAO.getOrderDeliveredHistory((err, dbData) => {
                console.log(dbData, err, "opo.................................")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let getOrderListForUser = (data, callback) => {
    console.log(data, "post")
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                userId: data.userId
            }
            var arr = []
            var count = 0
            userDAO.getOrderDetailForUser(criteria, async (err, dbData) => {
                console.log(dbData, "olololo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                if (data.lang == 'ar') {


                    for (var i = 0; dbData.length > i; i++) {
                        if (dbData[i].productId == '' && dbData[i].customKandoraId != '') {

                            var criteria = {
                                customKandoraId: dbData[i].customKandoraId,
                            }

                            var kandooraData = await getKandooraDataForUser(criteria)

                            kandooraData.Title = kandooraData.titleAR; delete kandooraData.titleAR;
                            kandooraData.Description = kandooraData.DescriptionAR; delete kandooraData.DescriptionAR;

                            kandooraData.StyleTitle = kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                            kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                            kandooraData.colorTitle = kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                            kandooraData.shadesTitle = kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                            kandooraData.SideLineTitle = kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                            kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                            kandooraData.farukaTitle = kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                            kandooraData.tarboshTitle = kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;
                            kandooraData.quantity = kandooraData.quantity;
                            kandooraData.orderNumber = dbData[i].orderNumber;
                            kandooraData.Mid = dbData[i].Mid
                            kandooraData.orderId = dbData[i].orderId
                            kandooraData.createdAt = dbData[i].createdDate
                            kandooraData.orderPacking = dbData[i].orderPacking
                            kandooraData.orderShipped = dbData[i].orderShipped
                            kandooraData.orderDelivered = dbData[i].orderDelivered

                            kandooraData.price = dbData[i].price
                            // kandooraData.
                            kandooraData.styleImage = util.productUrl() + 'style/' + kandooraData.styleImage;

                            kandooraData.type = 'Custom Kandora'
                            console.log(kandooraData.styleImage, "post")
                            arr.push(kandooraData)
                        }

                        if (dbData[i].customKandoraId == '' && dbData[i].productId != '') {

                            var criteria = {
                                productId: dbData[i].productId,

                            }

                            var kandooraData = await getProductDataForUser(criteria)
                            kandooraData.Title = kandooraData.productTitleAR; delete kandooraData.productTitleAR;

                            kandooraData.StyleTitle = kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                            kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                            kandooraData.colorTitle = kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                            kandooraData.shadesTitle = kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                            kandooraData.SideLineTitle = kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                            kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                            kandooraData.farukaTitle = kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                            kandooraData.tarboshTitle = kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;
                            kandooraData.productName = kandooraData.productNameAR; delete kandooraData.productNameAR;
                            kandooraData.productTitle = kandooraData.productTitleAR; delete kandooraData.productTitleAR;
                            kandooraData.Description = kandooraData.productDescriptionAR; delete kandooraData.productDescriptionAR;
                            kandooraData.productImage = util.productUrl() + 'productImage/' + kandooraData.productImage;
                            kandooraData.styleImage = "";
                            kandooraData.quantity = kandooraData.quantity;
                            kandooraData.orderNumber = dbData[i].orderNumber;
                            kandooraData.Mid = dbData[i].Mid
                            kandooraData.orderId = dbData[i].orderId
                            kandooraData.createdAt = dbData[i].createdDate
                            kandooraData.price = dbData[i].price
                            kandooraData.orderPacking = dbData[i].orderPacking
                            kandooraData.orderShipped = dbData[i].orderShipped
                            kandooraData.orderDelivered = dbData[i].orderDelivered
                            kandooraData.type = 'Standard Kandora'
                            arr.push(kandooraData)


                        }

                    }

                    if (arr.length == i) {
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": arr });
                    }


                } else {
                    // arr.push(dbData.orderNumber)

                    for (var i = 0; dbData.length > i; i++) {
                        if (dbData[i].productId == '' && dbData[i].customKandoraId != '') {

                            var criteria = {
                                customKandoraId: dbData[i].customKandoraId,
                            }

                            var kandooraData = await getKandooraDataForUser(criteria)

                            kandooraData.StyleTitle = kandooraData.StyleTitle;
                            kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitle;
                            kandooraData.colorTitle = kandooraData.colorTitle;
                            kandooraData.shadesTitle = kandooraData.shadesTitle;
                            kandooraData.SideLineTitle = kandooraData.SideLineTitle;
                            kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitle;
                            kandooraData.farukaTitle = kandooraData.farukaTitle;
                            kandooraData.tarboshTitle = kandooraData.tarboshTitle;
                            kandooraData.Title = kandooraData.title;
                            kandooraData.Description = kandooraData.Description;


                            kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                            kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                            kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                            kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                            kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                            kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                            kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                            kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;

                            kandooraData.titleAR; delete kandooraData.titleAR;
                            kandooraData.DescriptionAR; delete kandooraData.DescriptionAR;
                            kandooraData.quantity = kandooraData.quantity;
                            kandooraData.styleImage = util.productUrl() + 'style/' + kandooraData.styleImage;
                            kandooraData.orderNumber = dbData[i].orderNumber;
                            kandooraData.Mid = dbData[i].Mid
                            kandooraData.orderId = dbData[i].orderId
                            kandooraData.createdAt = dbData[i].createdDate
                            kandooraData.price = dbData[i].price
                            kandooraData.orderPacking = dbData[i].orderPacking
                            kandooraData.orderShipped = dbData[i].orderShipped
                            kandooraData.orderDelivered = dbData[i].orderDelivered
                            kandooraData.type = 'Custom Kandora'
                            arr.push(kandooraData)
                        }

                        if (dbData[i].customKandoraId == '' && dbData[i].productId != '') {

                            var criteria = {
                                productId: dbData[i].productId,
                            }

                            var kandooraData = await getProductDataForUser(criteria)
                            kandooraData.Title = kandooraData.productTitle;

                            kandooraData.StyleTitle = kandooraData.StyleTitle;
                            kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitle;
                            kandooraData.colorTitle = kandooraData.colorTitle;
                            kandooraData.shadesTitle = kandooraData.shadesTitle;
                            kandooraData.SideLineTitle = kandooraData.SideLineTitle;
                            kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitle;
                            kandooraData.farukaTitle = kandooraData.farukaTitle;
                            kandooraData.tarboshTitle = kandooraData.tarboshTitle;

                            kandooraData.productName = kandooraData.productName;

                            kandooraData.Description = kandooraData.productDescription;
                            kandooraData.productTitle; delete kandooraData.productTitle;

                            kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                            kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                            kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                            kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                            kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                            kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                            kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                            kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;

                            kandooraData.productNameAR; delete kandooraData.productNameAR;
                            kandooraData.productTitleAR; delete kandooraData.productTitleAR;
                            kandooraData.productDescriptionAR; delete kandooraData.productDescriptionAR;


                            kandooraData.productImage = util.productUrl() + 'productImage/' + kandooraData.productImage
                            kandooraData.styleImage = "";

                            kandooraData.quantity = kandooraData.quantity;
                            kandooraData.orderNumber = dbData[i].orderNumber;
                            kandooraData.Mid = dbData[i].Mid
                            kandooraData.orderId = dbData[i].orderId
                            kandooraData.createdAt = dbData[i].createdDate
                            kandooraData.price = dbData[i].price
                            kandooraData.orderPacking = dbData[i].orderPacking
                            kandooraData.orderShipped = dbData[i].orderShipped
                            kandooraData.orderDelivered = dbData[i].orderDelivered
                            kandooraData.type = 'Standard Kandora'
                            arr.push(kandooraData)
                        }
                    }
                    if (arr.length == i) {
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": arr });
                    }
                }
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let getOrderNumber = (data, callback) => {
    console.log(data, "post")
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                userId: data.userId
            }
            userDAO.getOrderNumber(criteria, (err, dbData) => {
                console.log(dbData, "post")
                // dbData.forEach(element => {
                //     element.videoTutorial = util.productUrl() + 'video/' + element.videoTutorial
                // })
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let removeOrderNumber = (data, callback) => {
    console.log(data, "ambuj")
    async.auto({
        removeDataFromDB: (cb) => {
            var criteria = {
                orderNumber: data.orderNumber
            }
            userDAO.removeOrderNumber(criteria, (err, dbData) => {

                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_REMOVE[data.lang] });
            })
        },
    }, (err, response) => {
        callback(response.removeDataFromDB);
    })
}

let addTransaction = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        addDataInDB: (cb) => {
            if (!data.orderNumber) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                orderNumber: data.orderNumber,
                userId: data.userId
            }
            var dataToSet = {
                "transactionId": data.transactionId ? data.transactionId : '0',
                "address": data.address ? data.address : '',
                "customerNumber": data.customerNumber ? data.customerNumber : '',
                "orderStatus": 1
            }
            userDAO.editTransaction(criteria, dataToSet, (err, dbData) => {
                console.log(err, "qwertyuio")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                    return;
                }

                userDAO.removeCartOnPayment(criteria, (err, dbData) => { })
                userDAO.getOrderId(criteria, (err, dbData) => {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang], result: dbData });
                })
            })
        },
    }, (err, response) => {
        callback(response.addDataInDB);
    })
}

let getOrderDetailForUser = (data, callback) => {
    console.log(data, "post")
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                orderId: data.orderId
            }
            var arr = []
            var count = 0
            userDAO.getOrderDetailUser(criteria, async (err, dbData) => {
                console.log(dbData, "post data..................")
                var criteria1 = {
                    Mid: dbData[0].Mid
                }
                userDAO.getOrderMeasurement(criteria1, async (err, measuremetDetail) => {
                    console.log(measuremetDetail, "post data.............")
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                    }
                    if (data.lang == 'ar') {


                        for (var i = 0; dbData.length > i; i++) {
                            if (dbData[i].productId == '' && dbData[i].customKandoraId != '') {

                                var criteria = {
                                    customKandoraId: dbData[i].customKandoraId
                                }

                                var kandooraData = await getKandooraData(criteria)

                                kandooraData.Title = kandooraData.titleAR; delete kandooraData.titleAR;
                                kandooraData.Description = kandooraData.DescriptionAR; delete kandooraData.DescriptionAR;

                                kandooraData.StyleTitle = kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                                kandooraData.colorTitle = kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                                kandooraData.shadesTitle = kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                                kandooraData.SideLineTitle = kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                                kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                                kandooraData.farukaTitle = kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                                kandooraData.tarboshTitle = kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;
                                kandooraData.quantity = dbData[i].quantity;
                                kandooraData.styleImage = util.productUrl() + 'style/' + kandooraData.styleImage;
                                kandooraData.orderStatus = dbData[i].orderStatus;
                                delete kandooraData.cartId;

                                kandooraData.type = 'Custom Kandora'
                                console.log(kandooraData.styleImage, "post")
                                arr.push(kandooraData)
                            }

                            if (dbData[i].customKandoraId == '' && dbData[i].productId != '') {

                                var criteria = {
                                    productId: dbData[i].productId
                                }

                                var kandooraData = await getProductData(criteria)
                                kandooraData.Title = kandooraData.productTitleAR; delete kandooraData.productTitleAR;

                                kandooraData.StyleTitle = kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                                kandooraData.colorTitle = kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                                kandooraData.shadesTitle = kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                                kandooraData.SideLineTitle = kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                                kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                                kandooraData.farukaTitle = kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                                kandooraData.tarboshTitle = kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;
                                kandooraData.productName = kandooraData.productNameAR; delete kandooraData.productNameAR;
                                kandooraData.productTitle = kandooraData.productTitleAR; delete kandooraData.productTitleAR;
                                kandooraData.Description = kandooraData.productDescriptionAR; delete kandooraData.productDescriptionAR;
                                kandooraData.productImage = util.productUrl() + 'productImage/' + kandooraData.productImage;
                                kandooraData.styleImage = util.productUrl() + 'style/' + kandooraData.styleImage;
                                kandooraData.quantity = dbData[i].quantity;
                                kandooraData.orderStatus = dbData[i].orderStatus
                                delete kandooraData.cartId;

                                kandooraData.type = 'Standard Kandora'
                                arr.push(kandooraData)


                            }

                        }

                        if (arr.length == i) {
                            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": arr[0], orderData: dbData[0], orderMeasurement: measuremetDetail[0] });
                        }


                    } else {

                        for (var i = 0; dbData.length > i; i++) {
                            if (dbData[i].productId == '' && dbData[i].customKandoraId != '') {

                                var criteria = {
                                    customKandoraId: dbData[i].customKandoraId
                                }

                                var kandooraData = await getKandooraData(criteria)

                                kandooraData.StyleTitle = kandooraData.StyleTitle;
                                kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitle;
                                kandooraData.colorTitle = kandooraData.colorTitle;
                                kandooraData.shadesTitle = kandooraData.shadesTitle;
                                kandooraData.SideLineTitle = kandooraData.SideLineTitle;
                                kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitle;
                                kandooraData.farukaTitle = kandooraData.farukaTitle;
                                kandooraData.tarboshTitle = kandooraData.tarboshTitle;
                                kandooraData.Title = kandooraData.title;
                                kandooraData.Description = kandooraData.Description;


                                kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                                kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                                kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                                kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                                kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                                kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                                kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;

                                kandooraData.titleAR; delete kandooraData.titleAR;
                                kandooraData.DescriptionAR; delete kandooraData.DescriptionAR;
                                kandooraData.quantity = dbData[i].quantity;
                                kandooraData.styleImage = util.productUrl() + 'style/' + kandooraData.styleImage;
                                kandooraData.orderStatus = dbData[i].orderStatus
                                delete kandooraData.cartId;

                                kandooraData.type = 'Custom Kandora'
                                arr.push(kandooraData)
                            }

                            if (dbData[i].customKandoraId == '' && dbData[i].productId != '') {

                                var criteria = {
                                    productId: dbData[i].productId
                                }

                                var kandooraData = await getProductData(criteria)
                                kandooraData.Title = kandooraData.productTitle;

                                kandooraData.StyleTitle = kandooraData.StyleTitle;
                                kandooraData.typeOfClothTitle = kandooraData.typeOfClothTitle;
                                kandooraData.colorTitle = kandooraData.colorTitle;
                                kandooraData.shadesTitle = kandooraData.shadesTitle;
                                kandooraData.SideLineTitle = kandooraData.SideLineTitle;
                                kandooraData.StitchingTypeTitle = kandooraData.StitchingTypeTitle;
                                kandooraData.farukaTitle = kandooraData.farukaTitle;
                                kandooraData.tarboshTitle = kandooraData.tarboshTitle;

                                kandooraData.productName = kandooraData.productName;

                                kandooraData.Description = kandooraData.productDescription;
                                kandooraData.productTitle; delete kandooraData.productTitle;

                                kandooraData.StyleTitleAR; delete kandooraData.StyleTitleAR;
                                kandooraData.typeOfClothTitleAR; delete kandooraData.typeOfClothTitleAR;
                                kandooraData.colorTitleAR; delete kandooraData.colorTitleAR;
                                kandooraData.shadesTitleAR; delete kandooraData.shadesTitleAR;
                                kandooraData.SideLineTitleAR; delete kandooraData.SideLineTitleAR;
                                kandooraData.StitchingTypeTitleAR; delete kandooraData.StitchingTypeTitleAR;
                                kandooraData.farukaTitleAR; delete kandooraData.farukaTitleAR;
                                kandooraData.tarboshTitleAR; delete kandooraData.tarboshTitleAR;

                                kandooraData.productNameAR; delete kandooraData.productNameAR;
                                kandooraData.productTitleAR; delete kandooraData.productTitleAR;
                                kandooraData.productDescriptionAR; delete kandooraData.productDescriptionAR;

                                delete kandooraData.cartId;
                                kandooraData.productImage = util.productUrl() + 'productImage/' + kandooraData.productImage
                                kandooraData.styleImage = util.productUrl() + 'style/' + kandooraData.styleImage;

                                kandooraData.quantity = dbData[i].quantity;
                                kandooraData.orderStatus = dbData[i].orderStatus

                                kandooraData.type = 'Standard Kandora'
                                arr.push(kandooraData)


                            }

                        }

                        if (arr.length == i) {
                            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": arr[0], orderData: dbData[0], orderMeasurement: measuremetDetail[0] });
                        }
                    }
                })
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let updateOrderPackingStatus = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        editDataInDB: (cb) => {
            if (!data.orderId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
                return;
            }
            var criteria = {
                orderId: data.orderId
            }
            var dataToSet = {
                "orderStatus": '1',
                "orderPacking": new Date().toISOString()
            }

            userDAO.editOrderPackingStatus(criteria, dataToSet, (err, dbData) => {
                console.log(err, "post")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                userDAO.getOrderByUser(criteria, (err, dbData) => {
                    console.log(dbData, "get data......................")
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR })
                    } else {
                        let title = "Order packed successfully"
                        //  let dataType = 'measurement'
                        // let notification = {
                        //     type: 'measurement',
                        // };
                        if (dbData[0].device_token != null) {
                            let notifiyData = {
                                deviceId: dbData[0].device_token,
                                deviceType: dbData[0].device_type,
                                notificationType: 'Order packed',//util.notificationType.NEW_MESSAGE,
                                payload: {
                                    data: "",
                                    // type: dataType,
                                    title: title,
                                }
                            };
                            COMMON.sendNotification(notifiyData);
                            var dataToSet = {
                                title: title,
                                userId: dbData[0].userId,
                                notificationType: notifiyData.notificationType
                            }
                            userDAO.addNotification(dataToSet, (err, dbData) => {
                                console.log(err, "postsdfghjkertyuiertyu")
                            })

                        }
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.SEND_MEASUREMENT[data.lang] })
                    }
                })
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.UPDATE_DATA[data.lang] });
            })
        },

    }, (err, response) => {
        callback(response.editDataInDB);
    })


}

let updateOrderShippedStatus = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        editDataInDB: (cb) => {
            if (!data.orderId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                orderId: data.orderId
            }
            var dataToSet = {
                "orderStatus": '2',
                "orderShipped": new Date().toISOString()
            }

            userDAO.editOrderShippedStatus(criteria, dataToSet, (err, dbData) => {
                console.log(err, "post")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                userDAO.getOrderByUser(criteria, (err, dbData) => {
                    console.log(dbData, "get data......................")
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR })
                    } else {
                        let title = "Order shipped successfully"    //util.statusMessage.SEND_MEASUREMENT.en
                        //  let dataType = 'measurement'
                        // let notification = {
                        //     type: 'measurement',
                        // };
                        if (dbData[0].device_token != null) {
                            let notifiyData = {
                                deviceId: dbData[0].device_token,
                                deviceType: dbData[0].device_type,
                                notificationType: 'Order shipped',//util.notificationType.NEW_MESSAGE,
                                payload: {
                                    data: "",
                                    // type: dataType,
                                    title: title,
                                }
                            };
                            COMMON.sendNotification(notifiyData);
                            var dataToSet = {
                                title: title,
                                userId: dbData[0].userId,
                                notificationType: notifiyData.notificationType
                            }
                            userDAO.addNotification(dataToSet, (err, dbData) => {
                                console.log(err, "postsdfghjkertyuiertyu")
                            })

                        }
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.SEND_MEASUREMENT[data.lang] })
                    }
                })
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.UPDATE_DATA[data.lang] });
                // })
            })
        },

    }, (err, response) => {
        callback(response.editDataInDB);
    })
}

let updateOrderDeliveredStatus = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        editDataInDB: (cb) => {
            if (!data.orderId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                orderId: data.orderId
            }
            var dataToSet = {
                "orderStatus": '3',
                "orderDelivered": new Date().toISOString()
            }

            userDAO.editOrderDeliveredStatus(criteria, dataToSet, (err, dbData) => {
                console.log(err, "post")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                userDAO.getOrderByUser(criteria, (err, dbData) => {
                    console.log(dbData, "get data......................")
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR })
                    } else {
                        let title = "Order delivered successfully"//util.statusMessage.SEND_MEASUREMENT.en
                        //  let dataType = 'measurement'
                        // let notification = {
                        //     type: 'measurement',
                        // };
                        if (dbData[0].device_token != null) {
                            let notifiyData = {
                                deviceId: dbData[0].device_token,
                                deviceType: dbData[0].device_type,
                                notificationType: 'Order delivered',//util.notificationType.NEW_MESSAGE,
                                payload: {
                                    data: "",
                                    // type: dataType,
                                    title: title,
                                }
                            };
                            COMMON.sendNotification(notifiyData);
                            var dataToSet = {
                                title: title,
                                userId: dbData[0].userId,
                                notificationType: notifiyData.notificationType
                            }
                            userDAO.addNotification(dataToSet, (err, dbData) => {
                                console.log(err, "postsdfghjkertyuiertyu")
                            })

                        }
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.SEND_MEASUREMENT[data.lang] })
                    }
                })
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.UPDATE_DATA[data.lang] });
                // })
            })
        },

    }, (err, response) => {
        callback(response.editDataInDB);
    })
}
/******************************************************************************************/
let getSendNotification = (data, callback) => {
    async.auto({
        checkTCExistsinDB: (cb) => {
            if (!data.userId) {
                cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR })
            }
            let criteria = {
                userId: data.userId
            }
            userDAO.getSentNotification(criteria, (err, dbData) => {
                console.log(dbData, "notification")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR })
                } else {
                    let title = 'New Chat Message'
                    let message = ' has sent you a new chat message'
                    //     let chatData = {
                    //         userId: res.sender_profile.userId, 
                    //         name: res.sender_profile.name, 
                    //         profile_picture: res.sender_profile.profile_picture,
                    //         message: chat.message, 
                    //         date_added: chat.date_added
                    //     };
                    if (dbData[0].device_token != null) {
                        let notifiyData = {
                            deviceId: dbData[0].device_token,
                            deviceType: dbData[0].device_type,
                            messageType: 'Test Notification',//util.notificationType.NEW_MESSAGE,
                            payload: {
                                data: "chatData",
                                message: message,
                                title: title,
                            }
                        };

                        COMMON.sendNotification(notifiyData);
                    }
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.SEND_MEASUREMENT[data.lang] })

                }
            });
        }
    }, (err, response) => {
        callback(response.checkTCExistsinDB);
    })
}
/**************************************NOTIFICATION****************************************************/
let getNotificationList = (data, callback) => {
    console.log(data, "post")
    async.auto({
        getDatainDB: (cb) => {
            if (!data.userId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                userId: data.userId
            }
            userDAO.getNotification(criteria, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}
/**************************************VIDEO*****************************************************/
let addVideoTutorial = (data, files, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        addDataInDB: (cb) => {
            var dataToSet = {
                videoTutorial: files.videoTutorial[0].filename,
            }
            userDAO.addVideo(dataToSet, (err, dbData) => {
                console.log(err, "post")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang] });
                // })
            })
        },

    }, (err, response) => {
        callback(response.addDataInDB);
    })


}

let getVideoLink = (data, callback) => {
    console.log(data, "post")
    async.auto({
        getDatainDB: (cb) => {
            userDAO.getVideoLink((err, dbData) => {
                dbData.forEach(element => {
                    element.videoTutorial = util.productUrl() + 'video/' + element.videoTutorial
                })
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData[0] });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let getAllVideoLink = (data, callback) => {
    console.log(data, "post")
    async.auto({
        getDatainDB: (cb) => {
            userDAO.getAllVideoLink((err, dbData) => {
                dbData.forEach(element => {
                    element.videoTutorial = util.productUrl() + 'video/' + element.videoTutorial
                })
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

/********************************FAQ******************************************/
// pending
let addFAQ = (data, callback) => {
    console.log(data, "Ambuj.........................................")
    async.auto({
        addDataInDB: (cb) => {
            var dataToSet = {
                question: data.question ? data.question : '',
                questionAR: data.questionAR ? data.questionAR : '',
                answer: data.answer ? data.answer : '',
                answerAR: data.answerAR ? data.answerAR : ''
            }

            userDAO.addFandQ(dataToSet, (err, dbData) => {
                console.log(err, "post")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_ADD[data.lang] });
                // })
            })
        },

    }, (err, response) => {
        callback(response.addDataInDB);
    })


}

let getFAQ = (data, callback) => {
    console.log(data, "post")
    async.auto({
        getDatainDB: (cb) => {
            var criteria = {
                search: data.search ? data.search : ''
            }
            if (data.lang == 'ar') {

                userDAO.getFAQAR(criteria, (err, dbData) => {
                    dbData.forEach(element => {
                        element.question = element.questionAR; delete element.questionAR;
                        element.answer = element.answerAR; delete element.answerAR;
                    });
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
                    }
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
                })
            } else if (data.lang == 'en') {
                userDAO.getFAQ(criteria, (err, dbData) => {
                    dbData.forEach(element => {
                        element.question = element.question;
                        element.answer = element.answer;

                        element.questionAR; delete element.questionAR;
                        element.answerAR; delete element.answerAR;
                    });
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
                    }
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
                })
            }

        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

let getFAQAdmin = (data, callback) => {
    console.log(data, "post")
    async.auto({
        getDatainDB: (cb) => {
            userDAO.getFAQAdmin((err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
            })


        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

/************************************Transaction***************************************/
let getOrderTransaction = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            userDAO.getOrderTransaction((err, dbData) => {
                // dbData.forEach(element => {
                //     element.videoTutorial = util.productUrl() + 'video/' + element.videoTutorial
                // })
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

/***************************************************************************************************************/
let getFilterByPrice = (data, callback) => {
    console.log(data, "post")
    async.auto({
        getDatainDB: (cb) => {
            if (!data.lowPrice) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                lowPrice: data.lowPrice,
                highPrice: data.highPrice
            }
            userDAO.getFilterByPrice(criteria, (err, dbData) => {
                dbData.forEach(element => {
                    element.productImage = util.productUrl() + 'productImage/' + element.productImage
                })
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
                }
                if (data.lang == 'ar') {
                    dbData.forEach(element => {
                        element.productName = element.productNameAR; delete element.productNameAR;
                        element.productTitle = element.productTitleAR; delete element.productTitleAR;
                        element.productDescription = element.productDescriptionAR; delete element.productDescriptionAR;

                    });
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
                } else {
                    dbData.forEach(element => {
                        element.productName = element.productName;
                        element.productTitle = element.productTitle;
                        element.productDescription = element.productDescription;


                        element.productNameAR; delete element.productNameAR;
                        element.productTitleAR; delete element.productTitleAR;
                        element.productDescriptionAR; delete element.productDescriptionAR;

                    });
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
                }
                // cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}

/***************************************************************************************************************/
let getRevenue = (data, callback) => {
    async.auto({
        getDatainDB: (cb) => {
            userDAO.getRevenue((err, dbData) => {
                console.log(dbData, err, "opo")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData[0] });
            })
        },
    }, (err, response) => {
        callback(response.getDatainDB);
    })
}


module.exports = {
    addProduct,
    addPromotion,
    editPromotion,
    getFilterByPrice,
    getAllProduct,
    getProduct,
    addOfferOnProduct,
    getHomeDetails,
    getProductForAdmin,
    editProductAdmin,
    //****************START */
    addstyle,
    editstyle,
    addCloth,
    editCloth,
    addColors,
    editColors,
    addShade,
    editShade,
    addSideLine,
    editSideLine,
    addStitching,
    editStitching,
    addFaruka,
    editFaruka,
    addTarbosh,
    editTarbosh,
    addFitting,
    editFitting,
    //*****************END */
    //getfabric,
    getfabrics,

    //**************Save Fabric ***/
    addFabric,
    getCustomKandora,
    getAllCustomKandora,
    getAllSortProduct,
    addStandardCustomKandora,
    /********************Standard**********************/
    addCustomKandora,
    removeCloth,
    removeColor,
    removeFaruka,
    removeShades,
    removeSideLines,
    removeStitchingType,
    removeStyle,
    removeTarbosh,
    removeProduct,

    /*****************************/
    getAllOffer,
    editOffer,
    removeOffer,
    /********************************** */
    getClothData,
    getStyleAdmin,
    getColorAdmin,
    getShadeAdmin,
    getSideLineAdmin,
    getStitchingAdmin,
    getFarukaAdmin,
    getTarboshAdmin,
    getFittingAdmin,

    getAllProductAdmin,
    getBannerById,
    getAllBanner,
    getCustomDetail,
    /***************/
    addCart,
    addCardDetail,
    getCartDetails,
    updateUserKeyInCart,
    removeCart,
    updateQuantity,

    /*****************/
    addMeasurement,
    getMeasurement,
    updateIsSelected,
    removeMeasurement,
    getFreeMeasurement,
    getPaidMeasurement,
    viewMeasurement,
    checkMPayment,
    addMTransaction,
    /********************/
    addCheckOut,
    checkOut,
    addOrder,
    getOrderList,
    getOrderListForUser,
    addFAQ,
    getFAQ,
    getFAQAdmin,
    getSendNotification,

    getNotificationList,
    addVideoTutorial,
    getVideoLink,
    getAllVideoLink,
    /****************************************************/
    getOrderRecieved,
    getOrderDeliveredHistory,
    getOrderNumber,
    removeOrderNumber,
    getOrderShipped,
    getOrderDelivered,
    addTransaction,
    getOrderDetailForUser,
    updateOrderPackingStatus,
    updateOrderShippedStatus,
    updateOrderDeliveredStatus,
    /************************************************Transaction****************************************** */
    getOrderTransaction,
    addMeasurementPriceHistory,
    getMeasurementPriceHistory,
    getMeasurementHistoryForUser,
    removePromotion,
    getRevenue,
    removeFitting,
};
let dbConfig = require("../Utilities/dbConfig");

async function getProductData(data) {
    return new Promise((resolve, reject) => {
        let conditions = "";
        data.productId ? conditions += ` pd.productId = '${data.productId}'` : true;
        var query = `SELECT pd.productId,pd.productName,pd.productNameAR, pd.productTitle,pd.productTitleAR,pd.productDescription,pd.productDescriptionAR,pd.productType,pi.productImage, 
        st.styleId,st.StyleTitle,st.StyleTitleAR,styleImage,
        tc.clothId, tc.typeOfClothTitle, tc.typeOfClothTitleAR,
        c.colorId,c.colorTitle,c.colorTitleAR,
        sh.shadeId, sh.shadesTitle,sh.shadesTitleAR,
        sc.lineId,sc.SideLineTitle,sc.SideLineTitleAR,
        sti.stitchingId,sti.StitchingTypeTitle,sti.StitchingTypeTitleAR,
        f.farukaId, f.farukaTitle,f.farukaTitleAR,
        fi.fittingTitle,fi.fittingTitleAR,fi.fittingId,

        ta.tarboshId,ta.tarboshTitle,ta.tarboshTitleAR,ac.quantity,cartId,pd.productPrice
        FROM productDetails as pd 
        LEFT JOIN style as st on st.styleId = pd.style
        LEFT JOIN typeOfCloth as tc on tc.clothId = pd.typeOfCloth
        LEFT JOIN colors as c on c.colorId = pd.color
        LEFT JOIN shades as sh on sh.shadeId = pd.shades
        LEFT JOIN sideLines as sc on sc.lineId = pd.sideLine
        LEFT JOIN stitchingType as sti on sti.stitchingId = pd.stitchingType
        LEFT JOIN faruka as f on f.farukaId= pd.faruka
        LEFT JOIN tarbosh as ta on ta.tarboshId= pd.turbosh
        LEFT JOIN fitting as fi on fi.fittingId= pd.fitting 

        LEFT JOIN addCart as ac on ac.productId = pd.productId
        LEFT JOIN productImage as pi on pi.productId = pd.productId where  ${conditions} 
        GROUP BY pi.productId
        ORDER BY pi.productId`

        dbConfig.getDB().query(query, (err3, dbData3) => {
            // console.log('promise=================>>>>>>>>>>>>', err3, dbData3)
            if (err3) {
                reject(err3);
            } else {
                resolve(dbData3[0])
            }
        })

    })
}

async function getKandooraData(data) {
    return new Promise((resolve, reject) => {
        var conditions = "";
        data.customKandoraId ? conditions += `pd.customKandoraId = '${data.customKandoraId}'` : true;
        dbConfig.getDB().query(`SELECT pd.customKandoraId,pd.title,pd.titleAR,pd.DescriptionAR,
   st.StyleTitle,st.StyleTitleAR,styleImage,
   tc.typeOfClothTitle,tc.typeOfClothTitleAR,
   c.colorTitle,c.colorTitleAR, sh.shadesTitle,sh.shadesTitleAR,sc.SideLineTitle,sc.SideLineTitleAR,
   sti.StitchingTypeTitle,sti.StitchingTypeTitleAR,
   f.farukaTitle,f.farukaTitleAR,ta.tarboshTitle,ta.tarboshTitleAR,
   fi.fittingTitle,fi.fittingTitleAR,fi.fittingId,
   pd.Description,pd.price,pd.productType,isPaid,quantity,cartId,
   (tc.price + st.price + c.price + sh.price + sc.price + sti.price + f.price + ta.price ) as productPrice
   FROM customKandora as pd
   LEFT JOIN style as st on st.styleId = pd.style
   LEFT JOIN typeOfCloth as tc on tc.clothId = pd.typeOfCloth
   LEFT JOIN colors as c on c.colorId = pd.color
   LEFT JOIN shades as sh on sh.shadeId = pd.shades
   LEFT JOIN sideLines as sc on sc.lineId = pd.sideLine
   LEFT JOIN stitchingType as sti on sti.stitchingId = pd.stitchingType
   LEFT JOIN faruka as f on f.farukaId= pd.faruka
   LEFT JOIN tarbosh as ta on ta.tarboshId= pd.turbosh 
   LEFT JOIN fitting as fi on fi.fittingId= pd.fitting 
   LEFT JOIN addCart as ac on ac.customKandoraId = pd.customKandoraId

   WHERE ${conditions}`, (err, dbData) => {

                // console.log("getKandooraData=================>>>>>>>>>>>",err,dbData)
                if (err) {
                    reject(err);
                } else {
                    resolve(dbData[0])
                }
            });

    })
}






async function getProductDataForUser(data) {
    return new Promise((resolve, reject) => {
        let conditions = "";
        data.productId ? conditions += ` pd.productId = '${data.productId}'` : true;
        //data.userId ? conditions += `userId ='${data.userId}'` : true;
        var query = `SELECT 
        pd.productId,pd.productName,pd.productNameAR, pd.productTitle,pd.productTitleAR,pd.productDescription,pd.productDescriptionAR,pd.productPrice,pd.productType,pi.productImage, 
        st.styleId,st.StyleTitle,st.StyleTitleAR,styleImage,
        tc.clothId, tc.typeOfClothTitle, tc.typeOfClothTitleAR,
        c.colorId,c.colorTitle,c.colorTitleAR,
        sh.shadeId, sh.shadesTitle,sh.shadesTitleAR,
        sc.lineId,sc.SideLineTitle,sc.SideLineTitleAR,
        sti.stitchingId,sti.StitchingTypeTitle,sti.StitchingTypeTitleAR,
        f.farukaId, f.farukaTitle,f.farukaTitleAR,
        ta.tarboshId,ta.tarboshTitle,ta.tarboshTitleAR,ac.quantity,cartId,
        fi.fittingTitle,fi.fittingTitleAR,fi.fittingId,
        pd.productPrice
        FROM productDetails as pd 
        LEFT JOIN style as st on st.styleId = pd.style
        LEFT JOIN typeOfCloth as tc on tc.clothId = pd.typeOfCloth
        LEFT JOIN colors as c on c.colorId = pd.color
        LEFT JOIN shades as sh on sh.shadeId = pd.shades
        LEFT JOIN sideLines as sc on sc.lineId = pd.sideLine
        LEFT JOIN stitchingType as sti on sti.stitchingId = pd.stitchingType
        LEFT JOIN faruka as f on f.farukaId= pd.faruka
        LEFT JOIN tarbosh as ta on ta.tarboshId= pd.turbosh
        LEFT JOIN addCart as ac on ac.productId = pd.productId
        LEFT JOIN fitting as fi on fi.fittingId= pd.fitting 

        LEFT JOIN productImage as pi on pi.productId = pd.productId where  ${conditions} 
        GROUP BY pi.productId
        ORDER BY pi.productId`

        dbConfig.getDB().query(query, (err3, dbData3) => {
            if (err3) {
                reject(err3);
            } else {
                resolve(dbData3[0])
            }
        })

    })
}

async function getKandooraDataForUser(data) {
    return new Promise((resolve, reject) => {
        var conditions = "";
        data.customKandoraId ? conditions += `pd.customKandoraId = '${data.customKandoraId}'` : true;
        dbConfig.getDB().query(`SELECT pd.customKandoraId,pd.title,pd.titleAR,pd.DescriptionAR,
   st.StyleTitle,st.StyleTitleAR,styleImage,
   tc.typeOfClothTitle,tc.typeOfClothTitleAR,
   c.colorTitle,c.colorTitleAR, sh.shadesTitle,sh.shadesTitleAR,sc.SideLineTitle,sc.SideLineTitleAR,
   sti.StitchingTypeTitle,sti.StitchingTypeTitleAR,
   f.farukaTitle,f.farukaTitleAR,ta.tarboshTitle,ta.tarboshTitleAR,pd.Description,pd.price,pd.productType,isPaid,quantity,cartId,
   (tc.price + st.price + c.price + sh.price + sc.price + sti.price + f.price + ta.price ) as productPrice FROM customKandora as pd
   LEFT JOIN style as st on st.styleId = pd.style
   LEFT JOIN typeOfCloth as tc on tc.clothId = pd.typeOfCloth
   LEFT JOIN colors as c on c.colorId = pd.color
   LEFT JOIN shades as sh on sh.shadeId = pd.shades
   LEFT JOIN sideLines as sc on sc.lineId = pd.sideLine
   LEFT JOIN stitchingType as sti on sti.stitchingId = pd.stitchingType
   LEFT JOIN faruka as f on f.farukaId= pd.faruka
   LEFT JOIN tarbosh as ta on ta.tarboshId= pd.turbosh 
   LEFT JOIN addCart as ac on ac.customKandoraId = pd.customKandoraId 


   WHERE ${conditions}`, (err, dbData) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(dbData[0])
                }
            });

    })
}