'use strict';

let dbConfig = require("../Utilities/dbConfig");


let addProduct = (dataToSet, callback) => {
    dbConfig.getDB().query("insert into productDetails set ? ", dataToSet, callback);
}

let addOffer = (dataToSet, callback) => {
    dbConfig.getDB().query("insert into offer set ? ", dataToSet, callback);
}

let addPromotion = (dataToSet, callback) => {
    dbConfig.getDB().query("insert into promotion set ? ", dataToSet, callback); 
}

let addFabric = (dataToSet, callback) => {
   dbConfig.getDB().query("insert into customKandora set ? ", dataToSet, callback); 
}


let addMeasurement = (dataToSet, callback) => {
   dbConfig.getDB().query("insert into measurement set ? ", dataToSet, callback);
}

let addTMeasurement = (dataToSet, callback) => {
   dbConfig.getDB().query("insert into mTransaction set ? ", dataToSet, callback);
}


let addMeasurementHistory = (dataToSet, callback) => {
   dbConfig.getDB().query("insert into measurementPriceHistory set ? ", dataToSet, callback);
}

let getMeasurementHistory = (callback) => {
   
   dbConfig.getDB().query(`SELECT * FROM measurementPriceHistory ORDER BY createdAt DESC`, callback);
}

let getMeasurementHistoryForUser = (callback) => {
   
   dbConfig.getDB().query(`SELECT * FROM measurementPriceHistory ORDER BY createdAt DESC`, callback);
}

//**************************select faberic DAO********************************** */
// Add faberic DAO 
let addStyle = (dataToSet, callback) => {

    var query = `insert into style set ?`

    dbConfig.getDB().query(query, dataToSet, callback); 
}

let editStyle = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.StyleTitle ? setData += `StyleTitle = '${dataToSet.StyleTitle}'` : true;
    dataToSet.StyleTitleAR ? setData += `,StyleTitleAR = '${dataToSet.StyleTitleAR}'` : true;

    dataToSet.price ? setData += `,price = '${dataToSet.price}'` : true;

    dataToSet.styleImage ? setData += `,styleImage = '${dataToSet.styleImage}'` : true;
    dataToSet.styleDescription ? setData += `,styleDescription = '${dataToSet.styleDescription}'` : true;
    dataToSet.styleDescriptionAR ? setData += `,styleDescriptionAR = '${dataToSet.styleDescriptionAR}'` : true;

   let conditions = "";
   criteria.styleId ? conditions += `styleId ='${criteria.styleId}'` : true;

   dbConfig.getDB().query(`UPDATE style SET ${setData} where ${conditions} `, callback);
}

let addCloth = (dataToSet, callback) => {
    
    var query = `insert into typeOfCloth set ?`

    dbConfig.getDB().query(query, dataToSet, callback); 
}

let editCloth = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.typeOfClothTitle ? setData += `typeOfClothTitle = '${dataToSet.typeOfClothTitle}'` : true;
    dataToSet.typeOfClothTitleAR ? setData += `,typeOfClothTitleAR = '${dataToSet.typeOfClothTitleAR}'` : true;

    dataToSet.price ? setData +=`,price ='${dataToSet.price}'`: true; 
    dataToSet.clothDescription ? setData += `,clothDescription = '${dataToSet.clothDescription}'` : true;
    dataToSet.clothDescriptionAR ? setData += `,clothDescriptionAR = '${dataToSet.clothDescriptionAR}'` : true;

    dataToSet.clothImage ? setData += `,clothImage = '${dataToSet.clothImage}'` : true;

   let conditions = "";
   criteria.clothId ? conditions += `clothId ='${criteria.clothId}'` : true;

   dbConfig.getDB().query(`UPDATE typeOfCloth SET ${setData} where ${conditions} `, callback);
}

let addColors = (dataToSet, callback) => {
    
    var query = `insert into colors set ?`

    dbConfig.getDB().query(query, dataToSet, callback); 
}

let editColor = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.colorTitle ? setData += `colorTitle = '${dataToSet.colorTitle}'` : true;
    dataToSet.colorTitleAR ? setData += `,colorTitleAR = '${dataToSet.colorTitleAR}'` : true;

    dataToSet.price ? setData += `,price = '${dataToSet.price}'` : true;

    dataToSet.colorDescription ? setData += `,colorDescription = '${dataToSet.colorDescription}'` : true;
    dataToSet.colorDescriptionAR ? setData += `,colorDescriptionAR = '${dataToSet.colorDescriptionAR}'` : true;

    dataToSet.colorImage ? setData += `,colorImage = '${dataToSet.colorImage}'` : true;

   let conditions = "";
   criteria.colorId ? conditions += `colorId ='${criteria.colorId}'` : true;

   dbConfig.getDB().query(`UPDATE colors SET ${setData} where ${conditions} `, callback);
}

let addShades = (dataToSet, callback) => {
    
    var query = `insert into shades set ?`

    dbConfig.getDB().query(query, dataToSet, callback); 
}

let editShades = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.shadesTitle ? setData += `shadesTitle = '${dataToSet.shadesTitle}'` : true;
    dataToSet.price ? setData += `,price = '${dataToSet.price}'` : true;
    dataToSet.shadesTitleAR ? setData += `,shadesTitleAR = '${dataToSet.shadesTitleAR}'` : true;
    dataToSet.shadeDescriptionAR ? setData += `,shadeDescriptionAR = '${dataToSet.shadeDescriptionAR}'` : true;

    dataToSet.shadeDescription ? setData += `,shadeDescription = '${dataToSet.shadeDescription}'` : true;
    dataToSet.shadeImage ? setData += `,shadeImage = '${dataToSet.shadeImage}'` : true;

   let conditions = "";
   criteria.shadeId ? conditions += `shadeId ='${criteria.shadeId}'` : true;

   dbConfig.getDB().query(`UPDATE shades SET ${setData} where ${conditions} `, callback);
}

let addSideLines = (dataToSet, callback) => {
    
    var query = `insert into sideLines set ?`

    dbConfig.getDB().query(query, dataToSet, callback); 
}

let editSideLine = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.SideLineTitle ? setData += `SideLineTitle = '${dataToSet.SideLineTitle}'` : true;
    dataToSet.SideLineTitleAR ? setData += `,SideLineTitleAR = '${dataToSet.SideLineTitleAR}'` : true;

    dataToSet.price ? setData += `,price = '${dataToSet.price}'` : true;
    dataToSet.sideLineDescriptionAR ? setData += `,sideLineDescriptionAR = '${dataToSet.sideLineDescriptionAR}'` : true;

    dataToSet.sideLineDescription ? setData += `,sideLineDescription = '${dataToSet.sideLineDescription}'` : true;
    dataToSet.sideLineImage ? setData += `,sideLineImage = '${dataToSet.sideLineImage}'` : true;

   let conditions = "";
   criteria.lineId ? conditions += `lineId ='${criteria.lineId}'` : true;

   dbConfig.getDB().query(`UPDATE sideLines SET ${setData} where ${conditions} `, callback);
}

let addStitchingType = (dataToSet, callback) => {
    
    var query = `insert into stitchingType set ?`

    dbConfig.getDB().query(query, dataToSet, callback); 
}

let editStitchingType = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.StitchingTypeTitle ? setData += `StitchingTypeTitle = '${dataToSet.StitchingTypeTitle}'` : true;
    dataToSet.StitchingTypeTitleAR ? setData += `,StitchingTypeTitleAR = '${dataToSet.StitchingTypeTitleAR}'` : true;

    dataToSet.price ? setData += `,price = '${dataToSet.price}'` : true;

    dataToSet.stitchingDescription ? setData += `,stitchingDescription = '${dataToSet.stitchingDescription}'` : true;
    dataToSet.stitchingDescriptionAR ? setData += `,stitchingDescriptionAR = '${dataToSet.stitchingDescriptionAR}'` : true;

    dataToSet.stitchingImage ? setData += `,stitchingImage = '${dataToSet.stitchingImage}'` : true;

   let conditions = "";
   criteria.stitchingId ? conditions += `stitchingId ='${criteria.stitchingId}'` : true;

   dbConfig.getDB().query(`UPDATE stitchingType SET ${setData} where ${conditions} `, callback);
}

