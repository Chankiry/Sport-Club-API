// ================================================================>> Third Party Library
import { Model, Column, Table, ForeignKey, BelongsTo, HasOne, DataType } from 'sequelize-typescript';

// ================================================================>> Custom Library
import User from '../user/user.model'; 
import Pitches from '../pitch/pitches.model';
import DatesType from '../pitch/dates_type.model';
import TimesType from '../pitch/times_type.model';
import SportTeams from '../sport/sport_teams.model';
import BookingStatus from './booking_status.model';
import TeamsGrade from '../sport/team_grades.model';
import Payment from '../payment/payment.model';
 

@Table({ tableName: 'bookings', createdAt: 'created_at', updatedAt: 'updated_at' })
class Booking extends Model<Booking> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(15) })
    phone1: string;

    @Column({ allowNull: true, type: DataType.STRING(15) })
    phone2: string;

    // Foreign Key for Pitch model
    @ForeignKey(() => Pitches)
    @Column({ allowNull: false, type: DataType.INTEGER })
    pitch_id: number;

    // Foreign Key for User model
    @ForeignKey(() => User)
    @Column({ allowNull: false, type: DataType.INTEGER })
    user_id: number;

    @Column({ allowNull: false, type: DataType.DATE })
    date: Date;

    // Foreign Key for DateType model
    @ForeignKey(() => DatesType)
    @Column({ allowNull: false, type: DataType.INTEGER })
    date_type_id: number;

    @Column({ allowNull: false, type: DataType.TIME })
    time: string;

    // Foreign Key for TimeType model
    @ForeignKey(() => TimesType)
    @Column({ allowNull: false, type: DataType.INTEGER })
    time_type_id: number;

    @Column({ allowNull: false, type: DataType.INTEGER })
    duration: number;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    needed_match: boolean;

    // Foreign Key for SportTeam model (sport_team_id remains optional)
    @ForeignKey(() => SportTeams)
    @Column({ allowNull: true, type: DataType.INTEGER })
    sport_team_id: number;

    // Foreign Key for BookingStatus model
    @ForeignKey(() => BookingStatus)
    @Column({ allowNull: true, type: DataType.INTEGER })
    booking_status_id: number;

    // Foreign Key for TeamGrade model (match_grade_id is now team_grade_id)
    @ForeignKey(() => TeamsGrade)
    @Column({ allowNull: true, type: DataType.INTEGER })
    team_grade_id: number;

    @Column({ allowNull: false, type: DataType.STRING(255) })
    price: string;

    @Column({ allowNull: false, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    updated_at: Date;

    // Associations (BelongsTo)
    @BelongsTo(() => Pitches)
    pitch: Pitches;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => DatesType)
    date_type: DatesType;

    @BelongsTo(() => TimesType)
    time_type: TimesType;

    @BelongsTo(() => SportTeams)
    sport_team: SportTeams;

    @BelongsTo(() => BookingStatus)
    booking_status: BookingStatus;

    @BelongsTo(() => TeamsGrade)
    team_grade: TeamsGrade;

    // 1 to 0..1 relationship with Payment
    @HasOne(() => Payment)
    payment: Payment;
}

export default Booking;
