import { Content } from "../../src/application/entitites/content";
import { Notification, NotificationProps } from "../../src/application/entitites/notification";

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
    return new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade!'),
        recipientId: 'recipient-2',
        ...override
    })
}