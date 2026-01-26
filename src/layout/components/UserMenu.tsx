import { Link, useParams } from "react-router";
import { CircularProgress, ListItemIcon, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import StyledButton from "../styles/StyledButton";
import LogoutIcon from '@mui/icons-material/Logout';
import BuildIcon from '@mui/icons-material/Build';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from "react";
import { useLogout } from "../../hooks/useLogout";
import StyledMenu from "../styles/StyledMenu";
import { getCurrentLanguage } from "../../utils/languageDetection";

interface UserMenuProps {
    displayName: string;
}

const UserMenu = ({ displayName }: UserMenuProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { mutate: logout, isPending: isLogoutPending } = useLogout();
    const { lng } = useParams();
    const { t, i18n } = useTranslation();
    const currentLng = getCurrentLanguage(lng, i18n.language);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <StyledButton onClick={handleClick}>
                <AccountCircleIcon fontSize={isMobile ? "medium" : "small"} />
                {!isMobile && displayName}
            </StyledButton>

            <StyledMenu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem component={Link} to={`/${currentLng}/account`} sx={{ fontSize: "14px" }}>
                    <ListItemIcon>
                        <BuildIcon fontSize="small" />
                    </ListItemIcon>
                    {t('common.account')}
                </MenuItem>
                <MenuItem sx={{ fontSize: "14px" }} onClick={() => logout()}>
                    {
                        isLogoutPending
                            ? <CircularProgress size={14} />
                            : (
                                <>
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    {t('common.logout')}
                                </>
                            )
                    }
                </MenuItem>
            </StyledMenu>
        </>
    );
};

export default UserMenu;
