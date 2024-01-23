const Orders = require("../model/order");

exports.getSalesSummary = async (req, res) => {
        try {
            const summary = await Orders.aggregate([
                {
                  $match: {   
                    paymentStatus: "Paid", 
                  },
                },
                {
                  $unwind: "$item",
                },
                {
                  $group: {
                    _id: null,
                    totalQuantitySold: { $sum: "$item.quantity" },
                    totalGrandTotal: { $sum: "$grandTotal" },
                    totalDiscount: { $sum: "$discount" },
                    totalTax: { $sum: "$tax" },
                    totalRefund: { $sum: "$refund" },
                  },
                },
                {
                  $project: {
                    _id: 0,
                    totalQuantitySold: 1,
                    totalGrandTotal: 1,
                    totalDiscount: 1,
                    totalTax: 1,
                    totalRefund: 1,
                    netSales: {
                      $subtract: [
                        { $add: ["$totalGrandTotal", "$totalRefund"] },
                        { $add: ["$totalDiscount", "$totalTax"] },
                      ],
                    },
                  },
                },
              ]);
          
              if (summary.length > 0) {
                res.status(200).json({
                  success: true,
                  data: summary[0],
                });
              } else {
                res.status(404).json({
                  success: false,
                  message: "No sales data found",
                });
              }
            } catch (error) {
              console.error(error);
              res.status(500).json({
                success: false,
                message: "Internal server error",
              });
          }
  };

  exports.getSalesByItem = async (req, res) => {
    try {
      const salesReport = await Orders.aggregate([
        {
          $match: {
            paymentStatus: "Paid",
          },
        },
        {
          $unwind: "$item",
        },
        {
          $group: {
            _id: "$item.product",
            totalQuantitySold: { $sum: "$item.quantity" },
            totalSales: { $sum: "$grandTotal" },
          },
        },
        {
          $lookup: {
            from: "items", 
            localField: "_id",
            foreignField: "_id",
            as: "itemInfo",
          },
        },
        {
            $unwind: "$itemInfo",
          },
          {
            $lookup: {
              from: "categories", 
              localField: "itemInfo.category",
              foreignField: "_id",
              as: "categoryInfo",
            },
          },
        {
          $project: {
            _id: 0,
            itemName: "$itemInfo.name",
            category: "$categoryInfo.name",
            totalQuantitySold: 1,
            totalSales: 1,
          },
        },
      ]);
  
      if (salesReport.length > 0) {
        res.status(200).json({
          success: true,
          data: salesReport,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "No sales report found",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  exports.getSalestByCategory = async (req, res) => {
    try {
      const salesReport = await Orders.aggregate([
        {
          $match: {
            paymentStatus: "Paid",
          },
        },
        {
          $unwind: "$item",
        },
        {
          $lookup: {
            from: "items", 
            localField: "item.product",
            foreignField: "_id",
            as: "itemInfo",
          },
        },
        {
          $unwind: "$itemInfo",
        },
        {
          $lookup: {
            from: "categories", 
            localField: "itemInfo.category",
            foreignField: "_id",
            as: "categoryInfo",
          },
        },
        {
          $group: {
            _id: "$categoryInfo._id",
            categoryName: { $first: "$categoryInfo.name" },
            totalQuantitySold: { $sum: "$item.quantity" },
            totalSales: { $sum: "$grandTotal" },
          },
        },
        {
          $project: {
            _id: 0,
            categoryName: 1,
            totalQuantitySold: 1,
            totalSales: 1,
          },
        },
      ]);
  
      if (salesReport.length > 0) {
        res.status(200).json({
          success: true,
          data: salesReport,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "No sales report found",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  exports.getSalesByEmployee = async (req, res) => {
    try {
      const salesReport = await Orders.aggregate([
        {
          $match: {
            paymentStatus: "Paid",
            employeeId: { $exists: true },
          },
        },
        {
          $group: {
            _id: "$employeeId",
            totalQuantitySold: { $sum: "$item.quantity" },
            totalSales: { $sum: "$grandTotal" },
          },
        },
        {
          $lookup: {
            from: "employees", 
            localField: "_id",
            foreignField: "_id",
            as: "employeeInfo",
          },
        },
        {
          $project: {
            _id: 0,
            employeeName: { $arrayElemAt: ["$employeeInfo.name", 0] },
            totalQuantitySold: 1,
            totalSales: 1,
          },
        },
      ]);
  
      if (salesReport.length > 0) {
        res.status(200).json({
          success: true,
          data: salesReport,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "No sales report found",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  exports.getSalesDaysSummary = async (req, res) => {
    try {
      const salesSummaries = await Orders.aggregate([
        {
          $match: {
            paymentStatus: 'Paid',
            createdAt: { $exists: true, $ne: null }, 
          },
        },
        {
          $unwind: '$item', 
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' },
              date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            },
            totalSales: { $sum: '$grandTotal' },
            totalQuantitySold: { $sum: '$item.quantity' },
            totalGrandTotal: { $sum: '$grandTotal' },
            totalDiscount: { $sum: '$discount' },
            totalTax: { $sum: '$tax' },
            totalRefund: { $sum: '$refund' },
            netSale: { $sum: { $subtract: [{ $add: ['$grandTotal', '$discount'] }, '$refund'] } }, 
          },
        },
        {
          $sort: {
            '_id.year': 1,
            '_id.month': 1,
            '_id.day': 1,
          },
        },
      ]);
  
      res.json({
        success: true,
        data: salesSummaries,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
  


  exports.getSalesSummaryForDay = async (req, res) => {
    try {
      let specifiedDate = req.query.date; 
      if (!specifiedDate) {
        specifiedDate = new Date();
      } else {
        specifiedDate = new Date(specifiedDate);
      }
  
      specifiedDate.setHours(0, 0, 0, 0);
  
      const salesSummary = await Orders.aggregate([
        {
          $match: {
            paymentStatus: "Paid",
            createdAt: {
              $gte: specifiedDate,
              $lt: new Date(specifiedDate.getTime() + 24 * 60 * 60 * 1000),
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
              day: { $dayOfMonth: "$createdAt" },
            },
            totalSales: { $sum: "$grandTotal" },
          },
        },
        {
          $project: {
            _id: 0,
            date: {
              $dateFromParts: {
                year: "$_id.year",
                month: "$_id.month",
                day: "$_id.day",
              },
            },
            totalSales: 1,
          },
        },
      ]);
  
      if (salesSummary.length > 0) {
        res.status(200).json({
          success: true,
          data: salesSummary,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "No sales summary found for the specified day",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  exports.getSalesByPaymentMethod = async (req, res) => {
    try {
      let { date } = req.query;
      if (!date) {
        const currentDate = new Date();
        date = currentDate.toISOString().split('T')[0];
      }
  
      const salesByPaymentMethod = await Orders.aggregate([
        {
          $match: {
            paymentStatus: 'Paid',
            createdAt: {
              $gte: new Date(`${date}T00:00:00.000Z`),
              $lt: new Date(`${date}T23:59:59.999Z`),
            },
          },
        },
        {
          $group: {
            _id: {
              date: {
                $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
              },
              paymentMethod: {
                $cond: {
                  if: { $eq: ['$paymentType.cash.method', 'CASH'] },
                  then: 'CASH',
                  else: 'CARD',
                },
              },
              paymentType: '$paymentType.cash.method', 
            },
            totalSales: { $sum: '$grandTotal' },
            totalQuantitySold: { $sum: '$item.quantity' },
            totalGrandTotal: { $sum: '$grandTotal' },
            totalDiscount: { $sum: '$discount' },
            totalTax: { $sum: '$tax' },
            totalRefund: { $sum: '$refund' },
            netSale: { $sum: { $subtract: [{ $add: ['$grandTotal', '$discount'] }, '$refund'] } },
            transactionCount: { $sum: 1 },
            paymentMethodDetails: { $first: '$paymentType.cash.method' },
          },
        },
        {
          $sort: {
            '_id.date': 1,
            '_id.paymentMethod': 1,
            '_id.paymentType': 1,
          },
        },
      ]);
  
      res.json({
        success: true,
        data: salesByPaymentMethod,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
  