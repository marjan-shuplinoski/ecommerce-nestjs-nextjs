import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as generateUUID } from 'uuid';

@Injectable()
export class FileUploadService {
  private readonly uploadDir: string;
  private readonly maxFileSize = 2 * 1024 * 1024; // 2MB
  private readonly allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

  constructor(private configService: ConfigService) {
    this.uploadDir = this.configService.get<string>('UPLOAD_DIR') || './uploads/avatars';
    this.ensureUploadDirExists();
  }

  private ensureUploadDirExists(): void {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  validateFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (file.size > this.maxFileSize) {
      throw new BadRequestException('File size exceeds 2MB limit');
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only JPEG, JPG, PNG, and GIF files are allowed');
    }
  }

  async uploadProfileImage(file: Express.Multer.File): Promise<string> {
    this.validateFile(file);

    const fileExtension = path.extname(file.originalname);

    const uuid: string = generateUUID();
    const fileName = `${uuid}${fileExtension}`;
    const filePath = path.join(this.uploadDir, fileName);

    try {
      await fs.promises.writeFile(filePath, file.buffer);

      // Return relative path for storage in database
      return `/uploads/avatars/${fileName}`;
    } catch {
      throw new BadRequestException('Failed to save file');
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    if (!filePath) return;

    const fullPath = path.join(process.cwd(), filePath);

    try {
      const exists = await fs.promises
        .access(fullPath)
        .then(() => true)
        .catch(() => false);
      if (exists) {
        await fs.promises.unlink(fullPath);
      }
    } catch (error) {
      // Log error but don't throw - file deletion is not critical
      console.error('Failed to delete file:', error);
    }
  }
}
