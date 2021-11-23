import React, { useEffect } from "react";
// Material-ui
import { Box, Typography } from "@material-ui/core";
// Components
import Point from "./Point.js";

const PointList = (props) => {
    const classes = props.classes;

    useEffect(() => { }, [props.points, props.refresh]);

    if (props.points.length == 0) {
        return <Box width="100%" display="flex" justifyContent="center">
            <Typography variant="body2">No Points...</Typography>
        </Box>;
    }

    return props.points.map((_, index) => {
        return <Point key={"point-" + index} classes={props.classes} points={props.points} setPoints={props.setPoints} setSelectedPoint={props.setSelectedPoint} index={index} refresh={props.shapeRefresh} selectedPoint={props.selectedPoint} />;
    });
}

export default PointList;