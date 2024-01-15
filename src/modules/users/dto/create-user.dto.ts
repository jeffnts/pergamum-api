import { IsNotEmpty } from 'class-validator';
import { REQUIRED_FIELD } from 'constants/validation';

type Role = 'ADMIN' | 'USER';

export class CreateUserDto {
  @IsNotEmpty({
    message: JSON.stringify({
      type: REQUIRED_FIELD,
      field: 'name',
    }),
  })
  name: string;

  @IsNotEmpty({
    message: JSON.stringify({
      type: REQUIRED_FIELD,
      field: 'email',
    }),
  })
  email: string;

  @IsNotEmpty({
    message: JSON.stringify({
      type: REQUIRED_FIELD,
      field: 'password',
    }),
  })
  password: string;

  role: Role;
}
