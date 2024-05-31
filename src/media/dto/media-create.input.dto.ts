import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Matches } from "class-validator";

export class MediaCreateDtoInput {
    @IsUrl()
    mediaPicture: string;

    @IsString()
    title: string;

    @IsString()
    description: string;
}