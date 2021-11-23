import { Component } from "react";
// Material-ui
import { Typography, Link } from "@material-ui/core";

class CopyrightComponent extends Component {
    render() {
        return (
            <Typography variant="body1" color="textSecondary">
                {"© "}
                <Link color="inherit" href="/">auriol-thomas.fr</Link>
                {" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        );
    }
}

export default CopyrightComponent;