import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { SavePetBodyDto } from "src/pets/dto/save-pet-input.dto";
import { ValidatePetsQueryDto } from "./dto/validate-pets-query.dto";
import { PartiallyUpdatePetDto, UpdatePetDto } from "./dto/update-pet.dto";

const pets = [
  { id: 1, name: "peto" },
  { id: 2, name: "striky" },
  { id: 3, name: "milo" },
];

@Controller("pets")
export class PetsController {
  @Get("mascotas")
  getHello() {
    return {
      value: "hello world!",
    };
  }

  @Get()
  loadPets(@Query() query: ValidatePetsQueryDto) {
    console.log({ query });
    return pets.filter((pet) =>
      pet.name.toLowerCase().includes(query.name.toLowerCase()),
    );
  }

  @Get(":id")
  loadPet(@Param("id", ParseIntPipe) id: number) {
    return pets.find((pet) => pet.id === id);
  }

  @Post()
  savePet(@Body() input: SavePetBodyDto) {
    return input;
  }

  @Put(":id")
  updatePet(
    @Param("id", ParseIntPipe) id: number,
    @Body() input: UpdatePetDto,
  ) {
    const pet = pets.find((current) => current.id === id);

    if (!pet) throw new NotFoundException("Pet not found");

    return input;
  }

  @Patch(":id")
  partiallyUpdatePet(
    @Param("id", ParseIntPipe) id: number,
    @Body() input: PartiallyUpdatePetDto,
  ) {
    const pet = pets.find((current) => current.id === id);

    if (!pet) throw new NotFoundException("Pet not found");

    return {
      ...pet,
      ...input,
    };
  }

  @Delete(":id")
  deletePet(@Param("id", ParseIntPipe) id: number) {
    const foundIndex = pets.findIndex((current) => current.id === id);

    if (foundIndex === -1) throw new NotFoundException("Pet not found");

    pets.splice(foundIndex, 1);

    return pets;
  }
}
