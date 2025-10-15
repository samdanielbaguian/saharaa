import { Request, Response } from 'express';
import Notification from '../models/notification';

export const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const notifications = await Notification.findAll({ where: { userId } });
    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;
    const [affectedRows] = await Notification.update(
      { read: true },
      { where: { id: notificationId } }
    );
    if (!affectedRows) return res.status(404).json({ message: 'Notification non trouvée.' });
    return res.status(200).json({ message: 'Notification marquée comme lue.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};