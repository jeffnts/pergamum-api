import { IsNotEmpty } from 'class-validator';
import { REQUIRED_FIELD } from 'constants/validation';

export class CreateAuthDto {
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
}
