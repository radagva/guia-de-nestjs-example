import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { SavePetBodyDto } from "src/pets/dto/save-pet-input.dto";
import { ValidatePetsQueryDto } from "./dto/validate-pets-query.dto";
import { type Response, type Request } from "express";
import { PetsService } from "./pets.service";

@Controller("pets")
export class PetsController {
  constructor(private readonly petService: PetsService) {}

  @Get()
  loadPets(@Query() query: ValidatePetsQueryDto) {
    return this.petService.findAll(query.name);
  }

  @Get(":id")
  loadPet(@Param("id", ParseIntPipe) id: number) {
    return this.petService.find(id);
  }

  @Post()
  savePet(@Body() input: SavePetBodyDto) {
    return this.petService.store(input);
  }

  // @Put(":id")
  // updatePet(
  //   @Param("id", ParseIntPipe) id: number,
  //   @Body() input: UpdatePetDto,
  // ) {
  //   const pet = pets.find((current) => current.id === id);
  //
  //   if (!pet) throw new NotFoundException("Pet not found");
  //
  //   return input;
  // }
  //
  // @Patch(":id")
  // partiallyUpdatePet(
  //   @Param("id", ParseIntPipe) id: number,
  //   @Body() input: PartiallyUpdatePetDto,
  // ) {
  //   const pet = pets.find((current) => current.id === id);
  //
  //   if (!pet) throw new NotFoundException("Pet not found");
  //
  //   return {
  //     ...pet,
  //     ...input,
  //   };
  // }
  //
  // @Delete(":id")
  // deletePet(@Param("id", ParseIntPipe) id: number) {
  //   const foundIndex = pets.findIndex((current) => current.id === id);
  //
  //   if (foundIndex === -1) throw new NotFoundException("Pet not found");
  //
  //   pets.splice(foundIndex, 1);
  //
  //   return pets;
  // }

  @Post("example")
  @Header("X-Custom-Header-2", "Milo")
  public handlerFunc(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.setHeader("X-Custom-Example-Header", "Angel");
    res.status(500);

    return 1;
  }
}
