import React, { useState, useEffect } from "react";
// Material-ui
import { Box, Grid, Slider, TextField, InputLabel } from "@material-ui/core";
// Style
import useStyles from "../Styles/Style.js";

const InputSlider = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        setValue(props.value);
    }, [props.value, props.refresh]);

    const handleSliderChange = (event, sliderValue) => {
        props.onChange(sliderValue);
        setValue(sliderValue);
    };

    const handleInputChange = (event) => {
        props.onChange(parseFloat(event.target.value));
        setValue(event.target.value === '' ? '' : parseFloat(event.target.value));
    };

    return <Box width="100%">
        <Grid container spacing={1} alignContent="center" alignItems="center">
            <Grid item xs={props.oneLine ? 1 : 12}>
                <InputLabel shrink>
                    {props.title}
                </InputLabel>
            </Grid>
            <Grid item xs={props.oneLine ? 11 : 12}>
                <Grid container spacing={1}>
                    <Grid item xs={props.size1xs ? props.size1xs : 9} md={props.size1md ? props.size1md : 9}>
                        <Slider
                            value={value}
                            min={props.min ? props.min : 0}
                            max={props.max ? props.max : 100}
                            step={props.step ? props.step : 1}
                            onChange={handleSliderChange}
                        />
                    </Grid>
                    <Grid item xs={props.size2xs ? props.size2xs : 3} md={props.size2md ? props.size2md : 3}>
                        <TextField
                            value={value}
                            fullWidth={true}
                            inputProps={{
                                min: props.min ? props.min : 0,
                                max: props.max ? props.max : 100,
                                step: props.step ? props.step : 1,
                                type: 'number',
                            }}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>;
}

export default InputSlider;