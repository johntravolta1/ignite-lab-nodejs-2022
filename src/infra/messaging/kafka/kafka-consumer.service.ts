import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {
    
    constructor() {
        super({
            client: {
                clientId: 'notifications',
                brokers: ['pretty-macaque-11318-us1-kafka.upstash.io:9092'],
                sasl: {
                  mechanism: 'scram-sha-256',
                  username: 'cHJldHR5LW1hY2FxdWUtMTEzMTgkhumSrGs195fNsM4nuf4Ildb1nFeQ6sZxyMs',
                  password: 'juWmRSB3SowEIggfxgS6zJbwpT-xMxpTPVRDlV9Tjet5XaFNgJK90Os9q4vTu8bw-zdogA==',
                },
                ssl: true,
            }
        })
    }
    
    async onModuleDestroy() {
        await this.close();
    }

}