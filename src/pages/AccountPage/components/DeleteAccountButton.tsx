import { Box, Button } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";

interface DeleteAccountButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const DeleteAccountButton = ({ onClick, disabled }: DeleteAccountButtonProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Button
      variant="text"
      color="inherit"
      onClick={onClick}
      disabled={disabled}
      startIcon={
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: "4px",
            backgroundColor: "action.disabledBackground",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CloseIcon
            sx={{
              fontSize: 14,
              color: "common.white",
            }}
          />
        </Box>
      }
      sx={{
        color: alpha(theme.palette.text.primary, 0.5),
        fontSize: "14px",
        textTransform: "none",
        padding: "4px 0",
        minWidth: "auto",
        "&:hover": {
          color: alpha(theme.palette.text.primary, 0.7),
          backgroundColor: "transparent",
          "& .MuiBox-root": {
            backgroundColor: "action.disabled",
          },
        },
      }}
    >
      {t('account.deleteAccount')}
    </Button>
  );
};

export default DeleteAccountButton;
