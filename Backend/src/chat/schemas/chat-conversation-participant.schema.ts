import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { TABLE_NAMES } from "src/common/constants/table-name.constant";

export type ChatConversationParticipantDocument = ChatConversationParticipant &
  Document;

@Schema({
  collection: TABLE_NAMES.CHAT_CONVERSATION_PARTICIPATE,
  timestamps: true,
})
export default class ChatConversationParticipant {
  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: TABLE_NAMES.USER,
  })
  userId: string[];

  @Prop({ default: null })
  conversationName: string;

  @Prop({ default: false })
  isGroupChat: boolean;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: TABLE_NAMES.USER,
  })
  createdBy: string;

  @Prop({ default: Date.now })
  joinedAt: Date;

  @Prop({ default: false })
  isBlocked: boolean

  @Prop({
    default: null,
    type: MongooseSchema.Types.ObjectId,
    ref: TABLE_NAMES.USER
  })
  blockedBy: string

  @Prop({ type: Map, of: Date }) // Map to store readState
  readState: Map<string, Date>;
}

export const ChatConversationParticipantSchema = SchemaFactory.createForClass(
  ChatConversationParticipant
);
