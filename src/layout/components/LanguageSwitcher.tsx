import { ListItemIcon, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import React from "react";
import StyledButton from "../styles/StyledButton";
import LanguageIcon from '@mui/icons-material/Language';
import StyledMenu from "../styles/StyledMenu";

const LanguageSwitcher = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { lng } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const currentLng = lng || 'ko';
    const languages = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
        { code: 'ru', label: 'Русский', flag: '🇷🇺' },
        { code: 'es', label: 'Español', flag: '🇪🇸' },
        { code: 'pt', label: 'Portugues', flag: '🇵🇹' },
        { code: 'it', label: 'Italiano', flag: '🇮🇹' },
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
        { code: 'zh-TW', label: '正體中文', flag: '🇹🇼' },
        { code: 'ja', label: '日本語', flag: '🇯🇵' },
        { code: 'ko', label: '한국어', flag: '🇰🇷' },
    ];

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (newLng: string) => {
        handleClose();
        if (newLng === currentLng) return;

        // 현재 경로에서 언어 코드만 변경 (하이픈 포함 언어 코드도 처리)
        const pathSegments = location.pathname.split('/').filter(Boolean);
        if (pathSegments.length > 0 && pathSegments[0] === currentLng) {
            pathSegments[0] = newLng;
            navigate(`/${pathSegments.join('/')}`);
        } else {
            // 경로 구조가 예상과 다를 경우 기본 경로로 이동
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
                        const current = languages.find(l => l.code === currentLng);
                        return current ? `${current.flag} ${current.label}` : currentLng.toUpperCase();
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
                {languages.map((lang) => (
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
