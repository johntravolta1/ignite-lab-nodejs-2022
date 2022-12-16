import { makeNotification } from "../../../test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { Content } from "../entitites/content";
import { Notification } from "../entitites/notification";
import { CancelNotification } from "./cancel-notification"
import { CountRecipientNotifications } from "./count-recipient-notifications";
import { NotificationNotFound } from "./errors/notification-not-found";
import { GetRecipientNotifications } from "./get-recipient-notifications";



describe('Get recipients notification', () => {
    it('should be able to get recipient notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const getRecipientNotifications = new GetRecipientNotifications(notificationsRepository);

        await notificationsRepository.create(makeNotification({recipientId: 'recipient-1'}))

        await notificationsRepository.create(makeNotification({recipientId: 'recipient-1'}))

        await notificationsRepository.create(makeNotification());

        const {notifications} = await getRecipientNotifications.execute({
            recipientId: 'recipient-1',
        })
        // console.log(notifications)
        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({recipientId: 'recipient-1'}),
            expect.objectContaining({recipientId: 'recipient-1'}),
        ]))
    })


})