import {IsOptional, IsString, IsUrl } from "class-validator";

export class MediaUpdateDtoInput {
	@IsOptional()
	@IsUrl()
	mediaPicture: string;

	@IsOptional()
	@IsString()
	title: string;

	@IsOptional()
	@IsString()
	description: string;
}

export class MediaUpdateParamDtoInput {
    @IsString()
    id: string;
}