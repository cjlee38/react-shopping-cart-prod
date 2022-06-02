import styled, { css } from 'styled-components';

import PATH from 'constants/path';
import { ReactComponent as ZzangguLogo } from 'assets/Zzanggu.svg';
import { axios } from 'configs/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignupPage() {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordLengthCorrect, setPasswordLengthCorrect] = useState(false);
  const [passwordAllCharactersCorrect, setPasswordAllCharactersCorrect] =
    useState(false);
  const [passwordCheckCorrect, setPasswordCheckCorrect] = useState(false);

  const isValidPasswordLength = (password: string) => {
    return password.length >= 8 && password.length <= 16;
  };

  const isValidPasswordAllCharacters = (password: string) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]/.test(
      password,
    );
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      7,
    )}-${phoneNumber.slice(7, 11)}`;
  };

  const handleIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    setPasswordLengthCorrect(isValidPasswordLength(e.target.value));
    setPasswordAllCharactersCorrect(
      isValidPasswordAllCharacters(e.target.value),
    );
  };

  const handlePasswordCheckInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);

    setPasswordCheckCorrect(password === e.target.value);
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handlerPhoneNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 11) {
      setPhoneNumber(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const formElements = e.target.elements;
    const user = {
      username: (formElements.namedItem('id') as HTMLInputElement).value,
      password: (formElements.namedItem('password') as HTMLInputElement).value,
      email: (formElements.namedItem('email') as HTMLInputElement).value,
      address: (formElements.namedItem('address') as HTMLInputElement).value,
      phoneNumber: formatPhoneNumber(
        (formElements.namedItem('phoneNumber') as HTMLInputElement).value,
      ),
    };

    axios
      .post(PATH.REQUEST_CUSTOMER, user)
      .then(() => {
        navigate(PATH.LOGIN);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <StyledPage>
      <StyledSignupContainer>
        <header>
          <StyledTitle>회원가입</StyledTitle>
          <ZzangguLogo width={200} height={180} />
        </header>
        <StyledForm onSubmit={handleSubmit}>
          <label htmlFor="id">아이디</label>
          <input
            id="id"
            type="text"
            placeholder="아이디를 입력해주세요"
            value={id}
            onChange={handleIdInput}
            pattern={'^[a-z0-9_-]{5,20}$'}
            required
          />
          <label htmlFor="password">
            비밀번호
            <StyledErrorSign
              isCorrect={passwordLengthCorrect && passwordAllCharactersCorrect}
            >
              ✓
            </StyledErrorSign>
            <StyledErrorMessage isCorrect={passwordLengthCorrect}>
              ∙ 8~16자 입력
            </StyledErrorMessage>
            <StyledErrorMessage isCorrect={passwordAllCharactersCorrect}>
              ∙ 영문, 숫자, 특수문자 모두 입력
            </StyledErrorMessage>
          </label>
          <input
            id="password"
            type="password"
            placeholder="8~16자의 비밀번호(영문 소문자, 숫자, 특수문자)를 입력해주세요"
            value={password}
            onChange={handlePasswordInput}
            pattern={
              '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()])[A-Za-z\\d!@#$%^&*()]{8,16}$'
            }
            required
          />
          <label htmlFor="passwordCheck">
            비밀번호 재확인
            <StyledErrorSign isCorrect={passwordCheckCorrect}>
              ✓
            </StyledErrorSign>
          </label>
          <input
            id="passwordCheck"
            type="password"
            placeholder="비밀번호를 재입력해주세요"
            value={passwordCheck}
            onChange={handlePasswordCheckInput}
            pattern={
              '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()])[A-Za-z\\d!@#$%^&*()]{8,16}$'
            }
            required
          />
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={handleEmailInput}
            pattern={'^[a-z0-9._-]+@[a-z]+[.]+[a-z]{2,3}$'}
            required
          />
          <label htmlFor="address">주소</label>
          <input
            id="address"
            type="address"
            placeholder="주소를 입력해주세요"
            value={address}
            onChange={handleAddressInput}
            maxLength={255}
            required
          />
          <label htmlFor="phoneNumber">핸드폰 번호</label>
          <input
            id="phoneNumber"
            type="number"
            placeholder="핸드폰 번호를 입력해주세요"
            value={phoneNumber}
            onChange={handlerPhoneNumberInput}
            required
          />
          <StyledSignupButton type="submit">회원가입</StyledSignupButton>
        </StyledForm>
      </StyledSignupContainer>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  width: 480px;
  margin: 60px 0;
  background: ${({ theme: { colors } }) => colors.white};
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
  padding: 50px;
`;

const StyledTitle = styled.h1`
  text-align: center;

  color: ${({ theme: { colors } }) => colors.redPink};

  font-weight: 900;
  font-size: 24px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  > label {
    margin-top: 4px;
    font-size: 14px;
  }

  > input {
    border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
    border-radius: 2px;
    padding: 6px 8px;
  }
`;

const StyledErrorSign = styled.span`
  margin: 0 24px 0 12px;
  font-size: 16px;

  ${({ isCorrect }: { isCorrect: boolean }) => css`
    color: ${({ theme: { colors } }) =>
      isCorrect ? colors.green : colors.black};
  `}
`;

const StyledErrorMessage = styled.span`
  margin-left: 30px;
  font-size: 11px;

  ${({ isCorrect }: { isCorrect: boolean }) => css`
    color: ${({ theme: { colors } }) =>
      isCorrect ? colors.green : colors.black};
    font-weight: ${isCorrect ? 800 : 500};
  `}
`;

const StyledSignupButton = styled.button`
  background: ${({ theme: { colors } }) => colors.redPink};
  color: ${({ theme: { colors } }) => colors.white};
  border-radius: 5px;

  height: 40px;
  margin-top: 20px;

  font-size: 17px;
  font-weight: 900;
`;

export default SignupPage;
