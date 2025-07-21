import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { extractCoverages } from '../utils/extract-functions';
import { firstValueFrom } from 'rxjs';
import { CoverageDto } from '../dto/coverage.dto';

@Injectable()
export class CoverageService {
  constructor(private readonly httpService: HttpService) {}

  async getCoveragesFromJarus(dto: CoverageDto): Promise<any> {
    const url = `${process.env.JARUS_CONFIGURATOR_URL}?ObjectName=${dto.objectName}&ObjectType=${dto.objectType}&LOB=${dto.lob}`;

    try {
      const response: any = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${process.env.JARUS_AUTH_TOKEN}`,
          },
        }),
      );

      const extractedCoverages = await extractCoverages(response.data);
      return extractedCoverages;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch attributes from Jarus: ${error.message}`,
        error.response?.status || 500,
      );
    }
  }
}
