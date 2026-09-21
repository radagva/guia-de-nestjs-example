import { Module } from "@nestjs/common";
import { PetsController } from "./pets.controller";
import { PetsService } from "./pets.service";
import {
  FACTORY_CONFIG,
  FACTORY_PROVIDER,
  READABLE_PROVIDER,
  StorageManager,
  VALUE_CONFIG,
  VALUE_PROVIDER,
  WRITABLE_PROVIDER,
  type ValueConfig,
} from "./pets.constants";

@Module({
  controllers: [PetsController],
  providers: [
    StorageManager,
    {
      provide: PetsService,
      useClass: PetsService,
    },
    {
      provide: VALUE_PROVIDER,
      useValue: VALUE_CONFIG,
    },
    {
      provide: FACTORY_PROVIDER,
      useFactory: (valueConfig: ValueConfig) => {
        console.log("INJECTED", valueConfig);

        return FACTORY_CONFIG;
      },
      inject: [VALUE_PROVIDER],
    },
    {
      provide: READABLE_PROVIDER,
      useExisting: StorageManager,
    },
    {
      provide: WRITABLE_PROVIDER,
      useExisting: StorageManager,
    },
  ],
})
export class PetsModule {}
