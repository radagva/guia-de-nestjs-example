import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

const pets = [
  { id: 1, name: "peto" },
  { id: 2, name: "striky" },
  { id: 3, name: "milo" },
];

// class ValidateMinLightPipe implements PipeTransform<string, string> {
//   transform(value: string): string {
//     if (value.length < 2) {
//       return value.repeat(8);
//     }
//
//     return value;
//   }
// }

// const ValidateMinLightPipe = {
//   transform(value: string): string {
//     if (value.length < 2) {
//       return value.repeat(8);
//     }
//
//     return value;
//   },
// };

class SavePetBodyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(7)
  public name: string;

  @IsEmail()
  public owner: string;
}

class ValidateQueryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  public name: string;
}

@Controller()
export class AppController {
  @Get("mascotas")
  getHello() {
    return {
      value: "hello world!",
    };
  }

  @Get("/pets")
  loadPets(@Query(ValidationPipe) query: ValidateQueryDto) {
    console.log({ query });
    return pets.filter((pet) =>
      pet.name.toLowerCase().includes(query.name.toLowerCase()),
    );
  }

  @Get("pets/:id")
  loadPet(@Param("id", ParseIntPipe) id: number) {
    return pets.find((pet) => pet.id === id);
  }

  @Get("/pets/:id/abilities/:ability")
  loadPetAbilities() {
    return [];
  }

  @Post("/pets")
  savePet(@Body(ValidationPipe) input: SavePetBodyDto) {
    return input;
  }
}
