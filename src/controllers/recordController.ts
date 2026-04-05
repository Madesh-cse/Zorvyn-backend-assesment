import { NextFunction, Request, Response } from "express";
import Record from "../models/record.model"


// create a record
export const CreateRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { amount, type, category, date } = req.body;
         // Error Handling and validation for the record creation
        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than 0"
            });
        }
        if(!type || !["income", "expense"].includes(type)){
            return res.status(400).json({
                message:"Type must be either income or expense"
            })
        }
        if(!category){
            return res.status(400).json({
                message:"Category is required"
            })
        }
        if(!date){
            return res.status(400).json({
                message:"Date is required"
            })
        }
        const record = await Record.create(req.body);
        // In the response we are sending the created record to the client 
        return res.status(201).json({
            message: "Record is created successfully",
            records: record
        })
    }
    catch (err: any) {
        res.status(500).json({
            message: "Failed to create a record",
            err
        })
    }
}

// View and filter all the record from the Get Request
export const getAllRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type, catagory, date, search, page="1", limit="5" } = req.query;

        // Building a dynamic filter object based on the query parameters provided by the client
        let filter: any = {};
        if (type) {
            filter.type = type;
        }
        if (catagory) {
            filter.catagory = catagory;
        }
        if (date) {
            filter.date = date;
        }
        // Implemeting a search support to search the record by catagory and type
        if(search){
            // using regular expression to search the record
            filter.$or = [
                { catagory: 
                    { 
                        $regex: search, 
                        $options: "i" 
                    } 
                },
                {
                    note:{
                        $regex: search,
                        $options: "i"
                    }
                },
                { type: 
                    { $regex: search, 
                        $options: "i" 
                    } 
                }
            ]
        }

        // Implementing pagination to limit  the number of record
        const pageNumber = parseInt(page as string);
        const limitNumber = parseInt(limit as string);
        const skip = (pageNumber - 1) * limitNumber;

        const record = await Record.find(filter)
        .skip(skip)
        .limit(limitNumber)
        .sort({date: -1});

        if(!record.length){
            return res.status(404).json({
                message: `No record found  for ${
                    search ||  catagory || type
                }`
            })
        }
        const totalRecord = await Record.countDocuments(filter);
        return res.status(200).json({
            message: "Record Fetch successfully",
            currentPage: pageNumber,
            totalPages : Math.ceil(totalRecord / limitNumber),
            totalRecord,
            getRecord: record
        })
    }
    catch (err: any) {
        res.status(500).json({
            message: "Failed to fetch the records",
            err
        })
    }
}

// Update the record 
export const UpdateRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateRecord = await Record.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        )
        if(!updateRecord){
            return res.json({
                message:"Record is found"
            })
        }
        res.status(200).json({
            message: "Record updated successfully",
            UpdatedRecord: updateRecord
        });
    }
    catch (err: any) {
        res.status(500).json({
            message: "Failed to update record",
            err
        });
    }
}

// Delete the Record
export const deleteRecord = async (req: Request, res: Response) => {
    try {
        const deleteRecord = await Record.findByIdAndDelete(req.params.id);
        if(!deleteRecord){
            return res.status(400).json({
                message:"Record is not found"
            })
        }

        res.status(200).json({
            message: "Record deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete record",
            error
        });
    }
};
