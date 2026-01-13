import { AuthButtonsContainer, SignUpButton, LoginButton } from "./AuthButtons.style"

const AuthButtons = () => {
    const handleSignUp = () => {
        // TODO: 회원가입 로직 구현
        console.log("회원가입 클릭");
    };

    const handleLogin = () => {
        // TODO: 로그인 로직 구현
        console.log("로그인 클릭");
    };

    return (
        <AuthButtonsContainer>
            <SignUpButton onClick={handleSignUp}>가입</SignUpButton>
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
        </AuthButtonsContainer>
    )
}

export default AuthButtons
