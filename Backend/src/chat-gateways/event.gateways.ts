import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { ChatServices } from "src/chat/chat.service";
import { Server, Socket } from "socket.io";
import { UsersService } from "src/users/users.service";
import { BlockUserDto, ConversationDTO, CreateMessageDto } from "src/chat/dto/index.dto";

@WebSocketGateway({
  transports: ["websocket", "polling"],
  cors: {
    origin: "*",
  },
})
export class ChatGateways implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatService: ChatServices,
    private readonly userService: UsersService
  ) { }

  @WebSocketServer() io: Server;
  afterInit() {
    console.log('"Initialized": ');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const { sockets } = this.io.sockets;
    this.io.emit('room', client.id + ' joined!')
    console.log(`Client id: ${client.id} connected`);
    console.log(`Number of connected clients: ${sockets.size}`);
  }

  async handleDisconnect(client: any) {
    this.io.emit('room', client.id + ' left!')
    console.log(`Client id:${client.id} disconnected`);
  }

  @SubscribeMessage('user-connected')
  async userConnect(@MessageBody() data: ConversationDTO, @ConnectedSocket() socket: Socket) {
    const result = await this.chatService.updateSocketForUser(data, socket.id);
    const allRooms = await this.chatService.getAllChatRooms(data);

    if (allRooms?.length) {
      allRooms.forEach((room: any) => {
        socket.join(room._id.toString());
      });
    }

    if (result) {
      return {
        message: 'User connected',
      };
    }
    return {
      message: 'User not found',
    };
  }


  @SubscribeMessage("sendMessage")
  async handleSendMessage(@MessageBody() data: CreateMessageDto): Promise<any> {
    const newMessage = await this.chatService.createMessage(
      data
    );
    this.io.to(data.conversationId).emit("receiveMessage", newMessage);
    return newMessage;
  }

  @SubscribeMessage("editConversation")
  async editConversation(client: any, payload: any): Promise<any> {
    return await this.chatService.editConversation(JSON.parse(payload));
  }

  @SubscribeMessage("getConversationList")
  async getConversationList(client: any, payload: any): Promise<any> {
    return await this.chatService.getConversationList(JSON.parse(payload));
  }

  @SubscribeMessage("blockUser")
  async blockUser(@MessageBody() payload: BlockUserDto): Promise<any> {
    await this.chatService.blockUser((payload));

    const result = await this.chatService.getConversation({ conversationId: payload.conversationId },
      {
        user: { _id: payload.userId }
      }
    );

    this.io.to(payload.conversationId).emit("conversationDetail", result);

    return result;
  }
}
