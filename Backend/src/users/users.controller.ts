import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  Res,
  Req,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { RESPONSE_SUCCESS } from "../common/constants/response.constant";
import { ResponseMessage } from "../common/decorators/response.decorator";
import { Public } from "../security/auth/auth.decorator";

@Controller("users")
@ApiTags("User Management")
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }



  @Get("getAll")
  @ResponseMessage(RESPONSE_SUCCESS.USER_LISTED)
  getAllUserList(@Req() response: any) {
    return this.usersService.getAllUserList(response);
  }


}
