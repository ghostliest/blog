import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ISingupDto } from './dto/signup.dto';
import { IUserService } from 'src/user/types/service.types';
import { ISigninDto } from './dto/signin.dto';
import { ServiceException } from 'src/exceptions/service.exception';

export interface IAuthService {
  signup(dto: ISingupDto): Promise<{ token: string }>;
  signin(dto: ISigninDto): Promise<{ token: string }>;
  refresh(payload: { id: number; email: string; role: string }): Promise<{ token: string }>;
}

export class AuthService implements IAuthService {
  constructor(
    private readonly _userService: IUserService,
    private readonly _jwtService: JwtService,
  ) {}

  private generateToken(payload: { id: number; email: string; role: string }): string {
    return this._jwtService.sign(payload);
  }

  async signup(dto: ISingupDto): Promise<{ token: string }> {
    const checkedUser = await this._userService.getByEmail(dto.email);
    if (!checkedUser?.id) {
      const hashPassword = await bcrypt.hash(dto.password, 5);
      const user = await this._userService.create({
        ...dto,
        password: hashPassword,
      });
      const token = this.generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      return { token };
    } else {
      throw new ServiceException('User exists');
    }
  }

  async signin(dto: ISigninDto): Promise<{ token: string }> {
    const user = await this._userService.getByEmail(dto.email);
    if (user?.email) {
      const passwordIsEquel = await bcrypt.compare(dto.password, user.password);
      if (passwordIsEquel) {
        const token = this.generateToken({ id: user.id, email: user.email, role: user.role });
        return { token };
      } else {
        throw new ServiceException('Invalid password');
      }
    } else {
      throw new ServiceException('User not found');
    }
  }

  async refresh(payload: { id: number; email: string; role: string }): Promise<{ token: string }> {
    const token = this.generateToken({ id: payload.id, email: payload.email, role: payload.role });
    return { token };
  }
}
