import * as yup from "yup";

const emailNotLongEnough = "3글자 이상 입력되어야 합니다.";
const passwordNotLongEnough = "8글자 이상 입력되어야 합니다.";
const invalidEmail = "이메일 주소의 형식이 충족되지 않았습니다.";
const withAlphabat = "영어문자가 포함되어야 합니다.";
const emailNotRequited = "이메일 주소를 입력해주세요";
const passwordNotRequited = "패스워드를 입력해주세요";

export const ValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required(emailNotRequited)
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail),
  password: yup
    .string()
    .required(passwordNotRequited)
    .min(8, passwordNotLongEnough)
    .max(255)
    .matches(/[a-zA-Z]/, withAlphabat),
});
