import { Component } from "react";
import { Routes, Route } from "react-router-dom";
// Views
import Xp from "./Xp.js";
import Shape from "./Shape.js";
// Material-ui
import { Paper, Box, Typography } from "@material-ui/core";

class ToolsComponent extends Component {
    render() {
        return (
            <Paper elevation={1}>
                <Box width="100%" display="flex" justifyContent="center">
                    <Typography variant="h4">Tools</Typography>
                </Box>
            </Paper>
        );
    }
}

const Tools = () => {
    return <Routes>
        <Route path="/" element={<ToolsComponent />} />
        <Route path="/xp" element={<Xp />} />
        <Route path="/shape" element={<Shape />} />
    </Routes>
}

export default Tools;