import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatServices } from "./chat.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "src/users/schemas/user.schema";
import ChatMassages, {
  ChatMassagesSchema,
} from "./schemas/chat-massages.schema";
import ChatConversationParticipant, {
  ChatConversationParticipantSchema,
} from "./schemas/chat-conversation-participant.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: ChatMassages.name, schema: ChatMassagesSchema },
      {
        name: ChatConversationParticipant.name,
        schema: ChatConversationParticipantSchema,
      },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatServices],
  exports: [],
})
export class ChatModule { }
