import { IsString, IsNotEmpty, Matches, IsEmail } from 'class-validator';
import {
  NAME_REGEX,
  NAME_REGEX_MESSAGE,
  EMAIL_REGEX,
  EMAIL_REGEX_MESSAGE,
} from '../../constants/regularExpressions';

export class CandidateDto {
  @IsString()
  @IsNotEmpty()
  @Matches(NAME_REGEX, { message: `Last name ${NAME_REGEX_MESSAGE}` })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(NAME_REGEX, { message: `Last name ${NAME_REGEX_MESSAGE}` })
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Matches(EMAIL_REGEX, { message: `Email ${EMAIL_REGEX_MESSAGE}` })
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