let addFaruka = (dataToSet, callback) => {
    
    var query = `insert into faruka set ?`

    dbConfig.getDB().query(query, dataToSet, callback); 
}

let editFaruka = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.farukaTitle ? setData += `farukaTitle = '${dataToSet.farukaTitle}'` : true;
    dataToSet.farukaTitleAR ? setData += `,farukaTitleAR = '${dataToSet.farukaTitleAR}'` : true;

    dataToSet.price ? setData += `,price = '${dataToSet.price}'` : true;

    dataToSet.farukaDescription ? setData += `,farukaDescription = '${dataToSet.farukaDescription}'` : true;
    dataToSet.farukaDescriptionAR ? setData += `,farukaDescriptionAR = '${dataToSet.farukaDescriptionAR}'` : true;

    dataToSet.farukaImage ? setData += `,farukaImage = '${dataToSet.farukaImage}'` : true;

   let conditions = "";
   criteria.farukaId ? conditions += `farukaId ='${criteria.farukaId}'` : true;

   dbConfig.getDB().query(`UPDATE faruka SET ${setData} where ${conditions} `, callback);
}

let addTarbosh = (dataToSet, callback) => {
    
    var query = `insert into tarbosh set ?`

    dbConfig.getDB().query(query, dataToSet, callback); 
}

let editTarbosh = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.tarboshTitle ? setData += `tarboshTitle = '${dataToSet.tarboshTitle}'` : true;
    dataToSet.tarboshTitleAR ? setData += `,tarboshTitleAR = '${dataToSet.tarboshTitleAR}'` : true;

    dataToSet.price ? setData += `,price = '${dataToSet.price}'` : true;

    dataToSet.tarboshDescription ? setData += `,tarboshDescription = '${dataToSet.tarboshDescription}'` : true;
    dataToSet.tarboshDescriptionAR ? setData += `,tarboshDescriptionAR = '${dataToSet.tarboshDescriptionAR}'` : true;

    dataToSet.tarboshImage ? setData += `,tarboshImage = '${dataToSet.tarboshImage}'` : true;

   let conditions = "";
   criteria.tarboshId ? conditions += `tarboshId ='${criteria.tarboshId}'` : true;

   dbConfig.getDB().query(`UPDATE tarbosh SET ${setData} where ${conditions} `, callback);
}

let addFitting = (dataToSet, callback) => {
    
   var query = `insert into fitting set ?`

   dbConfig.getDB().query(query, dataToSet, callback); 
}

let editFitting = (criteria, dataToSet, callback) => {
  //update keys
  let setData = "";
   dataToSet.fittingTitle ? setData += `fittingTitle = '${dataToSet.fittingTitle}'` : true;
   dataToSet.fittingTitleAR ? setData += `,fittingTitleAR = '${dataToSet.fittingTitleAR}'` : true;

   dataToSet.price ? setData += `,price = '${dataToSet.price}'` : true;

   dataToSet.fittingDescription ? setData += `,fittingDescription = '${dataToSet.fittingDescription}'` : true;
   dataToSet.fittingDescriptionAR ? setData += `,fittingDescriptionAR = '${dataToSet.fittingDescriptionAR}'` : true;


  let conditions = "";
  criteria.fittingId ? conditions += `fittingId ='${criteria.fittingId}'` : true;

  dbConfig.getDB().query(`UPDATE fitting SET ${setData} where ${conditions} `, callback);
}


//Get Faberic DAO
let getStyle = (callback) => {
   
    dbConfig.getDB().query(`SELECT style,styleImage,styleDescription FROM style`, callback);
 }

 let getCloth = (callback) => {
   
    dbConfig.getDB().query(`SELECT clothType,clothDescription,clothImage FROM typeOfCloth`, callback);
 }

 let getColor = (callback) => {
   
    dbConfig.getDB().query(`SELECT color,colorDescription,colorImage FROM colors`, callback);
 }

 let getShade = (callback) => {
   
    dbConfig.getDB().query(`SELECT shade,shadeDescription,shadeImage FROM shades`, callback);
 }

 let getSideLine = (callback) => {
   
    dbConfig.getDB().query(`SELECT sideLine,sideLineDescription,sideLineImage FROM sideLines`, callback);
 }

 let getStitching = (callback) => {
   
    dbConfig.getDB().query(`SELECT stitching,stitchingDescription,stitchingImage FROM stitchingType`, callback);
 }

 let getFaruka = (callback) => {
   
    dbConfig.getDB().query(`SELECT faruka,farukaDescription,farukaImage FROM faruka`, callback);
 }

 let getTarbosh = (callback) => {
   
    dbConfig.getDB().query(`SELECT tarbosh,tarboshDescription,tarboshImage FROM tarbosh`, callback);
 }


//*************************************END ************************************* */
let addProductImage = (dataToSet2, callback) => {
    dbConfig.getDB().query("insert into productImage set ? ", dataToSet2, callback);
    console.log("insert into productImage set ? ", dataToSet2,"Ambuj")
 }

let getProduct = (criteria, callback) => {
   let conditions = "";
   criteria.productId ? conditions += ` pd.productId = '${criteria.productId}'` : true;
   
   let condition = "";
   criteria.userId ? condition += `userId = '${criteria.userId}'` : true;

   var query = `SELECT pd.productId,pd.productName,pd.productNameAR, 
   pd.productTitle,pd.productTitleAR,pd.productDescription,
   pd.productDescriptionAR,pd.productPrice,pd.productType, 
   st.styleId,st.StyleTitle,st.StyleTitleAR,
   tc.clothId, tc.typeOfClothTitle,tc.typeOfClothTitleAR,
   c.colorId,c.colorTitle,c.colorTitleAR,
   sh.shadeId, sh.shadesTitle,sh.shadesTitleAR,
   sc.lineId,sc.SideLineTitle,sc.SideLineTitleAR,
   sti.stitchingId,sti.StitchingTypeTitle,sti.StitchingTypeTitleAR,
   f.farukaId, f.farukaTitle,f.farukaTitleAR,
   ta.tarboshId,ta.tarboshTitle,ta.tarboshTitleAR,
   fi.fittingId,fi.fittingTitle,fi.fittingTitleAR,
   (tc.price + st.price + c.price + sh.price + sc.price + 
   sti.price + f.price + ta.price +pd.productPrice) as TotalAmount,
   COALESCE((SELECT status FROM addCart WHERE productId = pd.productId AND ${condition}),0) as status
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

   where  ${conditions}`

   dbConfig.getDB().query(query, callback);
   console.log(query,"opopopopoo")
}

let getProductImage = (criteria, callback) => {
    let conditions = "";
    criteria.productId ? conditions += ` productId = '${criteria.productId}'` : true;
   
    dbConfig.getDB().query(`select productImage from productImage where  ${conditions}`, callback);
 }

let getAllProduct = (callback) => {
  
   
    dbConfig.getDB().query(`SELECT  productDetails.*,pi.productImage 
    FROM productDetails 
    LEFT JOIN productImage as pi on pi.productId = productDetails.productId GROUP BY pi.productId
    ORDER BY pi.productId`, callback);
 }

 let getAllProductAdmin = (callback) => {
   
   dbConfig.getDB().query(`SELECT pd.productId,pd.productName,pd.productNameAR,
   pd.productTitle,pd.productTitleAR,pd.productPrice,pd.productType,
   st.StyleTitle,st.StyleTitleAR,
   tc.typeOfClothTitle,tc.typeOfClothTitleAR,
   c.colorTitle,c.colorTitleAR, 
   sh.shadesTitle,sh.shadesTitleAR,
   sc.SideLineTitle,sc.SideLineTitleAR,
   sti.StitchingTypeTitle,sti.StitchingTypeTitleAR,
   f.farukaTitle,f.farukaTitleAR,
   ta.tarboshTitle,ta.tarboshTitleAR,
   fi.fittingTitle,fi.fittingTitleAR,
   pi.productImage FROM productDetails as pd
   LEFT JOIN style as st on st.styleId = pd.style
   LEFT JOIN typeOfCloth as tc on tc.clothId = pd.typeOfCloth
   LEFT JOIN colors as c on c.colorId = pd.color
   LEFT JOIN shades as sh on sh.shadeId = pd.shades
   LEFT JOIN sideLines as sc on sc.lineId = pd.sideLine
   LEFT JOIN stitchingType as sti on sti.stitchingId = pd.stitchingType
   LEFT JOIN faruka as f on f.farukaId= pd.faruka
   LEFT JOIN tarbosh as ta on ta.tarboshId= pd.turbosh
   LEFT JOIN fitting as fi on fi.fittingId= pd.fitting 
   LEFT JOIN productImage as pi on pi.productId = pd.productId GROUP BY pi.productId
   ORDER BY pi.productId`, callback);
}

 /**************************************************start************************ */
