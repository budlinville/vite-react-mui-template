import { ReactElement, RefObject, useRef, MouseEvent as rMouseEvent } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    Box,
    Container,
    Slide,
    useScrollTrigger,
    IconButton,
    Fab,
    Fade
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



//----------------------------------------------------------------------------------------------------------------------

const APP_NAME = 'My App';
const APP_NAME_VARIANT = 'h6';
const PAGE_MARGIN_VERTICAL = 2;

//----------------------------------------------------------------------------------------------------------------------


interface HideOnScrollProps {
    enableHideOnScroll: boolean;
    window?: () => Window;
    children: ReactElement;
}

const HideOnScroll = ({ enableHideOnScroll, children, window }: HideOnScrollProps) => {
    if (!enableHideOnScroll)
        return children;

    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            { children }
        </Slide>
    );
}


//----------------------------------------------------------------------------------------------------------------------
interface ScrollTopProps {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    enableScrollTop?: boolean;
    window?: () => Window;
    children: ReactElement;
    headerRef: RefObject<HTMLDivElement>;
  }

function ScrollTop({
    enableScrollTop,
    children,
    window,
    headerRef
}: ScrollTopProps) {
    if (!enableScrollTop)
        return children;

    const anchor = headerRef?.current;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = () => anchor?.scrollIntoView({ block: 'center' });

    return (
        <Fade in={ trigger }>
            <Box
                onClick={ handleClick }
                role='presentation'
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                { children }
            </Box>
        </Fade>
    );
}


//----------------------------------------------------------------------------------------------------------------------


interface Props {
    enableHideOnScroll?: boolean;
    enableScrollTop?: boolean;
    window?: () => Window;
    children: ReactElement;
}

export const Header = ({
    enableHideOnScroll=true,
    enableScrollTop=true,
    children,
    window
}: Props) => {
    const headerAnchorRef = useRef<HTMLDivElement>(null);
    const onMenuClick = () => console.log('TODO: Implement me!');

    return (
        <>
            <CssBaseline />

            <HideOnScroll window={window} enableHideOnScroll={enableHideOnScroll}>
                <AppBar>
                    <Toolbar>
                        <IconButton aria-label="menu"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                            onClick={ onMenuClick }
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant={APP_NAME_VARIANT}> { APP_NAME } </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            {/* This guantees the page always treats a Header as present */}
            <Toolbar ref={headerAnchorRef} />

            <Container>
                <Box sx={{ my: PAGE_MARGIN_VERTICAL }}>
                    { children }
                </Box>
            </Container>

            <ScrollTop window={window} headerRef={headerAnchorRef} enableScrollTop={enableScrollTop}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>

        </>
    );
};

export default Header;