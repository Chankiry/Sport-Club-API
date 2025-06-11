import { Injectable, InternalServerErrorException } from '@nestjs/common';
import SportRating from 'src/models/sport/sport_ratings.model';
import User from 'src/models/user/user.model';

@Injectable()
export class PublicVenueService {
  async getSportRatingsBySportId(sport_id: number) {
    try {
      const ratings = await SportRating.findAll({
        where: { sport_id },
        include: [{ model: User, attributes: ['id', 'name'] }],
        order: [['created_at', 'DESC']],
      });

      const total = ratings.length;
      const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
      const avg = total > 0 ? (sum / total).toFixed(2) : '0';

      return {
        average_rating: avg,
        total_reviews: total,
        reviews: ratings.map((r) => ({
          id: r.id,
          rating: r.rating,
          description: r.description,
          created_at: r.created_at,
          user: r.user,
        })),
      };
    } catch (err) {
      console.error('Failed to fetch sport ratings:', err);
      throw new InternalServerErrorException('Failed to fetch sport ratings');
    }
  }
}
