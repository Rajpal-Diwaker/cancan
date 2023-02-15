let config = require("./config").config,
    mustache = require('mustache'),
    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer'),
    MD5 = require("md5");
let templates = require('../Utilities/templates');

//let urlPublic = '/var/www/html/QouchPotato/public/';

var querystring = require('querystring');


let encryptData = (stringToCrypt) => {
    return MD5(stringToCrypt);
};

// Define Error Codes
let statusCode = {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    OK: 200,
    TWO_ZERO_TWO: 202,
    FOUR_ZERO_FOUR: 404,
    FOUR_ZERO_ZERO: 400,
    FOUR_ZERO_ONE: 401,
    BAD_REQUEST: 404,
    INTERNAL_SERVER_ERROR: 500,
    FIVE_ZERO_ZERO: 500
};

let statusMessage = {
    REGISTRATION_DONE: {
        en:'Registration successful.',
        ar: 'تم التسجيل بنجاح'
    },

    LOGGED_IN: {
        en:'You have successfully logged in',
        ar: 'لقد قمت بتسجيل الدخول بنجاح'
    },

    COMPLETE: {
        en:'Complete your profile',
        ar: 'أكمل ملفك الشخصي'
    },
    PARAMS_MISSING: {
        en:'Mandatory fields missing',
        ar: 'الحقول الإلزامية مفقودة'
    },
    SERVER_BUSY: {
        en:'Mandatory fields missing',
        ar: 'فشل الاتصال بالخادم. الرجاء معاودة المحاولة في وقت لاحق.'
    },
    INCORRECT_PASSWORD: {
        en:'Please enter correct password.',
        ar: 'الرجاء إدخال كلمة المرور القديمة الصحيحة.'
    },

    LOGOUT: {
        en:'You are now signed out.',
        ar: 'أنت الآن مسجل.'
    },

    PASSWORD_CHANGED: {
        en:'Your Password has been changed successfully',
        ar: 'تم تغيير كلمة مرورك بنجاح'
    },
    PAGE_NOT_FOUND: {
        en:'Page not found',
        ar: 'الصفحة غير موجودة'
    },
    USER_NOT_FOUND: {
        en:'User does not exist',
        ar: 'المستخدم غير موجود'
    },
    DB_ERROR: {
        en:'Database related error occurred.',
        ar: 'حدث خطأ متعلق بقاعدة البيانات.'
    },
    EMAIL_NOT_REGISTERED: {
        en:'Email id is not registered',
        ar: 'معرف البريد الإلكتروني غير مسجل'
    },
    INTERNAL_SERVER_ERROR: {
        en:'Internal server error.',
        ar: 'خطأ في الخادم الداخلي.'
    },
    SOMETHING_WENT_WRONG: {
        en:'Something went wrong.',
        ar: 'هناك خطأ ما.'
    },

    FETCHED_SUCCESSFULLY: {
        en:'Fetched Data Successfully.',
        ar: 'جلب البيانات بنجاح.'
    },
    UPLOAD_SUCCESSFUL: {
        en:'Uploaded Image Successfully.',
        ar: 'تم تحميل الصورة بنجاح.'
    },
    STATUS_UPDATED: {
        en:'Status updated successfully.',
        ar: 'تم تحديث الحالة بنجاح.'
    },
    DEVICE_tOKEN_UPDATE: {
        en:'Device token update successfully.',
        ar: 'تحديث رمز الجهاز بنجاح.'
    },
    LOGIN_SUCCESS: {
        en:'you are successfully login.',
        ar: 'أنت تسجيل الدخول بنجاح.'
    },
    USER_EXISTS: {
        en:'User already exists for provided email.',
        ar: 'المستخدم موجود بالفعل للبريد الإلكتروني المقدم.'
    },
    INCORRECT_CREDENTIALS: {
        en:'Incorrect email or password.',
        ar: 'بريد أو كلمة مرورغير صحيحة.'
    },
    INCORRECT_EMAIL: {
        en:'Please enter correct email.',
        ar: 'الرجاء إدخال البريد الإلكتروني الصحيح.'
    }, OTP_VERIFICATION: {
        en:'Otp verified successfully.',
        ar: 'Otp التحقق بنجاح.'
    }, OTP_NOT_MATCH: {
        en:'Please enter correct OTP.',
        ar: 'الرجاء إدخال OTP الصحيح.'
    }, MOBILE_NO_NOT_MATCH: {
        en:'Mobile Number does not exist',
        ar: 'رقم الجوال غير موجود'
    }, ADD_ADDRESS: {
        en:'New Address added successfully',
        ar: 'تمت إضافة عنوان جديد بنجاح'
    }, REMOVE_ADDRESS: {
        en:'User address removed successfully',
        ar: 'تمت إزالة عنوان المستخدم بنجاح'
    }, EMAIL_SENT: {
        en:'An email with password reset link has been sent to your registered email id',
        ar: 'تم إرسال بريد إلكتروني يحتوي على رابط إعادة تعيين كلمة المرور إلى معرف بريدك الإلكتروني المسجل'
    }, INVALID_TOKEN: {
        en:'User Authentication Failed.',
        ar: 'فشلت مصادقة المستخدم.'
    }, GET_DATA: {
        en:'User data fetch successfully.',
        ar: 'جلب بيانات المستخدم بنجاح.'
    },POST: {
        en:'Post data fetch successfully',
        ar: 'نشر البيانات جلب بنجاح'
    }, USERNAME: {
        en:'This username is already taken!',
        ar: 'أسم المستخدم مأخوذ مسبقا!'
    }, USER_DATA_FETCH: {
        en:'User data fetch successfully',
        ar: 'جلب بيانات المستخدم بنجاح'
    },PRODUCTADD: {
        en:'Product created Successfully',
        ar: 'تم إنشاء المنتج بنجاح'
    },OFFER_ADD: {
        en:'New offer added Successfully',
        ar: 'تم إضافة عرض جديد بنجاح'
    },PROMOTION_ADD: {
        en:'New Promotion added Successfully',
        ar: 'تمت إضافة ترويج جديد بنجاح'
    },STYLE_EDIT: {
        en:'style edit Successfully',
        ar: 'تحرير الاسلوب بنجاح'
    },USER_DATA: {
        en:'User data fetch successfully',
        ar: 'جلب بيانات المستخدم بنجاح'
    },PRODUCT_EDIT: {
        en:'Product edit Successfully',
        ar: 'تحرير المنتج بنجاح'
    },DATA_FATCH: {
        en:'Data fetch successfully',
        ar: 'جلب البيانات بنجاح'
    },DATA_ADD: {
        en:'New added Successfully',
        ar: 'جديد تمت إضافته بنجاح'
    },DATA_EDIT: {
        en:'Data edit successfully',
        ar: 'تحرير البيانات بنجاح'
    },CUSTOM_KANDORA_ADD: {
        en:'New custom kandora added Successfully',
        ar: 'تم إضافة كندوره مخصص جديد بنجاح'
    },DATA_REMOVE: {
        en:'Data remove successfully',
        ar: 'إزالة البيانات بنجاح'
    },MEASUREMENT_ADD: {
        en:'Measurement detail added Successfully',
        ar: 'تمت إضافة تفاصيل القياس بنجاح'
    },UPDATE_DATA: {
        en:'Data updated Successfully',
        ar: 'تم تحديث البيانات بنجاح'
    },
    RESEND_OTP: {
        en:'Resend OTP successfully',
        ar: 'إعادة إرسال OTP بنجاح'
    },UPDATA_FB_ID: {
        en:'Fb id updated in existing email address',
        ar: 'معرف Fb المحدثة في عنوان البريد الإلكتروني الحالي'
    },UPDATE_EMAIL_ID: {
        en:'Email id updated in existing Fb Id address',
        ar: 'تم تحديث معرف البريد الإلكتروني في عنوان معرف Fb الحالي'
    },UPDATE_GOOGLE_ID: {
        en:'Google id updated in existing email address',
        ar: 'تم تحديث معرف Google في عنوان البريد الإلكتروني الحالي'
    },MEASUREMENTPAYMENT: {
        en:'Please Pay for measurement',
        ar: 'يرجى دفع للقياس'
    },FREEMEASUREMENTPAYMENT: {
        en:'Please use your first free measurement',
        ar: 'يرجى استخدام القياس الأول مجانا'
    },DATA_NOT_FOUND: {
        en:'Data not found',
        ar: 'لم يتم العثور على بيانات'
    },SEND_MEASUREMENT: {
        en:'Measurement added successfully',
        ar: 'تم إضافة القياس بنجاح'
    }, USER_ADDED:{
        en : "User created successfully.",
        ar : "تم إنشاء المستخدم بنجاح."
    },ITEM_ADDED: {
        en:'Item added successfully in cart',
        ar: 'تم إضافة العنصر بنجاح في السلة'
    },data: {
        en:'',
        ar: ''
    },data: {
        en:'',
        ar: ''
    },data: {
        en:'',
        ar: ''
    },


};

