
// //Once payment is done

// const Customer = require("../model/customer")
// const Item = require("../model/item")
// const Transaction = require("../model/transactions")


// exports.transactionDetails = async (req, res) => {
//     try {
//         var data = []
//         const transaction = await Transaction.find().populate("orderNo")
//         for (i = 0; i < transaction.length; i++) {

//             const customer = await Customer.findById(transaction[i].orderNo.customerId)
//             data.push({
//                 orderNo: transaction[i].orderNo.billNumber,
//                 name: customer.name,
//                 items: transaction[i].totalNoOfItems,
//                 amount: transaction[i].amount,
//                 orderType: transaction[i].orderType,
//                 payment: "cash",
//                 updatedOn: transaction[i].updatedOn.toLocaleString()
//             })
//         }
      
//         res.send(data)
//     } catch (err) {
//         console.log(err)
//     }
// }

// //gross sales
// exports.grossSales = async (req, res) => {
//     try {
//         const { startDay, endDay, startPeriod, endPeriod, allday } = req.body
//         const data = await specficData(startDay,endDay,startPeriod,endPeriod)
//         var mappingValues = []
//         data.forEach((item,index)=>{
//            mappingValues.push(item.orderNo.grandTotal)
//         })
//         console.log(mappingValues)
//         res.send(data)
//     } catch (err) {
//         console.log(err)
//     }
// }

// exports.refunds = async(req,res) =>{
//     try{
//         const { startDay, endDay, startPeriod, endPeriod, allday } = req.body
//         const data = await specficData(startDay,endDay,startPeriod,endPeriod)
//         var mappingValues = []
//         data.forEach((item,index)=>{
//            mappingValues.push(item.orderNo.refund)
//         })
//         console.log(mappingValues)
//         res.send(data) 
//     }catch(err){
//         console.log(err)
//     }
// }

// exports.discount = async(req,res) =>{
//     try{
//         const { startDay, endDay, startPeriod, endPeriod, allday } = req.body
//         const data = await specficData(startDay,endDay,startPeriod,endPeriod)
//         var mappingValues = []
//         data.forEach((item,index)=>{
//            mappingValues.push(item.orderNo.discount)
//         })
//         console.log(mappingValues)
//         res.send(data) 
//     }catch(err){
//         console.log(err)
//     }
// }

// exports.netSales = async(req,res) =>{
//     try{
//         const { startDay, endDay, startPeriod, endPeriod, allday } = req.body
//         const data = await specficData(startDay,endDay,startPeriod,endPeriod)
//         var mappingValues = []
//         data.forEach((item,index)=>{
//            mappingValues.push(item.orderNo.grandTotal-item.orderNo.discount)
//         })
//         console.log(mappingValues)
//         res.send(data) 
//     }catch(err){
//         console.log(err)
//     }
// }
// exports.grossprofit = async(req,res) =>{
//     try{
//         const { startDay, endDay, startPeriod, endPeriod, allday } = req.body
//         const data = await specficData(startDay,endDay,startPeriod,endPeriod)
//         var mappingValues = []
//         data.forEach((item,index)=>{
//            mappingValues.push(item.orderNo.grandTotal/100)
//         })
//         console.log(mappingValues)
//         res.send(data) 
//     }catch(err){
//         console.log(err)
//     }
// }
// const specficData = async (startDay,endDay,startPeriod,endPeriod)=>{
//     const transaction = await Transaction.find().populate("orderNo")
//         // const starts = new Date(Date.now(startDay)).toISOString().split('T')[0]
//         // const ends = new Date(Date.now(endDay)).toISOString().split('T')[0]
        
//         const date1 = new Date(startDay)
//         const date2 = new Date(endDay)
//         var start = Math.floor(date1.getTime() / (3600 * 24 * 1000)); //days as integer from..
//         var end = Math.floor(date2.getTime() / (3600 * 24 * 1000)); //days as integer from..
//         var daysDiff = end - start; // exact dates
//         var arrayOfData = []
//         for(var i=0;i<daysDiff+1;i++){
//             var next = new Date(startDay).setDate(new Date(startDay).getDate() + i)
//             if(!startPeriod){
//                 transaction.forEach((item,index)=>{
//                     if(item.updatedOn.getDate()==new Date(next).getDate()){
//                        arrayOfData.push(transaction[index])
//                     }
//                 })
//             }else{
//                 transaction.forEach((item,index)=>{
//                     // && item.updatedOn.getHours()<new Date(endPeriod).getHours()
//                     if(item.updatedOn.getDate()==new Date(next).getDate()  && startPeriod.split(":")[0]<= item.updatedOn.getHours() && item.updatedOn.getHours()<=endPeriod.split(":")[0]){
//                         // console.log(transaction[index].updatedOn.getHours(),startPeriod.split(":")[0],endPeriod.split(":")[0])
//                        arrayOfData.push(transaction[index])
//                     }
//                 })
//             }
            
//         }
//         return arrayOfData
// }

// // sales By Item

// exports.salesByItems = async(req,res)=>{
//     try{
//         const { startDay, endDay, startPeriod, endPeriod, allday } = req.body
//         const data = await specficData(startDay,endDay,startPeriod,endPeriod)
        
//         var arrayOfItemList = []
//         data.forEach((items,index)=>{
//             items.orderNo.item.forEach(async(ite,ind)=>{
//                 arrayOfItemList.push(ite.product)
//             })
            
//         })
//         let count = {}
//         arrayOfItemList.forEach(val=>count[val]=(count[val]||0)+1)
//         uniqueArray = arrayOfItemList.filter(function(item, pos) {
//             return arrayOfItemList.indexOf(item) == pos;
//         })
//         console.log(arrayOfItemList,Object.keys(count).length)
//         console.log(uniqueArray.length)
        
//     }catch(err){
//         console.log(err)
//     }
// }