// get sort product  data

 let getHighToLowProduct = (callback) => {
   
    dbConfig.getDB().query(`SELECT  productDetails.*,pi.productImage FROM productDetails 
    LEFT JOIN productImage as pi on pi.productId = productDetails.productId GROUP BY pi.productId, 
    productDetails.productPrice
    ORDER BY CAST(productDetails.productPrice AS unsigned) DESC`, callback);
 }
 
  let getLowT0HighProduct = (callback) => {
   
    dbConfig.getDB().query(`SELECT  productDetails.*,pi.productImage FROM productDetails 
    LEFT JOIN productImage as pi on pi.productId = productDetails.productId GROUP BY pi.productId, 
    productDetails.productPrice
    ORDER BY CAST(productDetails.productPrice AS unsigned) ASC`, callback);
 }

 let getFilterByPrice = (criteria,callback) => {
   
   dbConfig.getDB().query(`SELECT  productDetails.*,pi.productImage FROM productDetails 
   LEFT JOIN productImage as pi on pi.productId = productDetails.productId  
   WHERE productDetails.productPrice BETWEEN ${criteria.lowPrice} AND ${criteria.highPrice} GROUP BY pi.productId`, callback);
   console.log(`SELECT  productDetails.*,pi.productImage FROM productDetails 
   LEFT JOIN productImage as pi on pi.productId = productDetails.productId  
   WHERE productDetails.productPrice BETWEEN ${criteria.lowPrice} AND ${criteria.highPrice} GROUP BY pi.productId`,"postttttttt")
}

//************************************HOME API DAO ******************************************* */

let promotion = (callback)=> {
    var query = `SELECT * From promotion `;
    dbConfig.getDB().query(query, callback);

}

let getAllProducts = (callback) => {

    var query = `SELECT  productDetails.*,pi.productImage FROM productDetails 
    LEFT JOIN productImage as pi on pi.productId = productDetails.productId GROUP BY pi.productId
    ORDER BY pi.productId`;
   
    dbConfig.getDB().query(query, callback);
}
 
let getAllOffer = (callback) => {

    var query = `SELECT pd.productId,Of.offerTitle,Of.offerTitleAR,
    Of.offerDescription,Of.offerDescriptionAR,
    pd.productName,pd.productNameAR,pd.productTitle,pd.productDescriptionAR,
    pd.productDescription,pd.productPrice,pi.productImage FROM offer as Of 
    LEFT JOIN productDetails as pd on pd.productId = Of.productId 
    LEFT JOIN productImage as pi on pi.productId = Of.productId
    GROUP BY Of.productId`
     
    dbConfig.getDB().query(query, callback);
 }

 let getProductForAdmin = (criteria, callback) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
   var conditions = "";
   criteria.productId ? conditions += `productId = '${criteria.productId}'` : true;
   
   var query = `SELECT pd.productId,pd.productName, pd.productTitle,pd.productDescription,pd.productPrice,pd.productType, st.styleId,st.StyleTitle,
   tc.clothId, tc.typeOfClothTitle, c.colorId,c.colorTitle,sh.shadeId, sh.shadesTitle,sc.lineId,sc.SideLineTitle,sti.stitchingId,sti.StitchingTypeTitle,
   f.farukaId, f.farukaTitle,ta.tarboshId,ta.tarboshTitle,fi.fittingTitle,fi.fittingTitleAR,fi.fittingId
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

   where ${conditions}`;
  
   dbConfig.getDB().query(query, callback);
}

let getProductImageForAdmin = (criteria, callback) => {
   var conditions = "";
   criteria.productId ? conditions += `productId = '${criteria.productId}'` : true;
   
   var query = `SELECT imageId,productId,productImage FROM productImage where ${conditions}`;
  
   dbConfig.getDB().query(query, callback);
}

let editProductAdmin = (criteria, dataToSet, callback) => {
   //update keys
   console.log(dataToSet.productName,"querrrrrrrrrrrryyyyyyyyyyy");
   
   let setData = "";
    dataToSet.productName ? setData += `productName = '${dataToSet.productName}'` : true;
    dataToSet.productTitle ? setData += `,productTitle = '${dataToSet.productTitle}'` : true;
    dataToSet.productDescription ? setData += `,productDescription = '${dataToSet.productDescription}'` : true;
    dataToSet.productPrice ? setData += `,productPrice = '${dataToSet.productPrice}'` : true;
    dataToSet.styleId ? setData += `,styleId = '${dataToSet.styleId}'` : true;
    dataToSet.clothId ? setData += `,clothId = '${dataToSet.clothId}'` : true;
    dataToSet.colorId ? setData += `,colorId = '${dataToSet.colorId}'` : true;
    dataToSet.shadeId ? setData += `,shadeId = '${dataToSet.shadeId}'` : true;
    dataToSet.lineId ? setData += `,lineId = '${dataToSet.lineId}'` : true;
    dataToSet.stitchingId ? setData += `,stitchingId = '${dataToSet.stitchingId}'` : true;
    dataToSet.farukaId ? setData += `,farukaId = '${dataToSet.farukaId}'` : true;
    dataToSet.tarboshId ? setData += `,tarboshId = '${dataToSet.tarboshId}'` : true;
   
   let conditions = "";
   criteria.productId ? conditions += `productId ='${criteria.productId}'` : true;

   dbConfig.getDB().query(`UPDATE productDetails SET ${setData} where ${conditions} `, callback);
}


let editProductImageAdmin = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.productImage ? setData += `productImage = '${dataToSet.productImage}'` : true;
   
   let conditions = "";
   criteria.imageId ? conditions += `imageId ='${criteria.imageId}'` : true;

   dbConfig.getDB().query(`UPDATE productImage SET ${setData} where ${conditions} `, callback);
}
//*************************************END *************************************************** */

let getAllFabric = (criteria, callback) => {
   
    dbConfig.getDB().query(`SELECT * FROM ${criteria.type} WHERE status = 'Active'`, callback);
}

//********************************************Get Custom Fabric********************************* */

let getCustomKandora = (criteria, callback) => {
   var conditions = "";
   criteria.customKandoraId ? conditions += `customKandoraId = '${criteria.customKandoraId}'` : true;
   dbConfig.getDB().query(`SELECT * FROM customKandora
   LEFT JOIN style ON style.styleId = customKandora.style 
   LEFT JOIN shades ON shades.shadeId = customKandora.shades
   WHERE  ${conditions}`, callback);
}
 
let getAllCustomKandora = ( callback) => {
   var query = `SELECT pd.customKandoraId,st.StyleTitle,
   tc.typeOfClothTitle,c.colorTitle, sh.shadesTitle,sc.SideLineTitle,sti.StitchingTypeTitle,
   f.farukaTitle,ta.tarboshTitle,pd.productImage FROM customKandora as pd
   LEFT JOIN style as st on st.styleId = pd.style
   LEFT JOIN typeOfCloth as tc on tc.clothId = pd.typeOfCloth
   LEFT JOIN colors as c on c.colorId = pd.color
   LEFT JOIN shades as sh on sh.shadeId = pd.shades
   LEFT JOIN sideLines as sc on sc.lineId = pd.sideLine
   LEFT JOIN stitchingType as sti on sti.stitchingId = pd.stitchingType
   LEFT JOIN faruka as f on f.farukaId= pd.faruka
   LEFT JOIN tarbosh as ta on ta.tarboshId= pd.turbosh`
   dbConfig.getDB().query(query, callback);
   console.log(query,"Ambuj")

}

