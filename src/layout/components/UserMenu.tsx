import { Link } from "react-router";
import { CircularProgress, ListItemIcon, Menu, MenuItem, styled, useMediaQuery, useTheme } from "@mui/material";
import { StyledButton } from "../../common/styles/StyledButton";
import LogoutIcon from '@mui/icons-material/Logout';
import BuildIcon from '@mui/icons-material/Build';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from "react";
import { useLogout } from "../../hooks/useLogout";

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        marginTop: theme.spacing(1.5),
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            marginLeft: theme.spacing(-0.5),
            marginRight: theme.spacing(1),
        },
        '& .MuiMenuItem-root': {
            minHeight: 'auto',
            '&:hover': {
                backgroundColor: theme.palette.background.default,
            },
        },
        '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            backgroundColor: theme.palette.background.paper,
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
}));

interface UserMenuProps {
    displayName: string;
}

const UserMenu = ({ displayName }: UserMenuProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { mutate: logout, isPending: isLogoutPending } = useLogout();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <StyledButton onClick={handleClick}>
                <AccountCircleIcon fontSize={isMobile ? "medium" : "small"} />
                {!isMobile && displayName}
            </StyledButton>

            <StyledMenu
                anchorEl={anchorEl}
                id="account-menu"
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
                <MenuItem component={Link} to="/account" sx={{ fontSize: "14px" }}>
                    <ListItemIcon>
                        <BuildIcon fontSize="small" />
                    </ListItemIcon>
                    계정
                </MenuItem>
                <MenuItem sx={{ fontSize: "14px" }} onClick={() => logout()}>
                    {
                        isLogoutPending
                            ? <CircularProgress size={14} />
                            : (
                                <>
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    로그아웃
                                </>
                            )
                    }
                </MenuItem>
            </StyledMenu>
        </>
    );
};

export default UserMenu;
