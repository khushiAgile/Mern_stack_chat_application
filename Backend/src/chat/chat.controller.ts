import { Body, Controller, Get, Post, Query, Req, } from "@nestjs/common";
import { ChatServices } from "./chat.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateMessageDto, CreateRoom, ReadMessageDTO, } from "./dto/index.dto";
import { ResponseMessage } from "src/common/decorators/response.decorator";

@Controller("chat")
@ApiTags("Chat")
@ApiBearerAuth()
export class ChatController {
  constructor(private readonly chatService: ChatServices) { }

  // Get userlist
  @Get("userList")
  @ResponseMessage("Get user list success")
  // Get token from header
  async getConversationList(@Req() response: any) {
    return await this.chatService.getConversationList(response);
  }

  // Create room 
  @Post("createRoom")
  @ResponseMessage("Create room success")
  async createRoom(@Body() data: CreateRoom) {
    return await this.chatService.createRoom(data);
  }

  // Get Conversation detail
  @Get("conversationDetail")
  @ResponseMessage("Get conversation success")
  async getConversation(@Query("conversationId") conversationId: string, @Req() response: any) {
    return await this.chatService.getConversation({ conversationId }, response);
  }

  // Create message
  @Post("createMessage")
  @ResponseMessage("Create message success")
  async createMessage(@Body() data: CreateMessageDto) {
    return await this.chatService.createMessage(data);
  }

  // Get message by conversationId
  @Get("messageList")
  @ResponseMessage("Get message success")
  async getMessageList(@Query("conversationId") conversationId: string) {
    return await this.chatService.getMessageList({ conversationId });
  }

  // read message 
  @Post("readMessage")
  @ResponseMessage("Read message success")
  async readMessage(@Body() data: ReadMessageDTO) {
    return await this.chatService.readMessage(data);
  }

}