//*********************************ADD Custom Kandora********************* */

let getCustomDetail = (criteria, callback) => {
   var conditions = "";
   criteria.customKandoraId ? conditions += `pd.customKandoraId = '${criteria.customKandoraId}'` : true;
   dbConfig.getDB().query(`SELECT pd.customKandoraId,pd.Mid,pd.title,pd.titleAR,pd.DescriptionAR,
   st.StyleTitle,st.StyleTitleAR,styleImage,
   tc.typeOfClothTitle,tc.typeOfClothTitleAR,
   c.colorTitle,c.colorTitleAR, sh.shadesTitle,sh.shadesTitleAR,sc.SideLineTitle,sc.SideLineTitleAR,
   sti.StitchingTypeTitle,sti.StitchingTypeTitleAR,
   f.farukaTitle,f.farukaTitleAR,
   ta.tarboshTitle,ta.tarboshTitleAR,
   fi.fittingTitle,fi.fittingTitleAR,
   pd.Description,pd.price,pd.productType,
   (tc.price + st.price + c.price + sh.price + sc.price + sti.price + f.price + ta.price ) as Price
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

   WHERE ${conditions}`, callback);
   
}

let getStandardCustomDetail = (criteria, callback) => {
   var conditions = "";
   criteria.customKandoraId ? conditions += `pd.customKandoraId = '${criteria.customKandoraId}'` : true;
   dbConfig.getDB().query(`SELECT pds.productId,pi.productImage,pd.customKandoraId,pd.Mid,
   pds.productTitle,pds.productTitleAR,pds.productName,
   pds.productNameAR,pds.productDescription,pds.productDescriptionAR,pds.productPrice,pds.productType,
      pd.customKandoraId,pd.title,pd.titleAR,pd.DescriptionAR,
         st.StyleTitle,st.StyleTitleAR,styleImage,
         tc.typeOfClothTitle,tc.typeOfClothTitleAR,
         c.colorTitle,c.colorTitleAR, sh.shadesTitle,sh.shadesTitleAR,sc.SideLineTitle,sc.SideLineTitleAR,
         sti.StitchingTypeTitle,sti.StitchingTypeTitleAR,
         f.farukaTitle,f.farukaTitleAR,
         ta.tarboshTitle,ta.tarboshTitleAR,
         fi.fittingTitle,fi.fittingTitleAR,fi.fittingId,

         pd.Description,pd.price,pd.productType,
         (tc.price + st.price + c.price + sh.price + sc.price + 
         sti.price + f.price + ta.price ) as TotalAmount,
         st.styleId,tc.clothId,c.colorId,sh.shadeId,sc.lineId,sti.stitchingId,f.farukaId,ta.tarboshId
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

         LEFT JOIN productDetails as pds on pds.productId= pd.productId 
         LEFT JOIN productImage as pi on pi.productId = pd.productId
         LEFT JOIN addCart as ac on ac.customKandoraId = pd.customKandoraId
         WHERE ${conditions} GROUP By pd.productId `, callback);
   
}

let getCustomPaymentDelail = (criteria, callback) => {
   var conditions = "";
   criteria.userId ? conditions += `pd.userId = '${criteria.userId}'` : true;
   dbConfig.getDB().query(`SELECT pd.customKandoraId,pd.title,st.StyleTitle,
   tc.typeOfClothTitle,c.colorTitle, sh.shadesTitle,sc.SideLineTitle,sti.StitchingTypeTitle,
   f.farukaTitle,ta.tarboshTitle,pd.Description,pd.price,pd.productType,isPaid FROM customKandora as pd
   LEFT JOIN style as st on st.styleId = pd.style
   LEFT JOIN typeOfCloth as tc on tc.clothId = pd.typeOfCloth
   LEFT JOIN colors as c on c.colorId = pd.color
   LEFT JOIN shades as sh on sh.shadeId = pd.shades
   LEFT JOIN sideLines as sc on sc.lineId = pd.sideLine
   LEFT JOIN stitchingType as sti on sti.stitchingId = pd.stitchingType
   LEFT JOIN faruka as f on f.farukaId= pd.faruka
   LEFT JOIN tarbosh as ta on ta.tarboshId= pd.turbosh WHERE ${conditions}`, callback);
}

let addCustomKandora = (dataToSet, callback) => {
    dbConfig.getDB().query("insert into customKandora set ? ", dataToSet, callback);
}


/********************************Remove***********************************8 */

let removeCloth = (criteria, dataToSet, callback)=>{
   let setData = "";
   dataToSet.status ? setData += `status = '${dataToSet.status}'` : true;

  let conditions = "";
  criteria.clothId ? conditions += `clothId ='${criteria.clothId}'` : true;

  dbConfig.getDB().query(`UPDATE typeOfCloth SET ${setData} where ${conditions} `, callback); 
}


let removeColor = (criteria, dataToSet, callback)=>{
   let setData = "";
   dataToSet.status ? setData += `status = '${dataToSet.status}'` : true;

  let conditions = "";
  criteria.colorId ? conditions += `colorId ='${criteria.colorId}'` : true;

  dbConfig.getDB().query(`UPDATE colors SET ${setData} where ${conditions} `, callback); 
}

let removeFaruka = (criteria, dataToSet, callback)=>{
   let setData = "";
   dataToSet.status ? setData += `status = '${dataToSet.status}'` : true;

  let conditions = "";
  criteria.farukaId ? conditions += `farukaId ='${criteria.farukaId}'` : true;

  dbConfig.getDB().query(`UPDATE faruka SET ${setData} where ${conditions} `, callback); 
}


let removeShades = (criteria, dataToSet, callback)=>{
   let setData = "";
   dataToSet.status ? setData += `status = '${dataToSet.status}'` : true;

  let conditions = "";
  criteria.shadeId ? conditions += `shadeId ='${criteria.shadeId}'` : true;

  dbConfig.getDB().query(`UPDATE shades SET ${setData} where ${conditions} `, callback); 
}


let removeSideLines = (criteria, dataToSet, callback)=>{
   let setData = "";
   dataToSet.status ? setData += `status = '${dataToSet.status}'` : true;

  let conditions = "";
  criteria.lineId ? conditions += `lineId ='${criteria.lineId}'` : true;

  dbConfig.getDB().query(`UPDATE sideLines SET ${setData} where ${conditions} `, callback); 
}

let removeStitchingType = (criteria, dataToSet, callback)=>{
   let setData = "";
   dataToSet.status ? setData += `status = '${dataToSet.status}'` : true;

  let conditions = "";
  criteria.stitchingId ? conditions += `stitchingId ='${criteria.stitchingId}'` : true;

  dbConfig.getDB().query(`UPDATE stitchingType SET ${setData} where ${conditions} `, callback); 
}

let removeStyle = (criteria, dataToSet, callback)=>{
   let setData = "";
   dataToSet.status ? setData += `status = '${dataToSet.status}'` : true;

  let conditions = "";
  criteria.styleId ? conditions += `styleId ='${criteria.styleId}'` : true;

  dbConfig.getDB().query(`UPDATE style SET ${setData} where ${conditions} `, callback); 
}

let removeTarbosh = (criteria, dataToSet, callback)=>{
   let setData = "";
   dataToSet.status ? setData += `status = '${dataToSet.status}'` : true;

  let conditions = "";
  criteria.tarboshId ? conditions += `tarboshId ='${criteria.tarboshId}'` : true;

  dbConfig.getDB().query(`UPDATE tarbosh SET ${setData} where ${conditions} `, callback); 
}


