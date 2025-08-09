import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { RequestWithUser } from './auth.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Client ID not found');
    }
    try {
      request['user'] = {
        clientId: token,
      };
    } catch {
      throw new UnauthorizedException('Client ID not found');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, clientId] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? clientId : undefined;
  }
}
