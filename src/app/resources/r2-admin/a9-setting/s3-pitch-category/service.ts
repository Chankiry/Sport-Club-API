// ===========================================================================>> Core Library
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize }       from 'sequelize';
import * as moment  from 'moment';
import PitchesCategory from 'src/models/pitch/pitches_category.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePitchCategoryDto, UpdatePitchCategoryDto } from './dto';
import Sports from 'src/models/sport/sports.model';
import { catchError } from 'rxjs';
import { FileService } from 'src/app/services/file.service';
import sequelizeConfig from 'src/config/sequelize.config';


// ===========================================================================>> Custom Library

// ===>> Model
@Injectable()
export class AdminPitchCategoryService {
  constructor(
    private fileService: FileService,
    @InjectModel(PitchesCategory)
    private readonly model: typeof PitchesCategory
  ) {}

    private isValidBase64(str: string): boolean {
        return /^data:image\/[a-zA-Z]+;base64,[a-zA-Z0-9+/=\r\n]+$/.test(str);
    }

  async getData() {
    try {
      const categories = await this.model.findAll({ include: ['sport'] });
      return categories.map((item) => ({
        id: item.id,
        name: item.name,
        basePrice: item.price,
        maxCapacity: item.required_players,
        volume: item.volume,
        img: item.image,
      }));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(body: CreatePitchCategoryDto) {
    const sequelize = new Sequelize(sequelizeConfig);
    const transaction = await sequelize.transaction();
    try {
      const sport = await Sports.findByPk(body.sport_id);
      if (!sport) {
        await transaction.rollback();
        throw new BadRequestException('Sport with this ID does not exist.');
      }
        if (body?.image && body?.image !== "" && body.image !== null) {
                if (this.isValidBase64(body.image)) {
                    const result = await this.fileService.uploadBase64Image('sport', body.image);
                    if (result.error) {
                        throw new BadRequestException(result.error);
                    }
                    // Replace base64 string with file URI from FileService
                    body.image = result.file?.uri;
                } else {
                    await transaction.rollback();
                    throw new BadRequestException('រូបភាពត្រួវតែជា base64');
                }
            }
            else{
                body.image = 'static/sport-club/user/avatar.png';
            }


      const created = await this.model.create(body, { transaction });
      await transaction.commit();

      return {
        id: created.id,
        name: created.name,
        price: created.price,
        required_players: created.required_players,
        volume: created.volume,
        img: created.image,
      };
    } catch (err) {
      await transaction.rollback();
    //   console.error('Create Error:', err);
      throw new BadRequestException(err.message);
    }
  }

  async update(id: number, body: UpdatePitchCategoryDto) {
    const transaction = await this.model.sequelize.transaction();
    try {
      const record = await this.model.findByPk(id);
      if (!record) {
        await transaction.rollback();
        throw new NotFoundException('Pitch category not found.');
      }

      if (body.sport_id !== null && body.sport_id !== undefined) {
        const sport = await Sports.findByPk(body.sport_id);
        if (!sport) {
          await transaction.rollback();
          throw new BadRequestException('Sport with this ID does not exist.');
        }
      }

        if (body?.image && body?.image !== "" && body.image !== null) {
                if (this.isValidBase64(body.image)) {
                    const result = await this.fileService.uploadBase64Image('sport', body.image);
                    if (result.error) {
                        throw new BadRequestException(result.error);
                    }
                    // Replace base64 string with file URI from FileService
                    body.image = result.file?.uri;
                } else {
                    await transaction.rollback();
                    throw new BadRequestException('រូបភាពត្រួវតែជា base64');
                }
            }
            else{
                body.image = 'static/sport-club/user/image.png';
            }
      const updated = await record.update(body, { transaction });
      await transaction.commit();

      return {
        id: updated.id,
        name: updated.name,
        price: updated.price,
        required_players: updated.required_players,
        volume: updated.volume,
        image: updated.image || '',
      };
    } catch (error) {
      await transaction.rollback();
      console.error('Update Error:', error);
      throw new BadRequestException(error.message);
    }
  }

  async setupData() {
    try {
      const sports = await Sports.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
      });

      return {
        sports: sports.map((s) => ({
          id: s.id,
          name: s.name,
        })),
      };
    } catch (error) {
      throw new BadRequestException('Failed to load setup data');
    }
  }

  async delete(id: number) {
    const record = await this.model.findByPk(id);
    if (!record) throw new NotFoundException('Pitch category not found');
    await record.destroy();
    return { message: 'Deleted successfully' };
  }
}