let removeFitting = (criteria, dataToSet, callback)=>{
   let setData = "";
   dataToSet.status ? setData += `status = '${dataToSet.status}'` : true;

  let conditions = "";
  criteria.fittingId ? conditions += `fittingId ='${criteria.fittingId}'` : true;

  dbConfig.getDB().query(`UPDATE fitting SET ${setData} where ${conditions} `, callback); 
}


let removeProduct = (criteria, callback) => {
   var conditions = "";
   criteria.productId ? conditions += `productId = '${criteria.productId}'` : true;
   dbConfig.getDB().query(`DELETE FROM productDetails where ${conditions} `, callback);
}
let removeCProductImage = (criteria, callback) => {
   var conditions = "";
   criteria.productId ? conditions += `productId = '${criteria.productId}'` : true;
   dbConfig.getDB().query(`DELETE FROM productImage where ${conditions} `, callback);
}

let removePromotion = (criteria, callback) => {
   var conditions = "";
   criteria.promotionId ? conditions += `promotionId = '${criteria.promotionId}'` : true;
   dbConfig.getDB().query(`DELETE FROM promotion where ${conditions} `, callback);
}
/*************************Offer API**************** */
let getAdminOffer = ( callback) => {
   var query = `SELECT * FROM offer LEFT JOIN productImage as pi on pi.productId = offer.productId `
   dbConfig.getDB().query(query, callback);
   console.log(query,"Ambuj")

}
let removeOffer = (criteria, callback) => {
   var conditions = "";
   criteria.offerId ? conditions += `offerId = '${criteria.offerId}'` : true;
   dbConfig.getDB().query(`DELETE FROM offer where ${conditions} `, callback);
}
/**************************** */
let getStyleAdmin = (criteria, callback) => {
   var conditions = "";
   criteria.styleId ? conditions += `styleId = '${criteria.styleId}'` : true;
   dbConfig.getDB().query(`SELECT * FROM style where ${conditions}`, callback);
}

let getClothAdmin = ( criteria, callback) => {
   var conditions = "";
   criteria.clothId ? conditions += `clothId = '${criteria.clothId}'` : true;
   dbConfig.getDB().query(`SELECT * FROM typeOfCloth where ${conditions}`, callback);
}

let getColorAdmin = (criteria, callback) => {
   var conditions = "";
   criteria.colorId ? conditions += `colorId = '${criteria.colorId}'` : true;
   dbConfig.getDB().query(`SELECT * FROM colors where ${conditions}`, callback);
}

let getShadeAdmin = ( criteria, callback) => {
   var conditions = "";
   criteria.shadeId ? conditions += `shadeId = '${criteria.shadeId}'` : true;
   dbConfig.getDB().query(`SELECT * FROM shades where ${conditions}`, callback);
}

let getSideLineAdmin = (criteria, callback) => {
   var conditions = "";
   criteria.lineId ? conditions += `lineId = '${criteria.lineId}'` : true;
   dbConfig.getDB().query(`SELECT * FROM sideLines where ${conditions}`, callback);
}

let getStitchingAdmin = ( criteria, callback) => {
   var conditions = "";
   criteria.stitchingId ? conditions += `stitchingId = '${criteria.stitchingId}'` : true;
   dbConfig.getDB().query(`SELECT * FROM stitchingType where ${conditions}`, callback);
}

let getFarukaAdmin = (criteria, callback) => {
   var conditions = "";
   criteria.farukaId ? conditions += `farukaId = '${criteria.farukaId}'` : true;
   dbConfig.getDB().query(`SELECT * FROM faruka where ${conditions}`, callback);
}

let getTarboshAdmin = (criteria, callback) => {
   var conditions = "";
   criteria.tarboshId ? conditions += `tarboshId = '${criteria.tarboshId}'` : true;
   dbConfig.getDB().query(`SELECT * FROM tarbosh where ${conditions}`, callback);
}

let getFittingAdmin = (criteria, callback) => {
   var conditions = "";
   criteria.fittingId ? conditions += `fittingId = '${criteria.fittingId}'` : true;
   dbConfig.getDB().query(`SELECT * FROM fitting where ${conditions}`, callback);
}

let getBannerAdmin = (callback) => {
  
   dbConfig.getDB().query(`SELECT * FROM promotion order by createdAt DESC limit 5`, callback);
}

let getBannerById = (criteria, callback) => {

   let conditions = "";
   criteria.promotionId ? conditions += `promotionId ='${criteria.promotionId}'` : true;
   dbConfig.getDB().query(`SELECT * FROM promotion where ${conditions}`, callback);

}

let editPromotion = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.promotionTitle ? setData += `promotionTitle = '${dataToSet.promotionTitle}'` : true;
    dataToSet.promotionTitleAR ? setData += `promotionTitleAR = '${dataToSet.promotionTitleAR}'` : true;

    dataToSet.promotionImage ? setData += `,promotionImage = '${dataToSet.promotionImage}'` : true;
   //  dataToSet.styleDescription ? setData += `,styleDescription = '${dataToSet.styleDescription}'` : true;

   let conditions = "";
   criteria.promotionId ? conditions += `promotionId ='${criteria.promotionId}'` : true;

   dbConfig.getDB().query(`UPDATE promotion SET ${setData} where ${conditions} `, callback);
}

/************************************************************************/
//Add cart 
let addCart = (dataToSet, callback) => {
   dbConfig.getDB().query("insert into addCart set ? ", dataToSet, callback);
}

let getCartDetail = (criteria, callback) => {
   let conditions = "";
   criteria.userId ? conditions += ` userId = '${criteria.userId}'` : true;

   dbConfig.getDB().query(`select * from addCart where  ${conditions}`, callback);
}

let getProductForCart = (criteria, callback) => {
   let conditions = "";
   criteria.productId ? conditions += ` pd.productId = '${criteria.productId}'` : true;
   
   var query = `SELECT pd.productId,pd.productName,pd.productNameAR, pd.productTitle,pd.productTitleAR,pd.productDescription,pd.productDescriptionAR,pd.productPrice,pd.productType,pi.productImage, 
   st.styleId,st.StyleTitle,st.StyleTitleAR,
   tc.clothId, tc.typeOfClothTitle, tc.typeOfClothTitleAR,
   c.colorId,c.colorTitle,c.colorTitleAR,
   sh.shadeId, sh.shadesTitle,sh.shadesTitleAR,
   sc.lineId,sc.SideLineTitle,sc.SideLineTitleAR,
   sti.stitchingId,sti.StitchingTypeTitle,sti.StitchingTypeTitleAR,
   f.farukaId, f.farukaTitle,f.farukaTitleAR,
   ta.tarboshId,ta.tarboshTitle,ta.tarboshTitleAR
   FROM productDetails as pd 
   LEFT JOIN style as st on st.styleId = pd.style
   LEFT JOIN typeOfCloth as tc on tc.clothId = pd.typeOfCloth
   LEFT JOIN colors as c on c.colorId = pd.color
   LEFT JOIN shades as sh on sh.shadeId = pd.shades
   LEFT JOIN sideLines as sc on sc.lineId = pd.sideLine
   LEFT JOIN stitchingType as sti on sti.stitchingId = pd.stitchingType
   LEFT JOIN faruka as f on f.farukaId= pd.faruka
   LEFT JOIN tarbosh as ta on ta.tarboshId= pd.turbosh
   LEFT JOIN productImage as pi on pi.productId = pd.productId where  ${conditions} 
   GROUP BY pi.productId
   ORDER BY pi.productId`
   dbConfig.getDB().query(query, callback);
   //console.log(query,"opopopopoo")
}

let quantityOfProduct = (criteria, callback) => {
   let conditions = "";
   criteria.userId ? conditions += `userId = '${criteria.userId}'` : true;   
   var query = `SELECT SUM(quantity) AS TotalItemsOrdered FROM addCart WHERE ${conditions}`
   dbConfig.getDB().query(query, callback);
   //SELECT SUM(quantity) AS TotalItemsOrdered FROM addCart WHERE userId = 1
}

