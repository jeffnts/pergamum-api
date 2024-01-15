import { Injectable } from '@nestjs/common';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { CreateAuthDto } from './dto/create-auth.dto';
import { firebaseApp } from 'libs';

@Injectable()
export class AuthService {
  async create(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    const auth = getAuth(firebaseApp);

    const result = (await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )) as any;

    const token = result?.user?.stsTokenManager?.accessToken;

    return token;
  }
}
