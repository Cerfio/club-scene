import { IsOptional, IsString, IsUrl } from "class-validator";

export class ProfileUpdateDtoInput {
    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    @IsUrl()
    profilePicture: string;

    @IsOptional()
    @IsString()
    username: string;
}