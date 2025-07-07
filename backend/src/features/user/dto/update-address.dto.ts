import { PartialType } from '@nestjs/mapped-types';
import { AddAddressDto } from './add-address.dto';

export class UpdateAddressDto extends PartialType(AddAddressDto) {}
