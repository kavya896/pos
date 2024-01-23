const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    name:{
        type:String
    },
    posAccessRight:{
        type:Boolean,
        default:false
    },
    pos:{
        type:Array
    },
    // pos:[{
    //     payments:{
    //         type:Boolean,
    //         default:false
    //     },
    //     discounts:{
    //         type:Boolean,
    //         default:false
    //     },
    //     taxes:{
    //         type:Boolean,
    //         default:false
    //     },
    //     openTickets:{
    //         type:Boolean,
    //         default:false
    //     },
    //     voidOpenTickets:{
    //         type:Boolean,
    //         default:false
    //     },
    //     openCashDrawer:{
    //         type:Boolean,
    //         default:false
    //     },
    //     receipts:{
    //         type:Boolean,
    //         default:false
    //     },
    //     refunds:{
    //         type:Boolean,
    //         default:false
    //     },
    //     reprintResendReceipts:{
    //         type:Boolean,
    //         default:false
    //     },
    //     shiftReports:{
    //         type:Boolean,
    //         default:false
    //     },
    //     manageItems:{
    //         type:Boolean,
    //         default:false
    //     },
    //     ViewCost:{
    //         type:Boolean,
    //         default:false
    //     },
    //     changeSettings:{
    //         type:Boolean,
    //         default:false
    //     },
    //     liveChat:{
    //         type:Boolean,
    //         default:false
    //     }
    // }],
    backOfficeAccessRight:{
        type:Boolean,
        default:false
    },
    backOffice:{
        type:Array
    }
    // backOffice:[{
    //     viewSalesReports:{
    //         type:Boolean,
    //         default:false
    //     },
    //     cancelReceipts:{
    //         type:Boolean,
    //         default:false
    //     },
    //     manageItems:{
    //         type:Boolean,
    //         default:false
    //     },
    //     viewCostOfItems:{
    //         type:Boolean,
    //         default:false
    //     },
    //     manageEmployees:{
    //         type:Boolean,
    //         default:false
    //     },
    //     manageCustomers:{
    //         type:Boolean,
    //         default:false
    //     },
    //     editGeneralSettings:{
    //         type:Boolean,
    //         default:false
    //     },
    //     manageBilling:{
    //         type:Boolean,
    //         default:false
    //     },
    //     managePayment:{
    //         type:Boolean,
    //         default:false
    //     },
    //     manageloyaltyPrograms:{
    //         type:Boolean,
    //         default:false
    //     },
    //     manageTaxes:{
    //         type:Boolean,
    //         default:false
    //     },
    //     manageKitchenPrinters:{
    //         type:Boolean,
    //         default:false
    //     },
    //     manageDiningOptions:{
    //         type:Boolean,
    //         default:false
    //     },
    //     managePosDevices:{
    //         type:Boolean,
    //         default:false
    //     }, 
    //     liveChat:{
    //         type:Boolean,
    //         default:false
    //     }
    // }],
    

})

const AccessPermission = mongoose.model("AccessPermission",schema)
module.exports = AccessPermission