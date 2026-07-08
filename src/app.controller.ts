import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";

const pets = [
  { id: 1, name: "peto" },
  { id: 2, name: "striky" },
  { id: 3, name: "milo" },
];

@Controller()
export class AppController {
  @Get("mascotas")
  getHello() {
    return {
      value: "hello world!",
    };
  }

  @Get("/pets")
  loadPets(@Query("name") name: string) {
    return pets.filter((pet) =>
      pet.name.toLowerCase().includes(name.toLowerCase()),
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
}
