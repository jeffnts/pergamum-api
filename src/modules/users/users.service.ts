import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FirebaseError } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService, firebaseApp } from 'libs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { name, email, password } = createUserDto;
      const auth = getAuth(firebaseApp);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await this.prisma.user.create({
        data: {
          email,
          name,
          firebaseUserId: user?.uid,
        },
      });

      return 'Usuário criado com sucesso!';
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new BadRequestException(error.code);
      }
      throw new InternalServerErrorException();
    }
  }

  async me(id: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        firebaseUserId: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }
}
