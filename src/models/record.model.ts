import mongoose, { Schema, Document } from "mongoose";

export interface IRecord extends Document {
  amount: number;
  type: "income" | "expense";
  category: string;
  date: Date;
  note?: string;
}

const recordSchema = new Schema<IRecord>(
  {
    amount: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true
    },
    category: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    note: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRecord>("Record", recordSchema);