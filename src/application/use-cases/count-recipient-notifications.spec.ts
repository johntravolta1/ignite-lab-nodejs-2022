import { makeNotification } from "../../../test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { Content } from "../entitites/content";
import { Notification } from "../entitites/notification";
import { CancelNotification } from "./cancel-notification"
import { CountRecipientNotifications } from "./count-recipient-notifications";
import { NotificationNotFound } from "./errors/notification-not-found";



describe('Count recipients notification', () => {
    it('should be able to count recipient notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository);

        await notificationsRepository.create(makeNotification({recipientId: 'recipient-1'}))

        await notificationsRepository.create(makeNotification({recipientId: 'recipient-1'}))

        await notificationsRepository.create(makeNotification());

        const {count} = await countRecipientNotifications.execute({
            recipientId: 'recipient-1',
        })
        // console.log(notifications)
        expect(count).toEqual(2);
    })


})