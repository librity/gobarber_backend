import { isBefore, subHours } from 'date-fns';

import Appointment from '../models/Appointment';
import User from '../models/User';

import Cache from '../../lib/Cache';
import Queue from '../../lib/Queue';

import CancellationMail from '../jobs/CancellationMail';

class CancelAppointmentService {
  async run({ appointment_id, user_id }) {
    const appointment = await Appointment.findByPk(appointment_id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (appointment.user_id !== user_id) {
      throw new Error('You do not have permission to cancel this appointment.');
    }

    const twoHoursBeforeAppointment = subHours(appointment.date, 2);
    const rightNow = new Date();

    if (isBefore(twoHoursBeforeAppointment, rightNow)) {
      throw new Error('You can only cancel appointments two hours in advance.');
    }

    appointment.cancelled_at = rightNow;
    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
    });

    Cache.invalidatePrefix(`user:${user_id}:appointments`);

    return appointment;
  }
}

export default new CancelAppointmentService();
