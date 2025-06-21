// ===========================================================================>> Core Library
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Sequelize } from 'sequelize';
import * as moment from 'moment';

// ===========================================================================>> Custom Library
import { CreateSportDto, UpdateSportDto } from './dto';
import Sports from 'src/models/sport/sports.model';
import { FileService } from 'src/app/services/file.service';
import sequelizeConfig from 'src/config/sequelize.config';

@Injectable()
export class AdminSportService {
  constructor(private fileService: FileService) {}

  private isValidBase64(str: string): boolean {
    return /^data:image\/[a-zA-Z]+;base64,[a-zA-Z0-9+/=\r\n]+$/.test(str);
  }

  async findAll(): Promise<Sports[]> {
    return await Sports.findAll({ order: [['created_at', 'DESC']] });
  }

  async findOne(id: number): Promise<Sports> {
    const sport = await Sports.findByPk(id);
    if (!sport) throw new NotFoundException('Sport not found');
    return sport;
  }

  async create(data: CreateSportDto): Promise<Sports> {
    const sequelize = new Sequelize(sequelizeConfig);
    const transaction = await sequelize.transaction();
    try {
      if (data?.image && data.image !== '') {
        if (!this.isValidBase64(data.image)) {
          await transaction.rollback();
          throw new BadRequestException('រូបភាពត្រូវតែជា base64');
        }
        const result = await this.fileService.uploadBase64Image('sport', data.image);
        if (result.error) throw new BadRequestException(result.error);
        data.image = result.file?.uri;
      } else {
        data.image = 'static/sport-club/user/avatar.png';
      }

      const sport = await Sports.create(data, { transaction });
      await transaction.commit();
      return sport;
    } catch (err) {
      await transaction.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async update(id: number, data: UpdateSportDto): Promise<Sports> {
    const transaction = await Sports.sequelize.transaction();
    try {
      const sport = await this.findOne(id);

      if (data?.image && data.image !== '') {
        if (!this.isValidBase64(data.image)) {
          await transaction.rollback();
          throw new BadRequestException('រូបភាពត្រូវតែជា base64');
        }
        const result = await this.fileService.uploadBase64Image('sport', data.image);
        if (result.error) throw new BadRequestException(result.error);
        data.image = result.file?.uri;
      }

      const updated = await sport.update(data, { transaction });
      await transaction.commit();
      return updated;
    } catch (error) {
      await transaction.rollback();
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    const sport = await this.findOne(id);
    await sport.destroy();
    return { message: 'Sport deleted successfully' };
  }
}
