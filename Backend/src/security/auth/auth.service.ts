import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "../../common/dto/common.dto";
import { UsersService } from "../../users/users.service";
import { JwtPayload } from "../../common//interfaces/jwt.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Users, UsersDocument } from "src/users/schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { TypeExceptions } from "src/common/helpers/exceptions";
import { RESPONSE_ERROR } from "src/common/constants/response.constant";
import * as bcrypt from "bcrypt";


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async login(params: LoginDto) {
    const user = await this.userService.login(params);
    const accessToken = await this.generateAuthToken(user);
    user["accessToken"] = accessToken;
    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken: accessToken,
    };
  }

  async generateAuthToken(user) {
    const payload: JwtPayload = {
      _id: user._id,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }

  async create(createUserDto: CreateUserDto) {
    // Check duplicate user
    if (await this.userService.getUserByEmail(createUserDto.email)) {
      throw TypeExceptions.AlreadyExistsCommonFunction(
        RESPONSE_ERROR.USER_ALREADY_EXIST
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(createUserDto.password, salt);

    createUserDto.password = hash;
    createUserDto.isActive = true;

    return await this.userModel.create(createUserDto);
  }


}
