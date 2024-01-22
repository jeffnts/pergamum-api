import { Injectable, BadRequestException } from '@nestjs/common';
import { DownloadResponse, Storage } from '@google-cloud/storage';
import * as path from 'path';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'libs';

@Injectable()
export class BooksService {
  private storage: Storage;
  constructor(private readonly prisma: PrismaService) {
    const { GCP_PROJECT_ID, GCP_PRIVATE_KEY, GCP_CLIENT_EMAIL } = process.env;
    this.storage = new Storage({
      projectId: GCP_PROJECT_ID,
      credentials: {
        private_key: GCP_PRIVATE_KEY,
        client_email: GCP_CLIENT_EMAIL,
      },
    });
  }

  private generateFileName(originalname: string): string {
    const fileExtension = path.extname(originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    return `image_${uniqueSuffix}${fileExtension}`;
  }

  private getFilePath(fileName: string): string {
    return `${fileName}`;
  }

  async create(file: Express.Multer.File, createBookDto: CreateBookDto) {
    const { image, amount, ...data } = createBookDto;

    const book = await this.prisma.book.findUnique({
      where: {
        title: data.title,
      },
    });

    if (book) throw new BadRequestException('Livro já cadastrado.');

    const { BOOKS_COVER_BUCKET, BUCKET_URL } = process.env;

    const bucket = this.storage.bucket(BOOKS_COVER_BUCKET);

    const fileName = this.generateFileName(file.originalname);
    const filePath = this.getFilePath(fileName);

    const fileOptions = {
      destination: filePath,
      public: true,
    };

    await bucket.upload(file.path, fileOptions);

    const imageUrl = `${BUCKET_URL}/${BOOKS_COVER_BUCKET}/${filePath}`;

    const bookCreated = await this.prisma.book.create({
      data: { imageUrl, amount: +amount, ...data },
    });

    await this.prisma.bookAvailability.upsert({
      update: {
        amount: bookCreated.amount,
      },
      create: {
        bookId: bookCreated.id,
        amount: +bookCreated.amount,
      },
      where: {
        bookId: bookCreated.id,
      },
    });

    return 'Livro criado com sucesso!';
  }

  async findAll() {
    return this.prisma.book.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        author: true,
        imageUrl: true,
        bookAvailability: {
          select: {
            amount: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.book.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
