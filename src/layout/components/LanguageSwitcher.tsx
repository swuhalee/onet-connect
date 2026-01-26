import { ListItemIcon, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import React from "react";
import StyledButton from "../styles/StyledButton";
import LanguageIcon from '@mui/icons-material/Language';
import StyledMenu from "../styles/StyledMenu";
import { languages, getCurrentLanguage } from "../../utils/languageDetection";
import type { LanguageInfo } from "../../models/language";

const LanguageSwitcher = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { lng } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const currentLng = getCurrentLanguage(lng, i18n.language);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (newLng: string) => {
        handleClose();
        if (newLng === currentLng) return;

        const pathSegments = location.pathname.split('/').filter(Boolean);
        if (pathSegments.length > 0 && pathSegments[0] === currentLng) {
            pathSegments[0] = newLng;
            navigate(`/${pathSegments.join('/')}`);
        } else {
            navigate(`/${newLng}${location.pathname}`);
        }
        i18n.changeLanguage(newLng);
    };

    return (
        <>
            <StyledButton onClick={handleClick}>
                {isMobile ? (
                    <LanguageIcon fontSize="medium" />
                ) : (
                    (() => {
                        const current = languages.find((l: LanguageInfo) => l.code === currentLng);
                        if (!current) {
                            const defaultLang = languages.find((l: LanguageInfo) => l.code === 'en') || languages[0];
                            return `${defaultLang.flag} ${defaultLang.label}`;
                        }
                        return `${current.flag} ${current.label}`;
                    })()
                )}
            </StyledButton>

            <StyledMenu
                anchorEl={anchorEl}
                id="language-menu"
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
                {languages.map((lang: LanguageInfo) => (
                    <MenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)} selected={lang.code === currentLng} sx={{ fontSize: "14px" }}>
                        <ListItemIcon>
                            <span>{lang.flag}</span>
                        </ListItemIcon>
                        {lang.label}
                    </MenuItem>
                ))}
            </StyledMenu>
        </>
    );
};

export default LanguageSwitcher;
