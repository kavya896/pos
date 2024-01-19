
//Once payment is done

const Customer = require("../model/customer")
const Transaction = require("../model/transactions")

exports.transactionDetails = async (req, res) => {
    try {
        var data = []
        const transaction = await Transaction.find().populate("orderNo")
        for (i = 0; i < transaction.length; i++) {

            const customer = await Customer.findById(transaction[i].orderNo.customerId)
            data.push({
                orderNo: transaction[i].orderNo.billNumber,
                name: customer.name,
                items: transaction[i].totalNoOfItems,
                amount: transaction[i].amount,
                orderType: transaction[i].orderType,
                payment: "cash",
                updatedOn: transaction[i].updatedOn.toLocaleString()
            })
        }
      
        res.send(data)
    } catch (err) {
        console.log(err)
    }
}

//gross sales
exports.grossSales = async (req, res) => {
    try {
        const { startDay, endDay, startPeriod, endPeriod, allday } = req.body
        const transaction = await Transaction.find()
        // const starts = new Date(Date.now(startDay)).toISOString().split('T')[0]
        // const ends = new Date(Date.now(endDay)).toISOString().split('T')[0]
        
        const date1 = new Date(startDay)
        const date2 = new Date(endDay)
        var start = Math.floor(date1.getTime() / (3600 * 24 * 1000)); //days as integer from..
        var end = Math.floor(date2.getTime() / (3600 * 24 * 1000)); //days as integer from..
        var daysDiff = end - start; // exact dates
        var arrayOfData = []
        for(var i=0;i<daysDiff+1;i++){
            var next = new Date(startDay).setDate(new Date(startDay).getDate() + i)
            if(!startPeriod){
                transaction.forEach((item,index)=>{
                    if(item.updatedOn.getDate()==new Date(next).getDate()){
                       arrayOfData.push(transaction[index])
                    }
                })
            }else{
                transaction.forEach((item,index)=>{
                    // && item.updatedOn.getHours()<new Date(endPeriod).getHours()
                    if(item.updatedOn.getDate()==new Date(next).getDate()  && startPeriod.split(":")[0]<= item.updatedOn.getHours() && item.updatedOn.getHours()<=endPeriod.split(":")[0]){
                        console.log(transaction[index].updatedOn.getHours(),startPeriod.split(":")[0],endPeriod.split(":")[0])
                       arrayOfData.push(transaction[index])
                    }
                })
            }
            
        }
        res.send(arrayOfData)
    } catch (err) {
        console.log(err)
    }
}