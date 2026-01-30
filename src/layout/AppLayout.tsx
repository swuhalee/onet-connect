import { Suspense, useEffect } from "react";
import { Outlet, useParams, useLocation } from "react-router"
import { Box, Container, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import AppBar from "./components/Appbar"
import { trackPageView } from "../utils/analytics";

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
    const location = useLocation();

    useEffect(() => {
        // URL의 lng가 i18n 설정과 다르면 동기화
        if (lng && i18n.language !== lng) {
            i18n.changeLanguage(lng);
        }
    }, [lng, i18n]);

    useEffect(() => {
        // 페이지뷰 추적
        trackPageView(location.pathname + location.search);
    }, [location]);

    return (
        <>
            <AppBar />
            <OutletWrapper>
                <OutletContainer>
                    <Suspense fallback={null}>
                        <Outlet />
                    </Suspense>
                </OutletContainer>
            </OutletWrapper>
        </>
    );
};

export default AppLayout;
