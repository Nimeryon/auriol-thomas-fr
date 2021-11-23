import React, { useState } from "react";
// Material-ui
import { Paper, Box, Typography, Divider, Grid, TextField, Button, FormGroup } from "@material-ui/core";
// Chart
import { Line } from "react-chartjs-2";
// Components
import InputSlider from "../../Components/InputSlider.js";
// Style
import useStyles from "../../Styles/Style.js";

const Forms = (props) => {
    const classes = props.classes;

    // Additive values
    const [aMaxLevel, setAMaxLevel] = useState(100);
    const [aBaseXP, setABaseXP] = useState(100);
    const [aXPIncrease, setAXPIncrease] = useState(100);
    // Exponential values
    const [eMaxLevel, setEMaxLevel] = useState(100);
    const [eBaseXP, setEBaseXP] = useState(100);
    const [eBase, setEBase] = useState(1.1);
    const [eRate, setERate] = useState(1);
    // Reset
    const [additiveRefresh, doAdditiveRefresh] = useState(false);
    const [exponentialRefresh, doExponentialRefresh] = useState(false);

    const resetAdditive = () => {
        setAMaxLevel(100);
        setABaseXP(100);
        setAXPIncrease(100);

        doAdditiveRefresh(!additiveRefresh);
    }

    const resetExponential = () => {
        setEMaxLevel(100);
        setEBaseXP(100);
        setEBase(1.1);
        setERate(1);

        doExponentialRefresh(!exponentialRefresh);
    }

    return <Grid container spacing={3} direction="row">
        <Grid item xs={12} md={6}>
            <Paper elevation={1} className={classes.form}>
                <Box width="100%" display="flex" justifyContent="center">
                    <Typography variant="h6">Additive</Typography>
                </Box>
                <Divider variant="middle" />
                <FormGroup className={classes.formGroup}>
                    <TextField label="Max Level" inputProps={{ min: 1, max: 10000, type: "number" }} value={aMaxLevel} onChange={(e) => { setAMaxLevel(e.target.value) }} />
                </FormGroup>
                <FormGroup className={classes.formGroup}>
                    <InputSlider refresh={additiveRefresh} min={1} max={1000000} step={1} value={aBaseXP} onChange={setABaseXP} title="Base XP" />
                    <InputSlider refresh={additiveRefresh} min={1} max={1000000} step={1} value={aXPIncrease} onChange={setAXPIncrease} title="XP Increase" />
                </FormGroup>
                <Box width="100%" display="flex" justifyContent="center" className={classes.formButtons}>
                    <FormGroup >
                        <Grid container spacing={3} direction="row">
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" color="secondary" fullWidth={true} onClick={(e) => { props.handleAdditive(aMaxLevel, aBaseXP, aXPIncrease) }}>Calculate</Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="outlined" color="secondary" fullWidth={true} onClick={(e) => { resetAdditive() }}>Reset</Button>
                            </Grid>
                        </Grid>
                    </FormGroup>
                </Box>
            </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
            <Paper elevation={1} className={classes.form}>
                <Box width="100%" display="flex" justifyContent="center">
                    <Typography variant="h6">Exponential</Typography>
                </Box>
                <Divider variant="middle" />
                <FormGroup className={classes.formGroup}>
                    <TextField label="Max Level" inputProps={{ min: 1, max: 10000, type: "number" }} value={eMaxLevel} onChange={(e) => { setEMaxLevel(e.target.value) }} />
                </FormGroup>
                <FormGroup className={classes.formGroup}>
                    <InputSlider refresh={exponentialRefresh} min={1} max={1000000} step={1} value={eBaseXP} onChange={setEBaseXP} title="Base XP" />
                    <InputSlider refresh={exponentialRefresh} min={1.01} max={100.00} step={0.01} value={eBase} onChange={setEBase} title="Base" />
                    <InputSlider refresh={exponentialRefresh} min={0.2} max={2.000} step={0.001} value={eRate} onChange={setERate} title="Rate" />
                </FormGroup>
                <Box width="100%" display="flex" justifyContent="center" className={classes.formButtons}>
                    <FormGroup >
                        <Grid container spacing={3} direction="row">
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" color="secondary" fullWidth={true} onClick={(e) => { props.handleExponential(eMaxLevel, eBaseXP, eBase, eRate) }}>Calculate</Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="outlined" color="secondary" fullWidth={true} onClick={(e) => { resetExponential() }}>Reset</Button>
                            </Grid>
                        </Grid>
                    </FormGroup>
                </Box>
            </Paper>
        </Grid>
    </Grid >;
}

const Xp = () => {
    const classes = useStyles();

    const generateLabels = (max) => {
        return Array.from({ length: max }, (_, i) => i + 1);
    }

    const generateAditiveData = (maxlevel, baseXP, increase) => {
        let data = [];
        let xp = 0;

        for (let i = 1; i <= maxlevel; i++) {
            xp += baseXP + (i - 1) * increase;
            data.push(Math.floor(xp));
        }

        return data;
    }

    const generateExponentialData = (maxlevel, baseXP, base, rate) => {
        let data = [];
        let xp = 0;

        for (let i = 1; i <= maxlevel; i++) {
            xp += baseXP * Math.pow(base, rate * (i - 1));
            data.push(Math.floor(xp));
        }

        return data;
    }

    // Chart values
    const [chartLabels, setChartLabels] = useState(generateLabels(100, 100, 100));
    const [chartData, setChartData] = useState(generateAditiveData(100, 100, 1.1, 1));
    const chart = {
        labels: chartLabels,
        datasets: [
            {
                label: 'XP',
                fill: false,
                borderColor: '#834bff',
                backgroundColor: '#834bff',
                data: chartData
            }
        ]
    }

    const handleAdditive = (maxlevel, baseXP, increase) => {
        setChartLabels(generateLabels(maxlevel));
        setChartData(generateAditiveData(maxlevel, baseXP, increase));
    }

    const handleExponential = (maxlevel, baseXP, base, rate) => {
        setChartLabels(generateLabels(maxlevel));
        setChartData(generateExponentialData(maxlevel, baseXP, base, rate));
    }

    return <Paper className={classes.view} elevation={1}>
        <Box width="100%" display="flex" justifyContent="center">
            <Typography variant="h4">Experience curve generator</Typography>
        </Box>
        <Box width="100%" className={classes.main}>
            <Divider variant="middle" />
        </Box>
        <Forms classes={classes} handleAdditive={handleAdditive} handleExponential={handleExponential} />
        <Line
            data={chart}
            options={{
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: "XP per level",
                        fontSize: 16
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    },
                    tooltip: {
                        callbacks: {
                            title: function (tooltipItem) {
                                return "Level " + tooltipItem[0].label;
                            },
                        }
                    },
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Level'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'XP'
                        }
                    }
                }
            }}
        />
    </Paper>
}

export default Xp;