import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io'; // Correct import
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust CORS as needed
  },
})
export class ChatGateway {
  @WebSocketServer() // Inject the WebSocket server instance
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  async handleMessage(@MessageBody() createChatDto: CreateChatDto): Promise<void> {
    // Save the message to the database
    const newChat = await this.chatService.create(createChatDto);

    // Broadcast the message to all connected clients
    this.server.emit('chatCreated', newChat);
  }

  @SubscribeMessage('findAllChat')
  async findAll(): Promise<void> {
    const chats = await this.chatService.findAll();
    this.server.emit('allChats', chats); // Emit all chats to the client
  }

  @SubscribeMessage('findOneChat')
  async findOne(@MessageBody() id: string): Promise<void> {
    const chat = await this.chatService.findOne(id);
    this.server.emit('singleChat', chat); // Emit the single chat to the client
  }

  @SubscribeMessage('updateChat')
  async update(@MessageBody() updateChatDto: UpdateChatDto): Promise<void> {
    const updatedChat = await this.chatService.update(updateChatDto.id, updateChatDto);
    this.server.emit('chatUpdated', updatedChat); // Emit the updated chat to the client
  }

  @SubscribeMessage('removeChat')
  async remove(@MessageBody() id: string): Promise<void> {
    const removedChat = await this.chatService.remove(id);
    this.server.emit('chatRemoved', removedChat); // Emit the removed chat to the client
  }
}