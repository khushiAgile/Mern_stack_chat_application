import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatServices } from "src/chat/chat.service";
import ChatMassages, {
  ChatMassagesSchema,
} from "src/chat/schemas/chat-massages.schema";
import { Users, UsersSchema } from "src/users/schemas/user.schema";
import { ChatGateways } from "./event.gateways";
import { ChatModule } from "src/chat/chat.module";
import { UsersService } from "src/users/users.service";
import { UsersModule } from "src/users/users.module";
import ChatConversationParticipant, {
  ChatConversationParticipantSchema,
} from "src/chat/schemas/chat-conversation-participant.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ChatMassages.name,
        schema: ChatMassagesSchema,
      },
      {
        name: Users.name,
        schema: UsersSchema,
      },
      {
        name: ChatConversationParticipant.name,
        schema: ChatConversationParticipantSchema,
      },
    ]),
    ChatModule,
    UsersModule,
  ],
  providers: [ChatGateways, ChatServices, UsersService],
  exports: [ChatGateways],
})
export class EventGatewaysModule {}
