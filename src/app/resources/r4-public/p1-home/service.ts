// public/home.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import Equipment from 'src/models/equiment/equitments.model';
import Sports from 'src/models/sport/sports.model';

const IMAGE_URL = 'http://localhost:5173'; // Your frontend's base URL

@Injectable()
export class PublicHomeService {
  async getData() {
    try {
      // 1. Fetch all equipment with their sport
      const equipments = await Equipment.findAll({
        include: [Sports],
        order: [['created_at', 'DESC']]
      });

      // 2. Group by sport name dynamically
      const groupedEquipments: Record<string, any[]> = {};

      for (const item of equipments) {
        const sportName = item.sport?.name || 'Unknown Sport';

        if (!groupedEquipments[sportName]) {
          groupedEquipments[sportName] = [];
        }

        groupedEquipments[sportName].push({
          id: item.id,
          name: item.name,
          image: item.image,
          description: item.description,
          price: item.price,
          sport_id: item.sport_id,
          sport_name: sportName, 
        });
      }

      return {
        message: 'All equipment grouped by sport',
        data: groupedEquipments,
      };
    } catch (error) {
      console.error('❌ PublicHomeService Error:', error);
      throw new BadRequestException(error.message || 'Failed to fetch equipment data.');
    }
  }
}
