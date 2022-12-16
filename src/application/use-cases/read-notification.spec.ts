import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { Content } from "../entitites/content";
import { Notification } from "../entitites/notification";
import { ReadNotification } from "./read-notification"
import { NotificationNotFound } from "./errors/notification-not-found";



describe('Cancel notification', () => {
    it('should be able to send a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const readNotification = new ReadNotification(notificationsRepository);

        const notification = new Notification({
            category: 'social',
            content: new Content('Nova solicitação de amizade!'),
            recipientId: 'example-recipient-id'
        })

        await notificationsRepository.create(notification);

        await readNotification.execute({
            notificationId: notification.id,
        })
        // console.log(notifications)
        expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date))
    })

    it('should not be able to read an non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const readNotification = new ReadNotification(notificationsRepository);

        
        // console.log(notifications)
        expect(() => {
            return  readNotification.execute({
                notificationId: 'fake-notification-id',
            })
        }).rejects.toThrow(NotificationNotFound)
    })

})