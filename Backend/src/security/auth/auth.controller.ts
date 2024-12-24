import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Public } from "./auth.decorator";
import { LoginDto } from "../../common/dto/common.dto";
import { ResponseMessage } from "../../common/decorators/response.decorator";
import { RESPONSE_SUCCESS } from "../../common/constants/response.constant";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @ResponseMessage(RESPONSE_SUCCESS.USER_LOGIN)
  @Post("/login")
  async login(@Body() params: LoginDto) {
    return await this.authService.login(params);
  }

  @Post("/register")
  @ResponseMessage(RESPONSE_SUCCESS.USER_INSERTED)
  @Public()
  @ApiOperation({
    description: `
    This API will be used for creating new user using the admin panel.

    Figma Screen Reference: AP - User 1.0 To 1.6
        
    Below is the flow:

    1). Check email is exist OR not in tbl_user table if the user is already exist then give the error response with **This email is already registered with us.** Otherwise we have to insert the new user into the tbl_user table also we need to create a JWT token for the user and returning to the response.

    2). Password should be encrypted while storing the user information into the database.
    `,
  })
  @ApiOkResponse({
    schema: {
      example: {
        statusCode: HttpStatus.OK,
        message: RESPONSE_SUCCESS.USER_INSERTED,
        data: {
          firstName: "string",
          lastName: "string",
          gender: "string",
          email: "string",
          accessToken: "string",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    schema: {
      example: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "This email is already registered with us.",
        data: {},
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
}
