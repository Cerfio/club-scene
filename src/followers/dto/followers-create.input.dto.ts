import { IsString } from "class-validator";

export class FollowersCreateDtoInput {
    @IsString()
    profileId: string;
}