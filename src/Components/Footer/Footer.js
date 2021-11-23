// Material-ui
import { Toolbar, Box } from "@material-ui/core";
// Components
import CopyrightComponent from "./Copyright.js";
// Style
import useStyles from "../../Styles/Style.js";

const Footer = () => {
    const classes = useStyles();

    return <footer className={classes.footer}>
        <Toolbar variant="dense">
            <Box width="100%" display="flex" justifyContent="center">
                <CopyrightComponent />
            </Box>
        </Toolbar>
    </footer>;
}

export default Footer;