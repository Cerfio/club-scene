import { IsString } from "class-validator";

export class MediaDeleteParamDtoInput {
	@IsString()
	id: string;
}