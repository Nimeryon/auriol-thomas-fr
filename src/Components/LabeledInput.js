import React, { useState, useEffect } from "react";
// Material-ui
import { Box, TextField, Grid, InputLabel } from "@material-ui/core";
// Style
import useStyles from "../Styles/Style.js";

const LabeledInput = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        setValue(props.value);
    }, [props.value, props.refresh]);

    const handleInputChange = (event) => {
        props.onChange(event.target.value);
        setValue(event.target.value === "" ? "" : event.target.value);
    };

    return <Grid container direction="row" alignItems="center">
        <Grid item xs={props.size1 ? props.size1 : 4}>
            <InputLabel shrink>
                {props.title}
            </InputLabel>
        </Grid>
        <Grid item xs={props.size2 ? props.size2 : 8}>
            <TextField
                value={value}
                fullWidth={true}
                inputProps={{
                    type: 'text',
                }}
                onChange={handleInputChange}
            />
        </Grid>
    </Grid>;
}

export default LabeledInput;