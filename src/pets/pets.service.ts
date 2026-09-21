import { Inject, Injectable } from "@nestjs/common";
import { SavePetBodyDto } from "./dto/save-pet-input.dto";
import {
  FACTORY_PROVIDER,
  type FactoryConfig,
  VALUE_PROVIDER,
  type ValueConfig,
  StorageManager,
  READABLE_PROVIDER,
  type Readable,
  type Writeable,
} from "./pets.constants";

@Injectable()
export class PetsService {
  constructor(
    @Inject(VALUE_PROVIDER)
    private readonly providedConfig: ValueConfig,

    @Inject(FACTORY_PROVIDER)
    private readonly factoryConfig: FactoryConfig,

    private readonly storageManager: StorageManager,

    @Inject(READABLE_PROVIDER) private readonly readableStorage: Readable,
    @Inject(READABLE_PROVIDER) private readonly writeableStorage: Writeable,
  ) {}

  public pets = [
    { id: 1, name: "peto" },
    { id: 2, name: "striky" },
    { id: 3, name: "milo" },
  ];

  public findAll(name: string) {
    console.log({ value: this.providedConfig, factory: this.factoryConfig });

    this.writeableStorage.write();

    console.log(this.readableStorage.read());

    return this.pets.filter((pet) =>
      pet.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  public find(id: number) {
    return this.pets.find((pet) => pet.id === id);
  }

  public store(input: SavePetBodyDto) {
    return input;
  }

  // public update(id: number) {}
  //
  // public partiallyUpdate(id: number) {}
  //
  // public delete(id: number) {}
}
