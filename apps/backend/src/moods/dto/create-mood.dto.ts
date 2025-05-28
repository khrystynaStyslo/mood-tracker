import {
    ArrayNotEmpty,
    ArrayUnique,
    IsArray,
    IsInt, IsNumber,
    IsOptional,
    IsString,
    Max,
    Min
} from "class-validator";
import {Type} from "class-transformer";

export class CreateMoodDto {
    @IsString()
    mood: string;

    @IsString()
    note: string;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsString({ each: true })
    tags?: string[];


    @IsInt()
    @Min(1)
    @Max(10)
    level: number;

    @IsString()
    type: string;

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @Type(() => Number)
    @IsNumber({}, { each: true })
    tagIds?: number[];
}