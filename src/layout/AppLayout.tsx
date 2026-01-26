import { useEffect } from "react";
import { Outlet, useParams } from "react-router"
import { Box, Container, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import AppBar from "./components/Appbar"

const OutletWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    backgroundColor: theme.palette.background.default,
}));

const OutletContainer = styled(Container)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.lg,
    padding: "28px",
    [theme.breakpoints.down('sm')]: {
        padding: 0,
    },
}));

const AppLayout = () => {
    const { lng } = useParams();
    const { i18n } = useTranslation();

    useEffect(() => {
        // URL의 lng가 i18n 설정과 다르면 동기화
        if (lng && i18n.language !== lng) {
            i18n.changeLanguage(lng);
        }
    }, [lng, i18n]);

    return (
        <>
            <AppBar />
            <OutletWrapper>
                <OutletContainer>
                    <Outlet />
                </OutletContainer>
            </OutletWrapper>
        </>
    );
};

export default AppLayout;
