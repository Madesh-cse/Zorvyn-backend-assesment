import { NextFunction, Request, Response } from "express";
import Record from "../models/record.model"


// Get the summary of a finance histroy
export const getDashboardSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Calculate the total income by using aggregate 
        const totalIncome = await Record.aggregate([
            { $match: { type: "income" } },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }

        ])

        // Calculate the total expenses 
        const totalExpense = await Record.aggregate([
            {
                $match: {
                    type: "expense"
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ])

        // calculate the catagory wise sum
        const categoryTotals = await Record.aggregate([
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            }
        ]);

        const recentActitvity = await Record.find().sort({ createdAt: - 1 }).limit(5);
        const income = totalIncome[0]?.total || 0;
        const expense = totalExpense[0]?.total || 0;
        res.status(200).json({
            message: "Dashboard summary fetched successfully",
            summary: {
                totalIncome: income,
                totalExpenses: expense,
                netBalance: income - expense,
                categoryTotals,
                recentActitvity
            }
        })
    }
    catch (err: any) {
        res.status(500).json({
            message: "Failed to fetch dashboard summary",
            err
        });
    }
}