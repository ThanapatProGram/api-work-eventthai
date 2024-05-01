import { prop, Ref, mongoose } from '@typegoose/typegoose';

export class User {
  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop()
  name?: string;
}

export const UserSchema = new mongoose.Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
});