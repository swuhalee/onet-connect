import { useLocation } from "react-router";
import { AppbarWrapper, AppbarContainer, LeftSection, AppbarLogo, LogoImage, LogoText, NavigationLinks, NavLink } from "./Appbar.style"
import AuthButtons from "../AuthButtons/AuthButtons";

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