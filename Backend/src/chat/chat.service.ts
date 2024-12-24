import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { TABLE_NAMES } from "src/common/constants/table-name.constant";
import { CustomError } from "src/common/helpers/exceptions";
import { Users } from "src/users/schemas/user.schema";
import {
  BlockUserDto,
  ConversationDTO,
  CreateMessageDto,
  CreateRoom,
  EditConversationDto,
  ReadMessageDTO,
  ReceiveMessageDto
} from "./dto/index.dto";
import ChatConversationParticipant from "./schemas/chat-conversation-participant.schema";
import ChatMassages from "./schemas/chat-massages.schema";

@Injectable()
export class ChatServices {
  constructor(
    @InjectModel(ChatMassages.name)
    private readonly messageSchema: Model<ChatMassages>,
    @InjectModel(ChatConversationParticipant.name)
    private readonly conversationSchema: Model<ChatConversationParticipant>,
    @InjectModel(Users.name)
    private readonly userSchema: Model<Users>
  ) { }

  // Get userlist
  async getConversationList(data: any) {
    try {

      // Get conversation with user detail and last message
      const conversationList = await this.conversationSchema.aggregate([
        // Get conversation list based on userId or createdBy
        {
          $match: {
            $or: [
              {
                userId: {
                  $in: [new mongoose.Types.ObjectId(data.user._id as string)]
                },
              }, {
                createdBy: new mongoose.Types.ObjectId(data.user._id as string)
              }
            ]
          },
        },
        // find last message from message collection using conversationId 
        // If conversation has no message then lastMessage will be null
        {
          $lookup: {
            from: TABLE_NAMES.CHAT_MASSAGES,
            localField: "_id",
            foreignField: "conversationId",
            as: "lastMessage",
          },
        },
        {
          // Lookup to get user details for the participants
          $lookup: {
            from: TABLE_NAMES.USER,
            localField: "userId",
            foreignField: "_id",
            as: "participantDetails",
          },
        },
        // Get unread message count
        {
          $lookup: {
            from: TABLE_NAMES.CHAT_MASSAGES,
            localField: "_id",
            foreignField: "conversationId",
            as: "allMessage",
          }
        },
        // SORTING CONVERSATION BASED ON LAST MESSAGE AT
        { $sort: { "lastMessage.createdAt": -1 } },
        {
          $project: {
            _id: 1,
            conversationName: 1,
            isGroupChat: 1,
            joinedAt: 1,
            lastMessage:
            {
              $arrayElemAt: [{
                $map: {
                  input: {
                    $filter: {
                      input: "$lastMessage",
                      as: "message",
                      cond: {
                        // Get the last message based on the latest createdAt
                        $eq: ["$$message.createdAt", { $max: "$lastMessage.createdAt" }],
                      },
                    },
                  },
                  as: "message",
                  in: {
                    messageText: "$$message.messageText",
                    createdAt: "$$message.createdAt"
                  }
                }
              }, 0],
            }
            ,
            // Determine the other user who is not the current user
            // If the user is a group chat, then the other user is the one who created the group chat
            otherUser: {
              $arrayElemAt: [
                {
                  $map: {
                    input: {
                      $filter: {
                        input: "$participantDetails",
                        as: "user",
                        cond: {
                          $ne: ["$$user._id", new mongoose.Types.ObjectId(data.user._id)],
                        },

                      },
                    },
                    as: "user",
                    in: {
                      _id: "$$user._id",
                      firstName: "$$user.firstName",
                      lastName: "$$user.lastName",
                    },
                  },
                },
                0,
              ],
            },
            unreadMessageCount: {
              $size: {
                $filter: {
                  input: "$allMessage",
                  as: "message",
                  cond: {
                    $and: [
                      {
                        $gt: [{ $max: "$$message.createdAt" }, `$readState.${data.user._id}`],
                      },
                      {
                        $ne: ["$$message.senderId", new mongoose.Types.ObjectId(data.user._id)],
                      }
                    ]
                    // $gt: [`$readState.${data.user._id}`, { $max: "$$message.createdAt" }],
                  },
                },
              }
            }
          },
        }
      ])



      return conversationList;
    } catch (error) {
      throw CustomError.UnknownError(error.message);
    }
  }

