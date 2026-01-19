
import { CircularProgress } from "@mui/material";
import { useLoginWithGoogle } from "../../hooks/useLoginWithGoogle";
import { StyledButton } from "../../common/styles/StyledButton";
import GoogleIcon from '@mui/icons-material/Google';

const LoginButton = () => {
    const { mutate, isPending } = useLoginWithGoogle();

    return (
        <StyledButton onClick={() => mutate()} disabled={isPending}>
            {
                isPending
                    ? <CircularProgress size={14} />
                    : <>
                        <GoogleIcon fontSize="small" sx={{ marginRight: "8px" }} />
                        Google 로그인
                    </>
            }
        </StyledButton>
    )
}

export default LoginButton
