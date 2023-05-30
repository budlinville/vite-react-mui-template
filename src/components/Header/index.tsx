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
const SCROLL_TOP_OFFSET = 16;

//----------------------------------------------------------------------------------------------------------------------


interface HideOnScrollProps {
    enableHideOnScroll: boolean;
    children: ReactElement;
}

const HideOnScroll = ({
    enableHideOnScroll,
    children
}: HideOnScrollProps) => {
    if (!enableHideOnScroll)
        return children;

    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            { children }
        </Slide>
    );
}


//----------------------------------------------------------------------------------------------------------------------
interface ScrollTopProps {
    enableScrollTop?: boolean;
    children: ReactElement;
    headerRef: RefObject<HTMLDivElement>;
  }

function ScrollTop({
    enableScrollTop,
    children,
    headerRef
}: ScrollTopProps) {
    if (!enableScrollTop)
        return children;

    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 });

    const handleClick = () => headerRef?.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });

    return (
        <Fade in={ trigger }>
            <Box
                onClick={ handleClick }
                role='presentation'
                sx={{ position: 'fixed', bottom: SCROLL_TOP_OFFSET, right: SCROLL_TOP_OFFSET }}
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
    children: ReactElement;
}

export const Header = ({
    enableHideOnScroll=true,
    enableScrollTop=true,
    children,
}: Props) => {
    const headerAnchorRef = useRef<HTMLDivElement>(null);
    const onMenuClick = () => console.log('TODO: Implement me!');

    return (
        <>
            <CssBaseline />

            <HideOnScroll enableHideOnScroll={enableHideOnScroll}>
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

            <ScrollTop headerRef={headerAnchorRef} enableScrollTop={enableScrollTop}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>

        </>
    );
};

export default Header;