import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { SendNotification } from "src/application/use-cases/send-notification";

interface NotificationPayload {
    content: string;
    category: string;
    recipientId: string;
}

@Controller()
export class NotificationsController {
    constructor(private sendNotification: SendNotification) {}
    @EventPattern('notifications.send-notification')
    async handleSendNotifications(@Payload() {content, category, recipientId}: NotificationPayload) {
        console.log(content)

        await this.sendNotification.execute({
            content, category, recipientId
        })
    }

}