  // Get Conversation
  async getConversation(data: ReceiveMessageDto, response: any) {
    try {
      // Get conversation with user detail
      const conversation = await this.conversationSchema.findById(
        data.conversationId
      );
      if (!conversation) {
        throw CustomError.UnknownError("Conversation not found");
      }

      // Get last message from message collection using conversationId
      const lastMessage = await this.messageSchema
        .findOne({ conversationId: data.conversationId })
        .sort({ createdAt: -1 })
        .select({ messageText: 1, createdAt: 1 });

      // Get conversation details, user details, and last message from conversation collection
      const conversationDetails = await this.conversationSchema
        .aggregate([
          {
            $match: {
              _id: new mongoose.Types.ObjectId(data.conversationId),
            },
          },
          {
            // Get user details from user collection using userId (userId is an array)
            $lookup: {
              from: TABLE_NAMES.USER,
              localField: "userId",
              foreignField: "_id",
              as: "users",
            },
          },
          {
            // Get creator details from user collection using createdBy
            $lookup: {
              from: TABLE_NAMES.USER,
              localField: "createdBy",
              foreignField: "_id",
              as: "createdBy",
            },
          },
          // Get blocked user details from user collection using blockedBy
          {
            $lookup: {
              from: TABLE_NAMES.USER,
              localField: "blockedBy",
              foreignField: "_id",
              as: "blockedBy",
            }
          },
          {
            $project: {
              createdBy: {
                $arrayElemAt: [
                  {
                    $map: {
                      input: "$createdBy",
                      as: "creator",
                      in: {
                        _id: "$$creator._id",
                        name: {
                          $concat: ["$$creator.firstName", " ", "$$creator.lastName"],
                        },
                      },
                    },
                  },
                  0,
                ],
              },
              isBlocked: "$isBlocked",
              isGroupChat: "$isGroupChat",
              conversationName: "$conversationName",
              joinedAt: "$joinedAt",
              // return all other users except the current user
              otherUser: {
                $map: {
                  input: {
                    $filter: {
                      input: "$users",
                      as: "user",
                      cond: {
                        $ne: ["$$user._id", new mongoose.Types.ObjectId(response.user._id)],
                      },
                    },
                  },
                  as: "user",
                  in: {
                    _id: "$$user._id",
                    firstName: "$$user.firstName",
                    lastName: "$$user.lastName",
                  },
                },
              },
              blockedBy: {
                $arrayElemAt: [
                  {
                    $map: {
                      input: "$blockedBy",
                      as: "block",
                      in: {
                        _id: "$$block._id",
                        name: {
                          $concat: ["$$block.firstName", " ", "$$block.lastName"],
                        },
                      },
                    },
                  },
                  0,
                ],
              },
            },
          },
        ])
        .exec(); // Execute the aggregation pipeline

      return { ...conversationDetails[0], lastMessage };
    } catch (error) {
      throw CustomError.UnknownError(error.message);
    }
  }

