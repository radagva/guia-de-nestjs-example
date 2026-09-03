import { PartialType } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class UpdatePetDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(7)
  public name: string;

  @IsInt()
  public years: number;

  @IsNotEmpty()
  @IsString()
  public owner: string;
}

export class PartiallyUpdatePetDto extends PartialType(UpdatePetDto) {}