let getMysqlDate = (rawDate) => {
    let date = new Date(rawDate);
    return date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2);
}

let mailModule = nodemailer.createTransport(config.EMAIL_CONFIG);

let sendEmail = (data) => {
    var mailOptions = {
        from: templates.mailTemplate.from,
        to: data.email,
        subject: templates.mailTemplate.subject,
        html: mustache.render(templates.mailTemplate.text, data)
    }
    mailModule.sendMail(mailOptions);
}

let sendEmailByAdmin = (data) => {
    var mailOptions = {
        from: templates.mailTemplateForAdmin.from,
        to: data.email,
        subject: templates.mailTemplateForAdmin.subject,
        html: mustache.render(templates.mailTemplateForAdmin.text, data)
    }
    mailModule.sendMail(mailOptions);
}


let generateToken = () => {
    return Date.now() + Math.floor(Math.random() * 99999) + 1000;
}

let generateOtp =() => {
    return Math.floor(1000 + Math.random() * 9000);
    //return 1234;
}

let fileUrl = (imgDir, fileName) => {
    return 'http://localhost:4001/' + imgDir + '/' + fileName;
}
let productUrl = () => {
    // return 'http://localhost:9898/media/';
     return 'http://13.126.131.184:9898/media/';
}
let promotionUrl = () => {
    return 'http://13.126.131.184:9898/media/';
}

let generateOrderNumber = () => {
    //return Date.now() + Math.floor(Math.random() * 99999) + 1000;
    return Date.now() + Math.floor(Math.random() * 99999) + 1000;

}

module.exports = {
    statusCode: statusCode,
    statusMessage: statusMessage,
    getMysqlDate: getMysqlDate,
    encryptData: encryptData,
    sendEmail: sendEmail,
    generateToken: generateToken,
    fileUrl: fileUrl,
    generateOtp: generateOtp,
    productUrl: productUrl,
    promotionUrl : promotionUrl,
    generateOrderNumber:generateOrderNumber,
    sendEmailByAdmin : sendEmailByAdmin,
}
