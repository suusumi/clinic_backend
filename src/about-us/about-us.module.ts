import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database/database.module";
import {AboutUsController} from "./about-us.controller";
import {AboutUsService} from "./about-us.service";

@Module({
    imports: [DatabaseModule],
    controllers: [AboutUsController],
    providers: [AboutUsService],
})
export class AboutUsModule {}