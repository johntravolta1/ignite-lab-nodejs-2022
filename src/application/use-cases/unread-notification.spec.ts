import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { Content } from "../entitites/content";
import { Notification } from "../entitites/notification";
import { UnreadNotification } from "./unread-notification"
import { NotificationNotFound } from "./errors/notification-not-found";



describe('Unread notification', () => {
    it('should be able to unread a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);

        const notification = new Notification({
            category: 'social',
            content: new Content('Nova solicitação de amizade!'),
            recipientId: 'example-recipient-id',
            readAt: new Date(),
        })

        await notificationsRepository.create(notification);

        await unreadNotification.execute({
            notificationId: notification.id,
        })
        // console.log(notifications)
        expect(notificationsRepository.notifications[0].readAt).toBeNull()
    })

    it('should not be able to unread an non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);

        
        // console.log(notifications)
        expect(() => {
            return  unreadNotification.execute({
                notificationId: 'fake-notification-id',
            })
        }).rejects.toThrow(NotificationNotFound)
    })

})