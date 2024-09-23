import { Schema, model, SchemaTypes } from 'mongoose';

const schema = new Schema({
    firstName: { type: SchemaTypes.String, required: true },
    lastName: { type: SchemaTypes.String, required: true },
    email: { type: SchemaTypes.String, required: true },
    password: { type: SchemaTypes.String, required: true },
    role: { type: SchemaTypes.String, default: 'user' },
    status: { type: SchemaTypes.String } // new, active, blocked, deleted, archived
});

const user = model('user', schema);
export default user;