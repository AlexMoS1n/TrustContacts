import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  get secret(): string {
    return this.configService.getOrThrow<string>('JWT_SECRET');
  }

  get expiresIn() {
    return this.configService.get<string>('JWT_EXPIRES_IN', '1h');
  }
}
