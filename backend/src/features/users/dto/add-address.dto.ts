import { IsString, IsOptional, IsPostalCode, IsBoolean } from 'class-validator';

export class AddAddressDto {
    @IsString() street: string = '';
    @IsString() city: string = '';
    @IsString() country: string = '';
    @IsString() state: string = '';
    @IsPostalCode('any') postalCode: string = '';
    @IsOptional() @IsBoolean() isDefault?: boolean = false;
}
