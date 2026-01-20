import { CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLoginWithGoogle } from "../../hooks/useLoginWithGoogle";
import StyledButton from "../styles/StyledButton";
import GoogleIcon from '@mui/icons-material/Google';

const LoginButton = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { mutate, isPending } = useLoginWithGoogle();
    const { t } = useTranslation();

    return (
        <StyledButton onClick={() => mutate()} disabled={isPending}>
            {
                isPending
                    ? <CircularProgress size={24} />
                    : <>
                        <GoogleIcon fontSize={"small"} />
                        {isMobile ? t('common.login') : t('common.googleLogin')}
                    </>
            }
        </StyledButton>
    )
}

export default LoginButton
