import { Content } from "./content"
import { Notification } from "./notification"

describe('Notifications', () => {
    it('should be able to create a notification' , () => {
        const notification = new Notification({
            content: new Content('Teste de notificação'),
            category: 'social',
            recipientId: 'example-recipient-id',
        })

        expect(notification).toBeTruthy()
    })
})