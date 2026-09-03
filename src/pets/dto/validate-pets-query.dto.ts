import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ValidatePetsQueryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  public name: string;
}
