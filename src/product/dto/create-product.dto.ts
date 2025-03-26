import { ApiProperty } from "@nestjs/swagger";
import { Type } from "@prisma/client";
import { IsDefined, IsIn, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsDefined({
    message: "name field must be filled!"
  })
  @IsString()
  @ApiProperty({
    description: 'Name of the product',
    example: 'Example Product'
  })
  name: string;

  @IsDefined({
    message: "manufacturer field must be filled!"
  })
  @IsString()
  @ApiProperty({
    description: 'Manufacturer of the product',
    example: 'Example Product'
  })
  manufacturer: string;
  @IsDefined({
    message: "type field must be filled!"
  })
  @IsIn(Object.values(Type))
  @ApiProperty({
    description: 'Type of the product',
    example: 'PROCESSOR'
  })
  type: Type;
  @IsDefined({
    message: "price field must be filled!"
  })
  @IsNumber()
  @ApiProperty({
    description: 'Price of the product',
    example: 100
  })
  price: number;
  couantity: number;
  imgSrc: string


  Processor?: Processor
  Memory?: Memory
  HardDrive?: HardDrive
  VideoCard?: VideoCard
  Motherboard?: Motherboard
  CPUCooler?: CPUCooler
  PowerSupply?: PowerSupply
  Powerhouse?: Powerhouse
}



class Processor {
  id: number;
  coreNumber: number;
  baseFrequency: number;
  turboBoostFrequency: number;
  cache: number;
  architecture: string;
  processorSeller: string;
  processorModel: string;
  integratedGraphicModel: string;
  processorTechnology: string;
  productId: number;
}

class Memory {
  id: number;
  memoryCapacity: number;
  memoryType: string;
  installedMemory: number;
  frequency: number;
  supportedMemoryCapacity: number;
  productId: number;
}

class HardDrive {
  id: number;
  capacity: number;
  storageType: string;
  connectionInterface: string;
  readingSpeed: number;
  writingSpeed: number;
  nandFlashType: string;
  pciGeneration: number;
  productId: number;
}

class VideoCard {
  id: number;
  videoChipset: string;
  producer: string;
  cpuSocket: string;
  coolingType: string;
  graphicChipSpeed: number;
  graphicMemorySpeed: number;
  memoryCapacity: number;
  bandwidth: number;
  suggestedPower: number;
  displayPort: number;
  size: string;
  productId: number;
}

class Motherboard {
  id: number;
  cpuSocket: string;
  chipset: string;
  memoryType: string;
  processorSeller: string;
  graphicCard: string;
  hdmi: boolean;
  sataConnectors: number;
  pciConnectors: number;
  usbPorts: number;
  memorySockets: number;
  integratedSound: boolean;
  bluetooth: boolean;
  wireless: boolean;
  sizeStandard: string;
  productId: number;
}

class CPUCooler {
  id: number;
  fanSpeed: number;
  type: string;
  airflow: number;
  frequency: number;
  productId: number;
}

class PowerSupply {
  id: number;
  performance: number;
  fourPinConnector: boolean;
  sixPinVGA: boolean;
  size: string;
  productId: number;
}

class Powerhouse {
  id: number;
  motherboardType: string;
  fans: number;
  size: string;
  productId: number;
}

class Size {
  id: number;
  width: number;
  length: number;
  height: number;
}

