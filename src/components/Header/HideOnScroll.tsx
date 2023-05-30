import { ReactElement } from 'react';
import { Slide, useScrollTrigger } from '@mui/material';


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


export default HideOnScroll;