import classes from './header.module.css';

interface HeaderProps {
    
}
 
const Header = () => {
    return (
        <div className={classes.header}>

        </div>
    );
}
 
export default Header;
export const HeaderShadow = () => <div className={classes.headerShadow} />;
