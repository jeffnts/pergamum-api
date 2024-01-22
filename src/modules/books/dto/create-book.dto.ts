import { IsNotEmpty } from 'class-validator';
import { REQUIRED_FIELD } from 'constants/validation';

export class CreateBookDto {
  @IsNotEmpty({
    message: JSON.stringify({
      type: REQUIRED_FIELD,
      field: 'title',
    }),
  })
  title: string;

  @IsNotEmpty({
    message: JSON.stringify({
      type: REQUIRED_FIELD,
      field: 'description',
    }),
  })
  description: string;

  @IsNotEmpty({
    message: JSON.stringify({
      type: REQUIRED_FIELD,
      field: 'author',
    }),
  })
  author: string;

  resume: string;

  amount: number;

  date: Date;

  image: File;
}
