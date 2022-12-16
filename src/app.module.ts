import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './infra/database/database.module';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { HttpModule } from './infra/http/http.module';
import { MessagingModule } from './infra/messaging/message.module';

@Module({
  imports: [HttpModule, DatabaseModule, MessagingModule],
})
export class AppModule {}
