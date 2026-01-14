import { useLocation, Link } from "react-router";
import { Box, Container, styled, Typography } from "@mui/material";
import AuthButtons from "./AuthButtons";

const AppbarWrapper = styled(Box)(({ theme }) => ({
    height: "80px",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const AppbarContainer = styled(Container)(({ theme }) => ({
    height: "100%",
    maxWidth: theme.breakpoints.values.lg,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
}));

const LeftSection = styled(Box)({
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: "48px",
});

const AppbarLogo = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "12px",
});

const LogoImage = styled("img")({
    width: "65px",
    height: "50px",
    objectFit: "contain",
});

const LogoText = styled(Typography)(({ theme }) => ({
    fontSize: "24px",
    fontWeight: 500,
    color: theme.palette.text.primary,
}));

const NavigationLinks = styled(Box)({
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: "32px",
});

const NavLink = styled(Link, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
    height: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
    fontSize: "16px",
    fontWeight: active ? 600 : 400,
    position: "relative",
    padding: "0 8px",
    ...(active && {
        "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            backgroundColor: theme.palette.primary.main,
        },
    }),
    "&:hover": {
        color: theme.palette.primary.main,
    },
}));

const AppBar = () => {
    const location = useLocation();
    const isGameActive = location.pathname === "/";
    const isRankingActive = location.pathname === "/ranking";

    return (
        <AppbarWrapper>
            <AppbarContainer>
                <LeftSection>
                    <AppbarLogo>
                        <LogoImage src="/logo.svg" alt="Onet Connect Logo" />
                        <LogoText>Onet Connect</LogoText>
                    </AppbarLogo>
                    
                    <NavigationLinks>
                        <NavLink to="/" active={isGameActive}>
                            게임
                        </NavLink>
                        <NavLink to="/ranking" active={isRankingActive}>
                            랭킹
                        </NavLink>
                    </NavigationLinks>
                </LeftSection>

                <AuthButtons />
            </AppbarContainer>
        </AppbarWrapper>
    )
}

export default AppBar
