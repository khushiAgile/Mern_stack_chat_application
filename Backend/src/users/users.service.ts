import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import mongoose, { Aggregate, Model } from "mongoose";
import { LoginDto } from "../common/dto/common.dto";
import { AuthExceptions, TypeExceptions } from "../common/helpers/exceptions";
import { Users, UsersDocument } from "../users/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { RESPONSE_ERROR } from "../common/constants/response.constant";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    private readonly configService: ConfigService
  ) {
    // Due to transient scope, UsersService has its own unique instance of MyLogger,
    // so setting context here will not affect other instances in other services
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(userId: string) {
    return await this.userModel.findOne({
      _id: userId,
    });
  }


  async createInitialUser(): Promise<void> {
    const user = await this.getUserByEmail(
      this.configService.get("database.initialUser.email")
    );

    if (user) {
      console.log("user: ", user);
    } else {
      const params: CreateUserDto = {
        firstName: this.configService.get("database.initialUser.firstName"),
        lastName: this.configService.get("database.initialUser.lastName"),
        email: this.configService.get("database.initialUser.email"),
        password: "",
        isActive: true,
      };

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(
        this.configService.get("database.initialUser.password"),
        salt
      );

      params.password = hash;

      await this.userModel.create(params);
    }
  }

  async login(params: LoginDto) {
    const user = await this.userModel.findOne({
      email: params.email,
    });

    if (!user) {
      throw AuthExceptions.AccountNotExist();
    }

    if (!user.isActive) {
      throw AuthExceptions.AccountNotActive();
    }

    if (!bcrypt.compareSync(params.password, user.password)) {
      throw AuthExceptions.InvalidPassword();
    }
    delete user.password;
    delete user.__v;

    return user;
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({
      email: email,
    });
  }

  async getAllUserList(response) {
    const getAllUser = await this.userModel.aggregate([
      {
        $match: {
          isActive: true,
          _id: {
            $ne: new mongoose.Types.ObjectId(response?.user?._id)
          }
        }
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          isActive: 1,
        },
      }
    ])

    return getAllUser;
  }


}
