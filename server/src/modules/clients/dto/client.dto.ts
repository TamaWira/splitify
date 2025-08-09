import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  deviceType: string;

  @ApiProperty()
  deviceName: string;

  @ApiProperty()
  osName: string;

  @ApiProperty()
  osVersion: string;

  @ApiProperty()
  browserName: string;

  @ApiProperty()
  browserVersion: string;

  @ApiProperty()
  userAgent: string;

  @ApiProperty()
  screenResolution: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  timezone: string;

  @ApiProperty()
  ipAddress: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
