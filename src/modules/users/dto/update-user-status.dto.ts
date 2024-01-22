import { IsNotEmpty } from 'class-validator';
import { REQUIRED_FIELD } from 'constants/validation';
import { UUID } from 'crypto';

export class UpdateUserStatusDto {
  @IsNotEmpty({
    message: JSON.stringify({
      type: REQUIRED_FIELD,
      field: 'userId',
    }),
  })
  userId: UUID;

  @IsNotEmpty({
    message: JSON.stringify({
      type: REQUIRED_FIELD,
      field: 'statusId',
    }),
  })
  statusId: UUID;
}
