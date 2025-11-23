import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { SignatureDto } from './signature.dto';

@Injectable()
export class DigitalSignatureService {

  generateHmac(body: SignatureDto) {
    const { fullName, creation, expiration } = body;
    const data =  `fullName=${fullName}
                    creation=${creation}
                    expiration=${expiration}`;
    const hmac = crypto
      .createHmac('sha256', `${process.env.SECRET}`)
      .update(data)
      .digest('hex');
    return {hmac: hmac};
  }

   generateKeyPair() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048, // Key size
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'top secret',
      },});
    return { publicKey: publicKey, privateKey: privateKey };
  }

  createSignature(body: SignatureDto) {
     const { fullName, creation, expiration } = body;
     const data =  `fullName=${fullName}
                    creation=${creation}
                    expiration=${expiration}`;
     const {privateKey, publicKey} = this.generateKeyPair()
     const signature = crypto.sign("sha256", Buffer.from(data),
       {
         key: privateKey, // The PEM string or key object
         passphrase: 'top secret' // <--- CRITICAL: Must be correct if the key is encrypted
       });
     const signatureHex = signature.toString("hex");
     return {publicKey: publicKey, signature: signatureHex};
  }

  verifySignature(body: SignatureDto) {
    const { fullName, creation, expiration, publicKey, signature } = body;
     const data =  `fullName=${fullName}
                    creation=${creation}
                    expiration=${expiration}`;
     const isValid = crypto.verify(
      "sha256",
      Buffer.from(data),
      publicKey,
      Buffer.from(signature, "hex")
    );
     return {isValid: isValid, signature: signature};
  }


}
