import { Link } from "react-router";
import { Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";

const LogoLink = styled(Link)({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
});

const LogoImage = styled("img")(({ theme }) => ({
    width: "65px",
    height: "50px",
    objectFit: "contain",
    [theme.breakpoints.down('sm')]: {
        width: "40px",
        height: "30px",
    },
}));

const LogoText = styled(Typography)(({ theme }) => ({
    fontSize: "24px",
    fontWeight: 500,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
        display: "none",
    },
}));

const Logo = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isMobile) {
            e.preventDefault();
            setDrawerOpen(true);
        }
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <LogoLink to="/" onClick={handleClick}>
                <LogoImage src="/logo.svg" alt="Onet Connect Logo" />
                <LogoText>Onet Connect</LogoText>
            </LogoLink>
            <MobileDrawer open={drawerOpen} onClose={handleDrawerClose} />
        </>
    );
};

export default Logo;