let totalPriceOfProduct = (criteria, callback) => {
   let conditions = "";
   criteria.userId ? conditions += `userId = '${criteria.userId}'` : true;   
   var query = `SELECT SUM(price) AS TotalPrice FROM addCart WHERE ${conditions}`
   dbConfig.getDB().query(query, callback);
   //SELECT SUM(quantity) AS TotalItemsOrdered FROM addCart WHERE userId = 1
}

let getCustomDetailForCart = (criteria, callback) => {
   var conditions = "";
   criteria.customKandoraId ? conditions += `pd.customKandoraId = '${criteria.customKandoraId}'` : true;
   dbConfig.getDB().query(`SELECT pd.customKandoraId,pd.title,pd.titleAR,pd.DescriptionAR,
   st.StyleTitle,st.StyleTitleAR,
   tc.typeOfClothTitle,tc.typeOfClothTitleAR,
   c.colorTitle,c.colorTitleAR, sh.shadesTitle,sh.shadesTitleAR,sc.SideLineTitle,sc.SideLineTitleAR,
   sti.StitchingTypeTitle,sti.StitchingTypeTitleAR,
   f.farukaTitle,f.farukaTitleAR,ta.tarboshTitle,ta.tarboshTitleAR,pd.Description,pd.price,pd.productType,isPaid FROM customKandora as pd
   LEFT JOIN style as st on st.styleId = pd.style
   LEFT JOIN typeOfCloth as tc on tc.clothId = pd.typeOfCloth
   LEFT JOIN colors as c on c.colorId = pd.color
   LEFT JOIN shades as sh on sh.shadeId = pd.shades
   LEFT JOIN sideLines as sc on sc.lineId = pd.sideLine
   LEFT JOIN stitchingType as sti on sti.stitchingId = pd.stitchingType
   LEFT JOIN faruka as f on f.farukaId= pd.faruka
   LEFT JOIN tarbosh as ta on ta.tarboshId= pd.turbosh WHERE ${conditions}`, callback);
}

let updateUserKeyInCart = (criteria, dataToSet, callback)=>{
   let setData = "";
   dataToSet.userId ? setData += `userId = '${dataToSet.userId}'` : true;

  let conditions = "";
  criteria.oldUserId ? conditions += `userId ='${criteria.oldUserId}'` : true;

  dbConfig.getDB().query(`UPDATE addCart SET ${setData} where ${conditions} `, callback); 
}

let removeCart = (criteria, callback) => {
   var conditions = "";
   criteria.cartId ? conditions += `cartId = '${criteria.cartId}'` : true;
   dbConfig.getDB().query(`DELETE FROM addCart where ${conditions} `, callback);
}

let editQuantity = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.quantity ? setData += `quantity = '${dataToSet.quantity}'` : true;
    dataToSet.price ? setData += `,price = '${dataToSet.price}'` : true;

   
   let conditions = "";
   criteria.cartId ? conditions += `cartId ='${criteria.cartId}'` : true;

   dbConfig.getDB().query(`UPDATE addCart SET ${setData} where ${conditions} `, callback);
}
/****************************Card API DAO********************** */
//Add Card Details
let cardDetail = (dataToSet, callback) => {
   dbConfig.getDB().query("insert into cardDetails set ? ", dataToSet, callback);
}

let getCardDetail = (criteria, callback) => {
   let conditions = "";
   criteria.cardId ? conditions += ` cardId = '${criteria.cardId}'` : true;
  
   dbConfig.getDB().query(`select * from cardDetails where  ${conditions}`, callback);
}

/*****************************************************************************************/
//Get measurement
let getMeasurement = (criteria, callback) => {
   let conditions = "";
   criteria.userId ? conditions += ` userId = '${criteria.userId}'` : true;
  
   dbConfig.getDB().query(`select * from measurement where  ${conditions} AND status = '0' `, callback);
}
let getFreeMeasurement = ( callback) => {
   dbConfig.getDB().query(`select ms.*,us.userName from measurement as ms
   LEFT JOIN user as us on us.userId = ms.userId WHERE isSelected = '0'`, callback);
}
let getPaidMeasurement = ( callback) => {
   dbConfig.getDB().query(`select ms.*,us.userName from measurement as ms 
   LEFT JOIN user as us on us.userId = ms.userId WHERE isSelected = '1'`, callback);
}
let notSecleted = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.isSelected ? setData += `isSelected = '${dataToSet.isSelected}'` : true;
    
   let conditions = "";
   criteria.userId ? conditions += `userId ='${criteria.userId}'` : true;

   dbConfig.getDB().query(`UPDATE measurement SET ${setData} where ${conditions} `, callback);
}
let isSecleted = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.isSelected ? setData += `isSelected = '${dataToSet.isSelected}'` : true;
    
   let conditions = "";
   criteria.Mid ? conditions += `Mid ='${criteria.Mid}'` : true;

   dbConfig.getDB().query(`UPDATE measurement SET ${setData} where ${conditions} `, callback);
}
let removeMeasurement = (criteria, dataToSet, callback) => {
   let setData = "";
    dataToSet.status ? setData += `status = '${dataToSet.status}'` : true;
    
   let conditions = "";
   criteria.Mid ? conditions += `Mid ='${criteria.Mid}'` : true;

   dbConfig.getDB().query(`UPDATE measurement SET ${setData} where ${conditions} `, callback);
   console.log(`UPDATE measurement SET ${setData} where ${conditions} `,"check")
}
let isPaid = (criteria, callback) => {
   let conditions = "";
   criteria.userId ? conditions += ` userId = '${criteria.userId}'` : true;
   
   let conditions1 = "";
   criteria.mType ? conditions1 += ` mType = '${criteria.mType}'` : true;
  
   dbConfig.getDB().query( `select *,(SELECT price FROM measurementPriceHistory as mh ORDER BY mh.createdAt DESC LIMIT 1) as price
   from measurement where  ${conditions} AND ${conditions1}`, callback);
   console.log( `select *,(SELECT price FROM measurementPriceHistory as mh ORDER BY mh.createdAt DESC LIMIT 1) as price
   from measurement where  ${conditions} AND ${conditions1}`,"podsafsdfsd");
   
}
let isPaidCount = (criteria, callback) => {
   let conditions = "";
   criteria.userId ? conditions += ` userId = '${criteria.userId}'` : true;
   
   dbConfig.getDB().query( `SELECT * FROM mTransaction WHERE ${conditions} ORDER BY createdAt DESC LIMIT 1`, callback);
   
}
let mTypeCount = (criteria, callback) => {
   let conditions = "";
   criteria.userId ? conditions += ` userId = '${criteria.userId}'` : true;

   dbConfig.getDB().query( `SELECT COUNT(mType) as mType FROM measurement WHERE ${conditions} `, callback);
   console.log(`SELECT COUNT(mType) as mType FROM measurement WHERE ${conditions} `,"123456789")
  
}
let viewMeasurement = (criteria, callback) => {
   var condition = ""
   criteria.Mid ? condition +=`Mid = '${criteria.Mid}'` : true;
   criteria.userId ? condition +=`AND userId = '${criteria.userId}'` : true;

   dbConfig.getDB().query(`select * from measurement WHERE ${condition}`, callback);
   console.log(`select * from measurement WHERE ${condition}`,"post.....................")
}
// let getMeasurement = (criteria, callback) => {
//    let conditions = "";
//    criteria.userId ? conditions += ` userId = '${criteria.userId}'` : true;
  
//    dbConfig.getDB().query(`select * from measurement where  ${conditions} AND status = '0' `, callback);
// }

let editMUserStatus = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.status ? setData += `status = '${dataToSet.status}'` : true;

   let conditions = "";
   criteria.userId ? conditions += `userId ='${criteria.userId}'` : true;

   dbConfig.getDB().query(`UPDATE mTransaction SET ${setData} where ${conditions} `, callback);
}
//***********************************************************************************************/
//add check out DAO
let addCheckOut = (dataToSet, callback) => {
   dbConfig.getDB().query("insert into checkOut set ? ", dataToSet, callback);
}
let getCheckOut = (criteria, callback) => {
   let conditions = "";
   criteria.userId ? conditions += ` co.userId = '${criteria.userId}'` : true;
  
   dbConfig.getDB().query(`SELECT DISTINCT ac.productId,ac.customKandoraId,ac.quantity,ac.Mid FROM checkOut as co
   LEFT JOIN addCart as ac on ac.userId = co.userId WHERE  ${conditions}`, callback);
}

