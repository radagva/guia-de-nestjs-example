import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
} from "class-validator";

export class SavePetBodyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(7)
  public name: string;

  @IsEmail()
  public owner: string;
}
