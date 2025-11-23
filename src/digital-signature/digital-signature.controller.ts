import { Body, Controller, Get, Post, Req } from '@nestjs/common';
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

  @Post('/hmac')
  generateHmac(@Body() data: SignatureDto, @Req() req: Request) {
    return this.digitalSignatureService.generateHmac(data);
  }

  // @Post()
  // handleWebhook(@Req() req: Request, @Res() res: Response) {
  //   const signature = req.headers['x-signature'] as string;
  //
  //   if (!signature) {
  //     return res.status(HttpStatus.BAD_REQUEST).send('Missing signature');
  //   }
  //
  //   if (!verifyHmac(req.rawBody, signature, SECRET)) {
  //     return res.status(HttpStatus.UNAUTHORIZED).send('Invalid signature');
  //   }
  //
  //   // If signature is valid, process payload
  //   console.log('Verified payload:', req.body);
  //   return res.status(HttpStatus.OK).send('Webhook verified');
  // }

  // export function verifyHmac(rawBody: Buffer, signature: string, secret: string): boolean {
  //   const computed = crypto.createHmac('sha256', secret)
  //     .update(rawBody)
  //     .digest('hex');
  //
  //   return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computed));
  // }
}
