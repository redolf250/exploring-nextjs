import { Body, Controller, Get, Post } from '@nestjs/common';
import { DigitalSignatureService } from './digital-signature.service';
import { SignatureDto } from './signature.dto';

@Controller('digital-signature')
export class DigitalSignatureController {
  constructor(
    private readonly digitalSignatureService: DigitalSignatureService,
  ) {}

  @Get()
  generateKeyPair() {
    return this.digitalSignatureService.generateKeyPair();
  }

  @Post()
  createSignature(@Body() data: SignatureDto) {
    return this.digitalSignatureService.createSignature(data);
  }

  @Post('/verify')
  verifySignature(@Body() data: SignatureDto) {
    return this.digitalSignatureService.verifySignature(data);
  }
}