let removeOrderNumber = (criteria, callback) => {   
      dbConfig.getDB().query(`DELETE FROM orderDetails where orderNumber = ${criteria.orderNumber}`, callback);
      dbConfig.getDB().query(`DELETE FROM orderLIst where orderNumber = ${criteria.orderNumber}`, callback);
      console.log(`DELETE FROM addCart where `,"ambuj..............")
}

// let checkOutRemoveCartForProduct = (criteria, callback) => {   
//    dbConfig.getDB().query(`DELETE FROM addCart where userId = ${criteria.userId} AND productId= ${criteria.productId} `, callback);
//    console.log(`DELETE FROM addCart where userId = ${criteria.userId} AND productId = ${criteria.productId} `,"ambuj..............")
// }

let removeCartOnPayment = (criteria, callback) => {  
   dbConfig.getDB().query(`DELETE FROM addCart where userId =${criteria.userId}`, callback);
   console.log(`DELETE FROM addCart where userId = ${criteria.userId}`,"post data........")
}


let getAddress = (criteria, callback) => {
   let conditions = "";
   criteria.userId ? conditions += `userId = '${criteria.userId}'` : true;
  
   dbConfig.getDB().query(`SELECT landMark,contactName,address,addressType,countryCode,mobileNumber FROM userDetails WHERE ${conditions} AND isSelected='1'`, callback);
}

let getOrderNumber = (criteria, callback) => {
   let conditions = "";
   criteria.userId ? conditions += `userId = '${criteria.userId}'` : true;
  
   dbConfig.getDB().query(`SELECT orderId,orderNumber,productId,customKandoraId,orderStatus FROM orderDetails WHERE ${conditions} AND orderStatus='1'`, callback);
}

let editOrder = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.MId ? setData += `MId = '${dataToSet.MId}'` : true;
    dataToSet.price ? setData += `,price = '${dataToSet.price}'` : true;
    dataToSet.transactionId ? setData += `,transactionId = '${dataToSet.transactionId}'` : true;
    dataToSet.quantity ? setData += `,quantity = '${dataToSet.quantity}'` : true;
    dataToSet.comments ? setData += `,comments = '${dataToSet.comments}'` : true;
    dataToSet.address ? setData += `,address = '${dataToSet.address}'` : true;
    dataToSet.customerNumber ? setData += `,customerNumber = '${dataToSet.customerNumber}'` : true;
    dataToSet.orderStatus ? setData += `,orderStatus = '${dataToSet.orderStatus}'` : true;

   //  dataToSet.styleDescription ? setData += `,styleDescription = '${dataToSet.styleDescription}'` : true;

   let conditions = "";
   criteria.orderId ? conditions += `orderId ='${criteria.orderId}'` : true;

   dbConfig.getDB().query(`UPDATE orderDetails SET ${setData} where ${conditions} `, callback);
}

let editTransaction = (criteria, dataToSet, callback) => {
   let setData = "";
    dataToSet.transactionId ? setData += `transactionId = '${dataToSet.transactionId}'` : true;
    dataToSet.address ? setData += `,address = '${dataToSet.address}'` : true;
    dataToSet.customerNumber ? setData += `,customerNumber = '${dataToSet.customerNumber}'` : true;
    dataToSet.orderStatus ? setData += `,orderStatus = '${dataToSet.orderStatus}'` : true;

   let conditions = "";
   criteria.orderNumber ? conditions += `orderNumber ='${criteria.orderNumber}'` : true;

   dbConfig.getDB().query(`UPDATE orderDetails SET ${setData} where ${conditions} `, callback);
}
/********************************************* */
let addOrderDetail = (dataToSet, callback) => {
   dbConfig.getDB().query("insert into orderDetails set ? ", dataToSet, callback);
}

let addOrder = (dataToSet1, callback) => {
   // console.log("xxx","insert into order set ? ", dataToSet1)
   dbConfig.getDB().query("insert into orderLIst set ? ", dataToSet1, callback);
}

let getOrderDetail = (criteria, callback) => {
   let conditions = "";
   criteria.orderNumber ? conditions += ` od.orderNumber = '${criteria.orderNumber}'` : true;
  
   dbConfig.getDB().query(`select od.*,us.userName,ol.orderId as id from orderDetails as od
   LEFT JOIN user as us on us.userId = od.userId
   LEFT JOIN orderLIst as ol on ol.orderNumber =  od.orderNumber
   where  ${conditions}`, callback);
}

let getOrderId = (criteria, callback) => {
   let conditions = "";
   criteria.orderNumber ? conditions += ` orderNumber = '${criteria.orderNumber}'` : true;
  
   dbConfig.getDB().query(`select * from orderDetails
   
   where  ${conditions}`, callback);
}

let getOrderDetailUser = (criteria, callback) => {
   let conditions = "";
   criteria.orderId ? conditions += ` od.orderId = '${criteria.orderId}'` : true;
  
   dbConfig.getDB().query(`select od.*,us.userName,DATE_FORMAT(od.createdAt, "%d/%m/%Y") AS createdAt,
   ol.orderStatus,IFNULL(DATE_FORMAT(ol.orderPacking, "%d/%m/%Y"),"") AS orderPacking,
   ol.orderShipped,IFNULL(DATE_FORMAT(ol.orderShipped, "%d/%m/%Y"),"") AS orderShipped,
   ol.orderDelivered ,IFNULL(DATE_FORMAT(ol.orderDelivered, "%d/%m/%Y"),"") AS orderDelivered
   from orderDetails as od
   LEFT JOIN user as us on us.userId = od.userId
   LEFT JOIN orderLIst as ol on ol.orderNumber = od.orderNumber
   where  ${conditions}`, callback);
}

let getOrderDetailForUser = (criteria, callback) => {
   let conditions = "";
   criteria.userId ? conditions += ` userId = '${criteria.userId}'` : true;
  
   dbConfig.getDB().query(`select od.*,DATE_FORMAT(createdAt, "%d/%m/%Y") AS createdDate from orderDetails as od
   where  ${conditions} AND orderStatus='1' `, callback);
}

// ORDER BY od.createdAt DESC 

let editOrderPackingStatus = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.orderPacking ? setData += `orderPacking = '${dataToSet.orderPacking}'` : true;
    dataToSet.orderStatus ? setData += `,orderStatus = '${dataToSet.orderStatus}'` : true;

   let conditions = "";
   criteria.orderId ? conditions += `orderId ='${criteria.orderId}'` : true;

   dbConfig.getDB().query(`UPDATE orderLIst SET ${setData} where ${conditions} `, callback);
}

let editOrderShippedStatus = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.orderShipped ? setData += `orderShipped = '${dataToSet.orderShipped}'` : true;
    dataToSet.orderStatus ? setData += `,orderStatus = '${dataToSet.orderStatus}'` : true;

   //  dataToSet.styleDescription ? setData += `,styleDescription = '${dataToSet.styleDescription}'` : true;

   let conditions = "";
   criteria.orderId ? conditions += `orderId ='${criteria.orderId}'` : true;

   dbConfig.getDB().query(`UPDATE orderLIst SET ${setData} where ${conditions} `, callback);
}

let editOrderDeliveredStatus = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.orderDelivered ? setData += `orderDelivered = '${dataToSet.orderDelivered}'` : true;
    dataToSet.orderStatus ? setData += `,orderStatus = '${dataToSet.orderStatus}'` : true;

   //  dataToSet.styleDescription ? setData += `,styleDescription = '${dataToSet.styleDescription}'` : true;

   let conditions = "";
   criteria.orderId ? conditions += `orderId ='${criteria.orderId}'` : true;

   dbConfig.getDB().query(`UPDATE orderLIst SET ${setData} where ${conditions} `, callback);
}


