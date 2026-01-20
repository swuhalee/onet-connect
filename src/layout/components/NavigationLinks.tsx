import { Link, useLocation } from "react-router";
import { Box, styled } from "@mui/material";

const NavigationLinksContainer = styled(Box)(({ theme }) => ({
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: "32px",
    [theme.breakpoints.down('sm')]: {
        display: "none",
    },
}));

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

const NavigationLinks = () => {
    const location = useLocation();
    const isGameActive = location.pathname === "/";
    const isRankingActive = location.pathname === "/ranking";

    return (
        <NavigationLinksContainer>
            <NavLink to="/" active={isGameActive}>
                게임
            </NavLink>
            <NavLink to="/ranking" active={isRankingActive}>
                랭킹
            </NavLink>
        </NavigationLinksContainer>
    );
};

export default NavigationLinks;
