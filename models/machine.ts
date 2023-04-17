
import mongoose, { Schema, Document } from 'mongoose';

export interface IMachine extends Document {
    id: string;
    boardNum: number[];
}

const machineSchema: Schema = new Schema({
    id: { type: String, required: true },
    boardNum: { type: [Number], required: true }
})

const Machine = mongoose.model<IMachine>('Machine', machineSchema);
export default Machine;