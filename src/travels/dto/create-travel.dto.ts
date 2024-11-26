import { IsInt, IsNotEmpty, IsNumber, IsString, IsUrl, MinLength } from "class-validator";

export class CreateTravelDto {

    @IsString()
    @IsNotEmpty()
    destination: string;

    @IsString()
    @MinLength(30)
    description: string;

    @IsUrl()
    imgUrl: string;

    @IsInt()
    price: number;
}
