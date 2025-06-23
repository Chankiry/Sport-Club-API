// ===========================================================================>> Core Library
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op } from 'sequelize';
import * as moment from 'moment';

// ===========================================================================>> Custom Library
import { CreateBlacklistDto } from './dto';
import { UpdateBlacklistDto } from './dto';
import Blacklist from 'src/models/user/blacklists.model';
import User from 'src/models/user/user.model';
import UsersRole from 'src/models/user/role.model';
import { UsersActiveEnum } from 'src/app/enums/user/active.enum';

@Injectable()
export class AdminBlackListService {
  // ========== Create ==========
 async create(data: CreateBlacklistDto) {
    try {
        const user = await User.findByPk(data.user_id, {
        attributes: ['name', 'phone', 'phone2'],
        });

        if (!user) {
        throw new NotFoundException('User not found');
        }

        const created = await Blacklist.create({
        ...data,
        name: user.name,
        phone1: user.phone,
        phone2: user.phone2,
        });

        return {
        data: created,
        message: 'Blacklist entry created successfully.',
        };
    } catch (error) {
        console.error('❌ Create error:', error);
        throw new BadRequestException('Failed to create blacklist entry.');
    }
    }


  // ========== Read All ==========
  async getData(query?: { search?: string }) {
    try {
      const where: any = {};

      if (query?.search) {
        const term = `%${query.search}%`;
        where[Op.or] = [
          { name: { [Op.iLike]: term } },
          { phone1: { [Op.iLike]: term } },
          { phone2: { [Op.iLike]: term } },
          { reason: { [Op.iLike]: term } },
        ];
      }

      const data = await Blacklist.findAll({
        where,
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'phone', 'email','avatar'],
            include: [{ model: UsersRole, attributes: ['id', 'name'] }],
          },
        ],
        order: [['created_at', 'DESC']],
      });

      return { data, message: 'Blacklist data retrieved successfully.' };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to load blacklist data.');
    }
  }

  // ========== Read One ==========
  async findOne(id: number) {
    const item = await Blacklist.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'phone', 'email'],
          include: [{ model: UsersRole, attributes: ['id', 'name'] }],
        },
      ],
    });

    if (!item) throw new NotFoundException('Blacklist entry not found');
    return item;
  }

  // ========== Update ==========
  async update(id: number, data: UpdateBlacklistDto) {
  const item = await Blacklist.findByPk(id, {
    raw: false, 
  });

  if (!item) throw new NotFoundException('Blacklist entry not found');

  const updated = await item.update(data); 
  return {
    data: updated,
    message: 'Blacklist entry updated successfully.',
  };
}
    async updateReason(id: number, reason: string) {
  const [affectedRows] = await Blacklist.update(
    { reason },
    { where: { id } }
  );

  if (affectedRows === 0) {
    throw new NotFoundException('Blacklist entry not found');
  }

  const updated = await Blacklist.findByPk(id);
  
  return {
    data: updated,
    message: 'Blacklist reason updated successfully.',
  };
}


  // ========== Delete ==========
  async remove(id: number) {
    const item = await this.findOne(id);
    await item.destroy();
    return { message: 'Blacklist entry removed successfully.' };
  }

 // ========== Setup Data: List users with ID & Name ==========
async getSetupData() {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'phone'], // include id for selection, name for display
      where: { is_active: UsersActiveEnum.Active }, // optional filter for only active users
      order: [['name', 'ASC']],
    });

    return {
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        phone: user.phone
      }))
    };
  } catch (error) {
    console.error('❌ Setup error:', error);
    throw new BadRequestException('Setup data load failed.');
  }
}


  // ========== Get User Info By ID ==========
  async getUserInfoById(userId: number) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ['id', 'name', 'phone', 'email', 'avatar'],
        include: [{ model: UsersRole, attributes: ['id', 'name'] }],
      });

      if (!user) throw new NotFoundException('User not found');

      return { user };
    } catch (error) {
      console.error('❌ User lookup error:', error);
      throw new BadRequestException('Failed to fetch user info');
    }
  }
}
