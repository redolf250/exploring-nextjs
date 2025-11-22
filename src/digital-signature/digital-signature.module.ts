import { Module } from '@nestjs/common';
import { DigitalSignatureService } from './digital-signature.service';
import { DigitalSignatureController } from './digital-signature.controller';

@Module({
  providers: [DigitalSignatureService],
  controllers: [DigitalSignatureController]
})
export class DigitalSignatureModule {}
