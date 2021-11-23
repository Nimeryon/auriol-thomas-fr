import React, { useState } from "react";
// Material-ui
import { Paper, Box, Button, Grid, FormGroup, List, IconButton, Tooltip, InputLabel, Radio, RadioGroup, FormControlLabel, FormControl } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
// Components
import InputSlider from "../InputSlider.js";
import LabeledInput from "../LabeledInput.js";
import PointList from "./PointList.js";

const Form = (props) => {
    const classes = props.classes;

    // Lists
    const [actions, setActions] = useState([]);
    // Values
    const [xScale, setXScale] = useState(1);
    const [yScale, setYScale] = useState(1);
    const [genType, setGenType] = useState("convex");
    const [vClassName, setVClassName] = useState("Vector2");
    const [areaText, setAreaText] = useState("");
    // Reset
    const [shapeRefresh, doShapeRefresh] = useState(false);

    const addPoint = () => {
        props.setPoints([...props.points, { x: 0, y: 0 }]);
    }

    const generate = () => {
        let text;

        if (vClassName.length == 0) {
            text = "Vector class name can't be empty.";
            return setAreaText(text);
        }

        if (props.points.length <= 2) {
            text = "You need more than 2 values to generate a shape!";
            text += `\nCurrent values : ${props.points.length}`;
            return setAreaText(text);
        }

        for (let i = 0; i < props.points.length; i++) {
            let point = props.points[i];
            switch (genType) {
                case "convex":
                    if (i == 0) text = `sf::ConvexShape shape(${props.points.length});`;
                    text += `\nshape.setPoint(${i}, ${vClassName}(${point.x}f, ${point.y}f));`;
                    break;
                case "vector":
                    if (i == 0) text = `std::vector<${vClassName}> vec;`;
                    text += `\nvec.push_back(new ${vClassName}(${point.x}f, ${point.y}f));`;
                    break;
                case "array":
                    if (i == 0) text = `${vClassName} array[${props.points.length}] = {`;
                    text += `\n   array[${i}] = new ${vClassName}(${point.x}f, ${point.y}f)`;
                    if (i != props.points.length - 1) text += `,`;
                    if (i == props.points.length - 1) text += `\n};`;
                    break;
                default:
                    text = "Generation type not recognized.";
                    break;
            }
        }
        setAreaText(text);
    }

    const undo = () => {

    }

    const reset = () => {
        props.setPoints([]);
        setActions([]);

        setXScale(1);
        setYScale(1);
        setGenType("convex");
        setVClassName("Vector2");
        setAreaText("");

        doShapeRefresh(!shapeRefresh);
    }

    const handleGenChange = (e) => {
        e = e || window.event;
        setGenType(e.target.value);
    }

    return <Paper elevation={1} className={classes.shapeForm}>
        <FormGroup style={{ height: "40%" }} className={classes.formGroup}>
            <Paper elevation={1} className={classes.fullHeight}>
                <List className={classes.pointList}>
                    <PointList classes={classes} points={props.points} setPoints={props.setPoints} selectedPoint={props.selectedPoint} setSelectedPoint={props.setSelectedPoint} refresh={shapeRefresh} />
                    <Box width="100%" display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                        <Tooltip title="New Point">
                            <IconButton color="secondary" onClick={addPoint}>
                                <AddCircleOutline />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </List>
            </Paper>
        </FormGroup >
        <FormGroup className={classes.formGroup}>
            <Grid container spacing={3} direction="row" alignItems="center">
                <Grid item xs={12} sm={6}>
                    <InputSlider refresh={shapeRefresh} min={1} max={100} step={0.5} value={xScale} onChange={setXScale} title="X Scale Multiplicator" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputSlider refresh={shapeRefresh} min={1} max={100} step={0.5} value={yScale} onChange={setYScale} title="Y Scale Multiplicator" />
                </Grid>
            </Grid>
        </FormGroup>
        <FormGroup className={classes.formGroup}>
            <Grid container spacing={1} direction="row" alignItems="center">
                <Grid item xs={12}>
                    <Grid container spacing={1} direction="row" alignItems="center">
                        <Grid item xs={4}>
                            <InputLabel shrink>Generate Type</InputLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl fullWidth={true}>
                                <RadioGroup aria-label="genType" name="type1" value={genType} onChange={handleGenChange}>
                                    <Grid container spacing={1} direction="row" justifyContent="space-around">
                                        <Grid item xs={4}>
                                            <FormControlLabel value={"convex"} control={<Radio />} label="Convex" />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControlLabel value={"vector"} control={<Radio />} label="Vector" />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControlLabel value={"array"} control={<Radio />} label="Array" />
                                        </Grid>
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <LabeledInput refresh={shapeRefresh} value={vClassName} onChange={setVClassName} title="Vector Class" />
                </Grid>
            </Grid>
        </FormGroup>
        <FormGroup className={classes.formGroup}>
            <Grid container spacing={1} direction="row" alignItems="center">
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="secondary" fullWidth={true} onClick={(e) => { generate() }}>Generate</Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Button variant="outlined" color="secondary" fullWidth={true} onClick={(e) => { undo() }}>Undo</Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Button variant="outlined" color="secondary" fullWidth={true} onClick={(e) => { reset() }}>Reset</Button>
                </Grid>
            </Grid>
        </FormGroup>
        <FormGroup style={{ height: "25%" }} className={classes.formGroup, classes.areaForm}>
            <textarea className={classes.area} value={areaText} readOnly={true} />
        </FormGroup>
    </Paper >;
}

export default Form;