/******************************************************************************** */

let getOrderMeasurement = (criteria, callback) => {
   var condition = ""
   criteria.Mid ? condition +=`Mid = '${criteria.Mid}'` : true;
   dbConfig.getDB().query(`select * from measurement WHERE ${condition}`, callback);
   console.log(`select * from measurement WHERE ${condition}`,"post.....................")
}

let getOrderRecieved = (callback) => {

   dbConfig.getDB().query(`select ol.*,od.customerNumber,od.userId from orderLIst as ol LEFT JOIN orderDetails as od on od.orderNumber = ol.orderNumber
   where ol.orderStatus='0' and od.orderStatus = '1'`, callback);
}

let getOrderShipped = (callback) => {  

   dbConfig.getDB().query(`select ol.*,od.customerNumber,od.userId from orderLIst as ol LEFT JOIN orderDetails as od on od.orderNumber = ol.orderNumber
   where ol.orderStatus='1'`, callback);
}

let getOrderDelivered = (callback) => {

   dbConfig.getDB().query(`select ol.*,od.customerNumber,od.userId from orderLIst as ol LEFT JOIN orderDetails as od on od.orderNumber = ol.orderNumber
   where ol.orderStatus='2'`, callback);
}

let getOrderDeliveredHistory = (callback) => {

   dbConfig.getDB().query(`select ol.*,od.customerNumber,od.userId from orderLIst as ol LEFT JOIN orderDetails as od on od.orderNumber = ol.orderNumber
   where ol.orderStatus='3'`, callback);
}

/********************************************************************************/
let getSentNotification = (criteria, callback) => {
   let conditions = "";
   criteria.userId ? conditions += `userId = '${criteria.userId}'` : true;

   dbConfig.getDB().query(`select * from user where ${conditions}`, callback);
}

/****************F&Q************************/
let addFandQ = (dataToSet, callback) => {
    
   var query = `insert into FAQ set ?`

   dbConfig.getDB().query(query, dataToSet, callback); 
}

let getFAQ = (criteria,callback) => {
   
   let conditions = "";
   criteria.search ? conditions += `and question like '%${criteria.search}%'` : true;

   dbConfig.getDB().query(`select * from FAQ where 1 ${conditions}`, callback);
   console.log(`select * from FAQ where ${conditions}`,"post")
}

let getFAQAR = (criteria,callback) => {
   
   let conditions = "";
   criteria.search ? conditions += `and questionAR like '%${criteria.search}%'` : true;

   dbConfig.getDB().query(`select * from FAQ where 1 ${conditions}`, callback);
   console.log(`select * from FAQ where ${conditions}`,"post")
}

let getFAQAdmin = (callback) => {
   dbConfig.getDB().query(`select * from FAQ `, callback);
   console.log(`select * from FAQ`,"post")
}


let addNotification = (dataToSet, callback) => {
   var query = `insert into notification set ?`
   dbConfig.getDB().query(query, dataToSet, callback); 
}

let getNotification = (criteria, callback) => {
   let conditions = "";
   criteria.userId ? conditions += `userId = '${criteria.userId}'` : true;

   dbConfig.getDB().query(`select * from notification where ${conditions} ORDER BY notificationId DESC`, callback);
}

let getOrderByUser = (criteria, callback) => {
   let conditions = "";
   criteria.orderId ? conditions += `orderId = '${criteria.orderId}'` : true;

   dbConfig.getDB().query(`SELECT u.* FROM orderDetails as od 
   LEFT JOIN user as u on u.userId = od.userId WHERE ${conditions}`, callback);
}

/*******************************************************************/
let addVideo = (dataToSet, callback) => {
    
   var query = `insert into videoTutorial set ?`

   dbConfig.getDB().query(query, dataToSet, callback); 
}

let getVideoLink = (callback) => {

   dbConfig.getDB().query(`SELECT * FROM videoTutorial ORDER BY vId DESC LIMIT 1`, callback);
}

let getAllVideoLink = (callback) => {

   dbConfig.getDB().query(`SELECT * FROM videoTutorial ORDER BY vId DESC`, callback);
}

/********************************************************************/

let getOrderTransaction = (callback) => {

   dbConfig.getDB().query(`SELECT orderId,orderNumber,transactionId,quantity,price FROM orderDetails where transactionId != '0'`, callback);
}

let getRevenue = (callback) => {

   dbConfig.getDB().query(`SELECT SUM(od.price) as revenue FROM orderLIst as ol LEFT JOIN orderDetails as od on od.orderId = ol.orderId AND ol.orderStatus = 3`, callback);
}




module.exports = {
    getProduct,
    addProduct,
    addProductImage,
    addPromotion,
    getProductImage,
    getAllProduct,
    addOffer,
    getAllOffer,
    getAllProducts,
    promotion,
    getHighToLowProduct,
    getLowT0HighProduct,
    getProductForAdmin,
    editProductAdmin,
    editProductImageAdmin,
    //****************STERT */
    addStyle,
    editStyle,
    addCloth,
    editCloth,
    addColors,
    editColor,
    addShades,
    editShades,
    addSideLines,
    editSideLine,
    addStitchingType,
    editStitchingType,
    addFaruka,
    editFaruka,
    addTarbosh,
    editTarbosh,
    addFitting,
    editFitting,
    //**************END */
    //**************Start */
    getStyle,
    getCloth,
    getColor,
    getShade,
    getSideLine,
    getStitching,
    getFaruka,
    getTarbosh,
    //************END */
    getAllFabric,
    addFabric,
    getCustomKandora,
    getAllCustomKandora,

    //************Standard */
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
    removeCProductImage,
    /************Offer******/
    getAdminOffer,
    removeOffer,
    /**********************/

    getStyleAdmin,
    getClothAdmin,
    getColorAdmin,
    getShadeAdmin,
    getSideLineAdmin,
    getStitchingAdmin,
    getFarukaAdmin,
    getTarboshAdmin,
    getFittingAdmin,




    getAllProductAdmin,
    getProductImageForAdmin,
    getBannerAdmin,
    getBannerById,
    editPromotion,
    getCustomDetail,
    getStandardCustomDetail,
    /***************************************/
    addCart,
    getCartDetail,
    getProductForCart,
    getCustomDetailForCart,
    updateUserKeyInCart,
    quantityOfProduct,
    totalPriceOfProduct,
    editQuantity,
    removeCart,
    /***********************************/
    cardDetail,
    getCardDetail,
    addMeasurement,
    /**********************************************/
    getMeasurement,
    notSecleted,
    isSecleted,
    removeMeasurement,
    getFreeMeasurement,
    getPaidMeasurement,
    getCustomPaymentDelail,
    viewMeasurement,
    isPaid,
    isPaidCount,
    editMUserStatus,
    /******************************************************************/

    addCheckOut,
    getCheckOut,
    getAddress,
    addOrder,
    addOrderDetail,
    getOrderDetail,
    getOrderDetailForUser,
    getOrderMeasurement,
    getOrderNumber,
    getSentNotification,
/************************************************************/
    addFandQ,
    getFAQ,
    getFAQAR,
    getFAQAdmin,
    addNotification,
    getNotification,
    addVideo,
    getVideoLink,
    getAllVideoLink,
    /***********************************************************/

    getOrderRecieved,
    editOrder,
    /**********************************************************/
    removeOrderNumber,
    getOrderShipped,
    getOrderDelivered,
    getOrderDeliveredHistory,
    editTransaction,
    removeCartOnPayment,
    getOrderDetailUser,
    editOrderPackingStatus,
    editOrderDeliveredStatus,
    editOrderShippedStatus,
    getOrderId,
    getOrderTransaction,
    getFilterByPrice,
    addMeasurementHistory,
    getMeasurementHistory,
    getMeasurementHistoryForUser,
    addTMeasurement,
    mTypeCount,
    removePromotion,
    getOrderByUser,
    getRevenue,
    removeFitting,
   //  checkOutRemoveCartForProduct,
   //  checkOutRemoveCartForCustom,

}
