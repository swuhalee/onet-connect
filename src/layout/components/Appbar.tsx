import { Box, Container, styled } from "@mui/material";
import LoginButton from "./LoginButton";
import Logo from "./Logo";
import NavigationLinks from "./NavigationLinks";
import UserMenu from "./UserMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";

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

const RightSection = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "12px",
});

const AppBar = () => {
    const { data: userProfile, isLoading } = useGetUserProfile();

    return (
        <AppbarWrapper>
            <AppbarContainer>
                <LeftSection>
                    <Logo />
                    <NavigationLinks />
                </LeftSection>

                <RightSection>
                    <LanguageSwitcher />
                    {
                        isLoading
                            ? null // 로딩 중일 때는 아무것도 표시하지 않음
                            : userProfile
                                ? <UserMenu displayName={userProfile.displayName} />
                                : <LoginButton />
                    }
                </RightSection>
            </AppbarContainer>
        </AppbarWrapper>
    )
}

export default AppBar
