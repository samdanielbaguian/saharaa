import Notification from '../models/notification';

export const sendNotification = async (
  userId: number,
  message: string
): Promise<Notification> => {
  // Création d'une nouvelle notification en base de données
  return await Notification.create({
    userId,
    message,
    read: false,
    createdAt: new Date()
  });
};

// Pour marquer une notification comme lue (optionnel)
export const markNotificationAsRead = async (
  notificationId: number
): Promise<[number, Notification[]]> => {
  return await Notification.update(
    { read: true },
    { where: { id: notificationId }, returning: true }
  );
};