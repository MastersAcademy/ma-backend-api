import {ExecutionContext, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {JwtService} from '@nestjs/jwt';
import config from "@config/config";
import {ConfigType} from "@nestjs/config";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService, @Inject(config.KEY) private configService: ConfigType<typeof config>,) {
    super();}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      request['user'] = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.accessSecretKey
        }
      );
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // @ts-ignore
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
