import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { PositionStatusEnum } from '../../constants/enums';
import {
  TEXT_REGEX,
  TEXT_REGEX_MESSAGE,
} from '../../constants/regularExpressions';

export class PositionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @Matches(TEXT_REGEX, { message: `TITLE ${TEXT_REGEX_MESSAGE}` })
  title: string;
}

export class EditPositionDto extends PositionDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(PositionStatusEnum)
  status: string;

  @IsString()
  @MinLength(2)
  @Matches(TEXT_REGEX, { message: `TITLE ${TEXT_REGEX_MESSAGE}` })
  @IsOptional()
  title: string;
}
