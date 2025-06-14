import { Injectable, InternalServerErrorException } from '@nestjs/common';
import PitchesCategory from 'src/models/pitch/pitches_category.model';
import SportRating from 'src/models/sport/sport_ratings.model';
import Sports from 'src/models/sport/sports.model';
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
async getPitchCategoriesBySportId(sport_id: number) {
  try {
    const categories = await PitchesCategory.findAll({
      where: { sport_id },
      include: [{ model: Sports, attributes: ['id', 'name'] }],
      order: [['created_at', 'DESC']],
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      image: category.image,
      required_players: category.required_players,
      volume: category.volume,
      price: category.price,
      created_at: category.createdAt,
      updated_at: category.updatedAt,
      sport: category.sport
        ? {
            id: category.sport.id,
            name: category.sport.name,
          }
        : null,
    }));
  } catch (error) {
    console.error('❌ Failed to fetch pitch categories:', error.message);
    throw new InternalServerErrorException('Failed to fetch pitch categories');
  }
}
}