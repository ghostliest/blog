import * as fs from 'fs/promises';
import * as path from 'path';
import * as uuid from 'uuid';

type fileType = 'post' | 'avatar';

export interface IFilesService {
  create(file: Express.Multer.File, type: fileType): Promise<string>;
  delete(fileName: string, type: fileType): Promise<void>;
}

export class FilesService implements IFilesService {
  private pathResolve(type: fileType): string {
    try {
      return path.resolve(__dirname, '..', '..', 'static', `${type}s`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(file: Express.Multer.File, type: fileType): Promise<string> {
    try {
      const fileName = `${uuid.v4()}.${file.originalname.split('.')[1]}`;
      const filePath = this.pathResolve(type);
      await fs.access(filePath).catch(async () => {
        return await fs.mkdir(filePath, { recursive: true });
      });
      await fs.writeFile(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(fileName: string, type: fileType): Promise<void> {
    try {
      const filePath = this.pathResolve(type);
      await fs.unlink(path.join(filePath, fileName));
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
