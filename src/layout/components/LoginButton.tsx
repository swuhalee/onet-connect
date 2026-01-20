import { CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { useLoginWithGoogle } from "../../hooks/useLoginWithGoogle";
import { StyledButton } from "../../common/styles/StyledButton";
import GoogleIcon from '@mui/icons-material/Google';

const LoginButton = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { mutate, isPending } = useLoginWithGoogle();

    return (
        <StyledButton onClick={() => mutate()} disabled={isPending}>
            {
                isPending
                    ? <CircularProgress size={14} />
                    : <>
                        <GoogleIcon fontSize={"small"} />
                        {isMobile ? "로그인" : "Google 로그인"}
                    </>
            }
        </StyledButton>
    )
}

export default LoginButton
