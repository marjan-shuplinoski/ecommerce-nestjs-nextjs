import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserProfileService } from './services';
import { UserProfileController } from './controllers';
import { FileUploadService } from '../../shared/services/file-upload.service';
import { NotificationService } from '../../shared/notification';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserProfileController],
  providers: [UserProfileService, FileUploadService, NotificationService],
  exports: [UserProfileService],
})
export class UserModule {}
