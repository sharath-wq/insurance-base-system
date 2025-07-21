import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AttributeDto } from '../dto/attributes.dto';
import { extractAttributes } from '../utils/extract-functions';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AttributeService {
  constructor(private readonly httpService: HttpService) {}

  async getAttributesFromJarus(dto: AttributeDto): Promise<any> {
    const url = `${process.env.JARUS_CONFIGURATOR_URL}?ObjectName=${dto.objectName}&ObjectType=${dto.objectType}&LOB=${dto.lob}`;

    try {
      const response: any = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${process.env.JARUS_AUTH_TOKEN}`,
          },
        }),
      );

      const extractedAttributes = await extractAttributes(response.data);
      return extractedAttributes;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch attributes from Jarus: ${error.message}`,
        error.response?.status || 500,
      );
    }
  }
}
