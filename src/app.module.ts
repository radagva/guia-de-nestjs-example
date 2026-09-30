import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PetsModule } from "./pets/pets.module";
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [PetsModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
