import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

const AuthButtonsContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "12px",
});

const SignUpButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    padding: "2px 4px",
    borderRadius: "0px",
    fontSize: "14px",
    fontWeight: 600,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const LoginButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#3a3a5a' : '#e0e0e0',
    color: theme.palette.text.primary,
    padding: "2px 4px",
    borderRadius: "0px",
    fontSize: "14px",
    fontWeight: 600,
    "&:hover": {
        backgroundColor: theme.palette.mode === 'dark' ? '#4a4a6a' : '#d0d0d0',
    },
}));

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
