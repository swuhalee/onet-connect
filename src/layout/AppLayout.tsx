import { Outlet } from "react-router"
import AppBar from "./components/Appbar/Appbar"
import { OutletContainer, OutletWrapper } from "./AppLayout.style"

const AppLayout = () => {
    return (
        <>
            <AppBar />
            <OutletWrapper>
                <OutletContainer>
                    <Outlet />
                </OutletContainer>
            </OutletWrapper>
        </>
    )
}

export default AppLayout