  // Get massage
  async getMessageList(data: ReceiveMessageDto) {
    try {
      const massageList = await this.messageSchema.find({
        conversationId: new mongoose.Types.ObjectId(data.conversationId),
      });

      if (massageList?.length === 0) {
        return [];
      }

      // Perform aggergate
      const list = await this.messageSchema
        .aggregate([
          {
            $match: {
              conversationId: new mongoose.Types.ObjectId(data.conversationId),
            },
          },
          {
            $lookup: {
              from: TABLE_NAMES.USER,
              localField: "senderId",
              foreignField: "_id",
              as: "senderDetails",
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $project: {
              createdAt: 1,
              messageText: "$messageText",
              conversationId: "$conversationId",
              senderDetail: {
                $arrayElemAt: [{
                  $map: {
                    input: "$senderDetails",
                    as: "sender",
                    in: {
                      _id: "$$sender._id",
                      firstName: "$$sender.firstName",
                      lastName: "$$sender.lastName",
                      email: "$$sender.email",
                    },
                  }
                }, 0],
              },
            },
          },
        ])
        .exec(); // execute the aggregation pipeline

      return list;
    } catch (error) {
      throw CustomError.UnknownError(error.message);
    }
  }

  // Create massage
  async createMessage(data: CreateMessageDto,) {
    try {
      let conversation;
      if (!data?.conversationId) {
        throw CustomError.UnknownError("conversationId is required");
      }

      conversation = await this.conversationSchema.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(data.conversationId) },
        { $set: { [`readState.${data.userId}`]: new Date() } }
      );

      if (!conversation) {
        throw CustomError.UnknownError("Conversation not found");
      }

      // If conversationId is blocked return error
      if (conversation.isBlocked) {
        throw CustomError.UnknownError("Conversation is blocked");
      }

      let message;
      if (conversation?._id) {
        // add conversationId to data in objectId format
        message = await this.messageSchema.create({
          ...data,
          conversationId: new mongoose.Types.ObjectId(data.conversationId),
          senderId: new mongoose.Types.ObjectId(data.userId),
        });
      }

      const messageAggregation = await this.messageSchema.aggregate([
        {
          $match: { _id: message._id }, // Match the newly created message
        },
        {
          $lookup: {
            from: TABLE_NAMES.USER,
            localField: "senderId",
            foreignField: "_id",
            as: "senderDetails",
          },
        },
        {
          $project: {
            conversationId: "$conversationId",
            messageText: "$messageText",
            senderDetail: {
              $arrayElemAt: [
                {
                  $map: {
                    input: "$senderDetails",
                    as: "sender",
                    in: {
                      _id: "$$sender._id",
                      firstName: "$$sender.firstName",
                      lastName: "$$sender.lastName",
                    },
                  },
                },
                0,
              ],
            },
          },
        },
      ]);

      return messageAggregation[0]; // Return the first result of the aggregation
    } catch (error) {
      throw CustomError.UnknownError(error.message);
    }
  }

  // Edit massage
  async editConversation(data: EditConversationDto) {
    try {
      // Create an update object
      const update = {
        conversationName: data?.conversationName,
      };

      // If userId is provided, push the new userIds to the userId array
      if (data?.userId && data.userId.length > 0) {
        const checkUser = await this.conversationSchema.findOne({
          _id: new mongoose.Types.ObjectId(data?.conversationId),
          userId: {
            $in: data.userId.map(
              (userId) => new mongoose.Types.ObjectId(userId)
            ),
          },
        });
        if (checkUser) {
          throw CustomError.UnknownError("User already exist in conversation");
        }

        update["$push"] = {
          userId: {
            $each: data.userId.map(
              (userId) => new mongoose.Types.ObjectId(userId)
            ),
          },
        };

        const checkUserIds = await this.conversationSchema.findOne({
          _id: new mongoose.Types.ObjectId(data?.conversationId),
        })
        console.log('checkUserIds: ', checkUserIds);
        console.log('checkUserIds: ', typeof checkUserIds);
        console.log('checkUserIds: ', checkUserIds?.userId);
        console.log('update: ', update);
        // If userId is more than 2, set isGroupChat to true
        if (checkUserIds?.userId?.length + data?.userId?.length > 2) {
          console.log('----------->');
          update["$set"] = {
            ...update["$set"], // Merge in case there are existing $set fields
            isGroupChat: true, // Set isGroupChat to true
          };
        }
      }

      // Perform the update operation
      const result = await this.conversationSchema.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(data?.conversationId) },
        update,
        { new: true }
      );

      const conversationDetails = await this.conversationSchema
        .aggregate([
          {
            $match: {
              _id: new mongoose.Types.ObjectId(result._id),
            },
          },
          {
            // Get user details from user collection using userId , usrId is Array
            $lookup: {
              from: TABLE_NAMES.USER,
              localField: "userId",
              foreignField: "_id",
              as: "users",
            },
          },
          {
            $lookup: {
              from: TABLE_NAMES.USER,
              localField: "createdBy",
              foreignField: "_id",
              as: "createdBy",
            },
          },
          {
            $project: {
              createdBy: {
                $arrayElemAt: [
                  {
                    $map: {
                      input: "$createdBy",
                      as: "creator",
                      in: {
                        _id: "$$creator._id",
                        firstName: "$$creator.firstName",
                        lastName: "$$creator.lastName",
                      },
                    },
                  },
                  0,
                ],
              },
              isGroupChat: "$isGroupChat",
              conversationName: "$conversationName",
              joinedAt: "$joinedAt",
              // Use $map to iterate through each user and return only specific fields
              users: {
                $map: {
                  input: "$users",
                  as: "user",
                  in: {
                    _id: "$$user._id",
                    firstName: "$$user.firstName",
                    lastName: "$$user.lastName",
                  },
                },
              },
            },
          },
        ])
        .exec(); // execute the aggregation pipeline

      return conversationDetails;
    } catch (error) {
      throw CustomError.UnknownError(error.message);
    }
  }

  // Delete massage
  async deleteMessage(data: any) {
    try {
      const massage = await this.messageSchema.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(data._id),
      });
      return massage;
    } catch (error) {
      throw CustomError.UnknownError(error.message);
    }
  }

  // Block user
  async blockUser(data: BlockUserDto) {
    try {
      const findUser = await this.conversationSchema.findOne({ _id: new mongoose.Types.ObjectId(data?.conversationId) });
      if (!findUser) {
        throw CustomError.UnknownError("User not found");
      }

      await this.conversationSchema.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(data?.conversationId) },
        {
          isBlocked: !findUser?.isBlocked,
          blockedBy: {
            $if: { $eq: [findUser?.isBlocked, true] }, then: null, else:
              data.userId
          }
        }
      );

      return {};
    } catch (error) {
      throw CustomError.UnknownError(error.message);
    }
  }

  // Create user room
  async createRoom(data: CreateRoom) {
    try {

      const roomData = {
        userId: [...data.userId, data.creatorId],
        isGroupChat: data.isGroup ?? false,
        createdBy: data.creatorId,
        isBlocked: false,
        conversationName: data?.groupName
      }

      // find that chat that have same user and created id and it is not a group throw error 
      const findRoom = await this.conversationSchema.findOne(
        {
          isGroupChat: false,
          userId: {
            $all: roomData.userId.map((item: any) => new mongoose.Types.ObjectId(item)),
          },
        }
      )

      if (findRoom) {
        throw CustomError.UnknownError("You already have a chat with this user");
      }

      const createRoom = await this.conversationSchema.create(roomData);
      return createRoom;
    }
    catch (error) {
      throw CustomError.UnknownError(error.message);
    }
  }

  // Get message by conversationId
  async getMessageByConversationId(data: ReceiveMessageDto) {
    try {
      if (!data?.conversationId) {
        throw CustomError.UnknownError("conversationId is required");
      }

      const message = await this.messageSchema.find({
        conversationId: new mongoose.Types.ObjectId(data?.conversationId),
      });
      return message;
    } catch (error) {
      throw CustomError.UnknownError(error.message);
    }
  }

  // Update socket for user
  async updateSocketForUser(data: ConversationDTO, socketId: string) {
    try {
      const user = await this.userSchema.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(data.userId) },
        { socketId: socketId }
      );
      return user;
    } catch (error) {
      throw CustomError.UnknownError(error.message);
    }
  }

  // get All ChatRooms
  async getAllChatRooms(data: ConversationDTO) {
    try {
      const rooms = await this.conversationSchema.find({
        userId: { $in: [data.userId] }
      });
      return rooms;
    } catch (error) {
      throw CustomError.UnknownError(error.message);
    }
  }

  // read message 
  async readMessage(data: ReadMessageDTO) {
    try {
      const findConversation = await this.conversationSchema.findById(data.conversationId);

      if (!findConversation) {
        throw CustomError.UnknownError("Conversation not found");
      }

      await this.conversationSchema.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(data.conversationId)
        },
        {
          $set: { [`readState.${data.userId}`]: new Date() }
        }
      )

      return {}
    }
    catch (err) {
      throw CustomError.UnknownError(err.message);
    }
  }
}
