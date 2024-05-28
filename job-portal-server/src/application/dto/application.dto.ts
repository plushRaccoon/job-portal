import { IsNotEmpty, IsString, Matches } from 'class-validator';
import {
  TEXT_REGEX,
  TEXT_REGEX_MESSAGE,
} from '../../constants/regularExpressions';

export class ApplicationDto {
  @IsString()
  @IsNotEmpty()
  @Matches(TEXT_REGEX, { message: `CV ${TEXT_REGEX_MESSAGE}` })
  cv: string;

  @IsString()
  @IsNotEmpty()
  candidateId: string;
}

export class EditApplicationDto {
  @IsString()
  @IsNotEmpty()
  @Matches(TEXT_REGEX, { message: `CV ${TEXT_REGEX_MESSAGE}` })
  cv: string;
}
