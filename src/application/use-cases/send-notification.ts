import { Injectable } from "@nestjs/common";
import { Content } from "../entitites/content";
import { Notification } from "../entitites/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";

interface SendNotificationRequest {
    recipientId: string;
    content: string;
    category: string;
}

interface SendNotificationResponse {
    notification: Notification;
}

@Injectable()
export class SendNotification {
    constructor(
        private notificationsRepository: NotificationsRepository
    ) {}
    async execute(request: SendNotificationRequest) : Promise<SendNotificationResponse> {
        const { recipientId, content, category} = request

        const notification = new Notification({
            recipientId, 
            content: new Content(content),
             category
        })
        
        //persisitir essa notificação no banco
        await this.notificationsRepository.create(notification);
        return {notification}
    }

}