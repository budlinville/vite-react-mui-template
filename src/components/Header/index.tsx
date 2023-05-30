import { ReactElement } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    Box,
    Container,
    Slide,
    useScrollTrigger
} from '@mui/material';


//----------------------------------------------------------------------------------------------------------------------

const APP_NAME = 'My App';
const APP_NAME_VARIANT = 'h6';
const MARGIN_VERTICAL = 2;

//----------------------------------------------------------------------------------------------------------------------


interface HideOnScrollProps {
    hideOnScroll: boolean;
    window?: () => Window;
    children: ReactElement;
}

const HideOnScroll = ({ hideOnScroll, children, window }: HideOnScrollProps) => {
    if (!hideOnScroll)
        return children;

    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            { children }
        </Slide>
    );
}


//----------------------------------------------------------------------------------------------------------------------


interface Props {
    hideOnScroll?: boolean;
    window?: () => Window;
    children: ReactElement;
  }

export const Header = ({
    hideOnScroll=true,
    children,
    window
}: Props) => {
    return (
        <>
            <CssBaseline />

            <HideOnScroll window={window} hideOnScroll={hideOnScroll}>
                <AppBar>
                    <Toolbar>
                        <Typography variant={APP_NAME_VARIANT}> { APP_NAME } </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            {/* This guantees the page always treats a Header as present */}
            <Toolbar />

            <Container>
                <Box sx={{ my: MARGIN_VERTICAL }}>
                    { children }
                </Box>
            </Container>

        </>
    );
};

export default Header;