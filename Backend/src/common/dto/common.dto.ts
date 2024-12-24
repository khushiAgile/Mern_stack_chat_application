import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  ValidateIf,
  IsDateString,
  IsString,
} from "class-validator";

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class DateRangeDto {
  @ApiProperty({ type: Date, format: "date" })
  @ValidateIf((r) => r.endDate)
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ type: Date, format: "date" })
  @ValidateIf((r) => r.startDate)
  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}

export class UserIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  _id: string;
}