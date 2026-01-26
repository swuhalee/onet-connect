import { Button } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

interface PrivacyPolicyButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const PrivacyPolicyButton = ({ onClick, disabled }: PrivacyPolicyButtonProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Button
      variant="text"
      color="inherit"
      onClick={onClick}
      disabled={disabled}
      sx={{
        color: alpha(theme.palette.text.primary, 0.5),
        fontSize: "14px",
        textTransform: "none",
        "&:hover": {
          color: alpha(theme.palette.text.primary, 0.7),
          backgroundColor: "transparent",
        },
      }}
    >
      {t('account.privacyPolicy')}
    </Button>
  );
};

export default PrivacyPolicyButton;
