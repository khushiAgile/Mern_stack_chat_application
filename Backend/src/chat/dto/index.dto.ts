import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
export class CreateMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  messageText: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  conversationId: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // senderId: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // conversationName: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsBoolean()
  // isGroupChat: boolean;
}

export class ReceiveMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  conversationId: string;
}

export class EditConversationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  conversationId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  conversationName: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  userId: string[];
}

export class BlockUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  conversationId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class ConversationDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class CreateRoom {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  creatorId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  userId: string[];

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isGroup: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  groupName: string

}

export class ReadMessageDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  conversationId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}