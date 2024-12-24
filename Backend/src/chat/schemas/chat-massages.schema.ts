import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { TABLE_NAMES } from "src/common/constants/table-name.constant";

export type ChatMassagesDocument = ChatMassages & Document;

@Schema({ collection: TABLE_NAMES.CHAT_MASSAGES, timestamps: true })
export default class ChatMassages {
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: TABLE_NAMES.CHAT_CONVERSATION_PARTICIPATE,
  })
  conversationId: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: TABLE_NAMES.USER,
  })
  senderId: string;

  @Prop({ type: String, required: true })
  messageText: string;
}

export const ChatMassagesSchema = SchemaFactory.createForClass(ChatMassages);
