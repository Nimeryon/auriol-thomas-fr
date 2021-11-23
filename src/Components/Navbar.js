import React, { Fragment, useState, useRef, useEffect } from "react";
// Material-ui
import { AppBar, Toolbar, Typography, Link, Box, Popper, ClickAwayListener, MenuList, MenuItem, Paper, Grow, Divider } from "@material-ui/core";
// Style
import useStyles from "../Styles/Style.js";

const Navbar = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return <Fragment>
        <AppBar position="relative">
            <Toolbar variant="dense" className={classes.navbar}>
                <Typography variant="h6">
                    <Link href="/" color="inherit">auriol-thomas.fr</Link>
                </Typography>
                <Divider flexItem={true} orientation="vertical" className={classes.dividerWhite} variant="middle" />
                <Box>
                    <Link color="inherit"
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleToggle}
                    >
                        <Typography variant="button" className={classes.hand}>
                            TOOLS ▼
                        </Typography>
                    </Link>
                    <Popper className={classes.navbarPop} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper elevation={1}>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                            <Link href="/tools"><MenuItem onClick={handleClose}>Tools</MenuItem></Link>
                                            <Divider variant="middle" />
                                            <Link href="/tools/xp"><MenuItem onClick={handleClose}>Experience Curve Generator</MenuItem></Link>
                                            <Link href="/tools/shape"><MenuItem onClick={handleClose}>Shape Generator</MenuItem></Link>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Box>
            </Toolbar>
        </AppBar>
    </Fragment>;
}

export default Navbar;