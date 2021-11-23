import React, { useEffect, useRef } from "react";
// Material-ui
import { ListItem, InputLabel, Divider, IconButton, Tooltip, Grid } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
// Components
import InputSlider from "../InputSlider.js";

const Point = (props) => {
    const pointRef = useRef();
    const classes = props.classes;

    // Values
    var xPos = props.points[props.index].x;
    var yPos = props.points[props.index].y;

    useEffect(() => {
        xPos = props.points[props.index].x;
        yPos = props.points[props.index].y;

        const handleEnter = (e) => {
            props.setSelectedPoint(props.index);
        };

        const handleLeave = (e) => {
            props.setSelectedPoint(-1);
        };

        pointRef.current.addEventListener("pointerenter", handleEnter);
        pointRef.current.addEventListener("pointerleave", handleLeave);

        return () => {
            if (pointRef.current) {
                pointRef.current.removeEventListener("pointerenter", handleEnter);
                pointRef.current.removeEventListener("pointerleave", handleLeave);
            }
        }
    }, [props.points, props.selectedPoint, props.refresh]);

    const changeXPos = (value) => {
        xPos = value;

        let points = props.points;
        points[props.index] = { x: xPos, y: yPos };
        props.setPoints(points);
    }

    const changeYPos = (value) => {
        yPos = value;

        let points = props.points;
        points[props.index] = { x: xPos, y: yPos };
        props.setPoints(points);
    }

    const deletePoint = () => {
        props.setPoints(props.points.filter((_, index) => index != props.index));
    }

    return <ListItem key={"point-" + props.index} ref={pointRef} divider={true} selected={props.selectedPoint == props.index}>
        <Grid container spacing={1} direction="row">
            <Grid item xs={6}>
                <InputSlider oneLine={true} size1xs={6} size2xs={6} size1md={6} size2md={6} refresh={props.shapeRefresh} min={-1} max={1} step={0.001} value={xPos} onChange={changeXPos} title="X" />
            </Grid>
            <Grid item xs={6}>
                <InputSlider oneLine={true} size1xs={6} size2xs={6} size1md={6} size2md={6} refresh={props.shapeRefresh} min={-1} max={1} step={0.001} value={yPos} onChange={changeYPos} title="Y" />
            </Grid>
        </Grid>
        <Divider flexItem={true} orientation="vertical" variant="middle" />
        <Tooltip title="New Point">
            <IconButton color="secondary" onClick={deletePoint}>
                <Delete />
            </IconButton>
        </Tooltip>
        <InputLabel shrink>{props.index}</InputLabel>
    </ListItem>
}

export default Point;