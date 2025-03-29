import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { LoginDto, LoginResponseDto } from '@/auth/dto/login.dto';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid && user.isActive) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: LoginDto): Promise<LoginResponseDto> {
    const validatedUser = await this.validateUser(user.email, user.password);

    if (!validatedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const access_token = this.jwtService.sign({
      email: user.email,
    });

    return { access_token };
  }

  async signup(createUserDto: CreateUserDto) {
    const saltOrRounds = process.env.SALT_OR_ROUNDS || 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
    };
  }
}
