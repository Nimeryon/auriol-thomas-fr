import React, { useState, useEffect, useRef, forwardRef } from "react";
// Material-ui
import { Paper, Box, Typography, Divider, Grid } from "@material-ui/core";
// Components
import Form from "../../Components/Shape/Form.js";
// Style
import useStyles from "../../Styles/Style.js";

const Canvas = forwardRef((props, ref) => <canvas className={props.className ? props.className : null} ref={ref} onContextMenu={(e) => { e.preventDefault(); return false; }} />);

const Shape = () => {
    const canvasRef = useRef();
    const classes = useStyles();

    // Lists
    const [points, setPoints] = useState([]);
    // Value
    const [selectedPoint, setSelectedPoint] = useState(-1);
    const [draggedPoint, setDraggedPoint] = useState(-1);

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");

        const handleResize = (e) => {
            const ctx = canvasRef.current.getContext("2d");

            let margin = 8;
            let padding = 8;

            let box = window.getComputedStyle(document.getElementById("canvasBox"), null);
            let boxWidth = parseFloat(box.getPropertyValue("width")) - (margin + padding);

            ctx.canvas.width = boxWidth;
            ctx.canvas.height = boxWidth;

            draw(ctx, points);
        };

        const handleMove = (e) => {
            e = e || window.event;

            let canvasRect = e.target.getBoundingClientRect();
            let xPos = e.clientX - canvasRect.left;
            let yPos = e.clientY - canvasRect.top;
            if (draggedPoint == -1) {
                for (let i = 0; i < points.length; ++i) {
                    if (isPosInPoint(ctx, xPos, yPos, points[i], 8)) {
                        return changeSelected(i);
                    }
                }

                changeSelected(-1);
            }
            else {
                let point = getClampedPosition(ctx, { x: xPos, y: yPos });
                points[draggedPoint] = point;
                changePoints(points);
            }
        };

        const handleMouseDown = (e) => {
            e = e || window.event;

            const ctx = canvasRef.current.getContext("2d");

            let canvasRect = e.target.getBoundingClientRect();
            let xPos = e.clientX - canvasRect.left;
            let yPos = e.clientY - canvasRect.top;
            for (let i = 0; i < points.length; ++i) {
                if (isPosInPoint(ctx, xPos, yPos, points[i], 8)) {
                    return changeDragged(i);
                }
            }
        };

        const handleMouseUp = (e) => {
            e = e || window.event;

            const ctx = canvasRef.current.getContext("2d");

            let canvasRect = e.target.getBoundingClientRect();
            let xPos = e.clientX - canvasRect.left;
            let yPos = e.clientY - canvasRect.top;
            if (draggedPoint == -1) {
                if (e.button == 0) {
                    changePoints([...points, getClampedPosition(ctx, { x: xPos, y: yPos })]);
                    changeSelected(points.length);
                }
                return;
            }

            if (e.button == 2) {
                if (selectedPoint != -1) {
                    changePoints(points.filter((_, index) => index != selectedPoint));
                    changeDragged(-1);
                    changeSelected(-1);
                }
                return;
            }

            return changeDragged(-1);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        canvasRef.current.addEventListener("pointermove", handleMove);
        canvasRef.current.addEventListener("pointerdown", handleMouseDown);
        canvasRef.current.addEventListener("pointerup", handleMouseUp);

        return () => {
            window.removeEventListener("resize", handleResize);

            canvasRef.current.removeEventListener("pointermove", handleMove);
            canvasRef.current.removeEventListener("pointerdown", handleMouseDown);
            canvasRef.current.removeEventListener("pointerup", handleMouseUp);
        }
    }, [points, selectedPoint, draggedPoint]);

    const changePoints = (points) => {
        setPoints(_ => { return points; });

        const ctx = canvasRef.current.getContext("2d");
        draw(ctx, points);
    };

    const changeSelected = (index) => {
        setSelectedPoint(_ => { return index; });

        const ctx = canvasRef.current.getContext("2d");
        draw(ctx, points);
    }

    const changeDragged = (index) => {
        setDraggedPoint(_ => { return index; });

        const ctx = canvasRef.current.getContext("2d");
        draw(ctx, points);
    }

    const draw = (ctx, points) => {
        const canvas = ctx.canvas;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2, canvas.height / 2, 2, 2, 0, 0, Math.PI * 2);
        ctx.fill();

        drawPoints(ctx, points);
    }

    const drawPoints = (ctx, points) => {
        if (points.length == 1) {
            let pointPos = getCanvasPosition(ctx, points[0]);
            ctx.fillRect(pointPos.x, pointPos.y, 2, 2);
        } else if (points.length > 1) {
            let pointPos = getCanvasPosition(ctx, points[0]);
            ctx.beginPath();
            ctx.moveTo(pointPos.x, pointPos.y);
            for (let i = 1; i < points.length; ++i) {
                pointPos = getCanvasPosition(ctx, points[i]);
                ctx.lineTo(pointPos.x, pointPos.y);
            }
            pointPos = getCanvasPosition(ctx, points[0]);
            ctx.lineTo(pointPos.x, pointPos.y);
            ctx.stroke();
        }

        drawHighlight(ctx, points);
    }

    const drawHighlight = (ctx, points) => {
        ctx.fillStyle = 'red';
        for (let i = 0; i < points.length; ++i) {
            let pointPos = getCanvasPosition(ctx, points[i]);
            ctx.beginPath();
            ctx.ellipse(pointPos.x, pointPos.y, 4, 4, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        if (selectedPoint != -1 && selectedPoint < points.length) {
            ctx.fillStyle = 'green';
            let pointPos = getCanvasPosition(ctx, points[selectedPoint]);
            ctx.beginPath();
            ctx.ellipse(pointPos.x, pointPos.y, 6, 6, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const getCanvasPosition = (ctx, point) => {
        const canvas = ctx.canvas;
        return { x: (point.x + 1) / 2 * canvas.width, y: (point.y + 1) / 2 * canvas.height };
    }

    const getClampedPosition = (ctx, point) => {
        const canvas = ctx.canvas;

        let x = point.x / (canvas.width / 2) - 1;
        let y = point.y / (canvas.height / 2) - 1;
        return { x: Math.round(x * 1000) / 1000, y: Math.round(y * 1000) / 1000 };
    }

    const isPosInPoint = (ctx, x, y, point, radius) => {
        point = getCanvasPosition(ctx, point);
        return x >= point.x - radius && x <= point.x + radius && y >= point.y - radius && y <= point.y + radius;
    }

    return <Paper className={classes.view} elevation={1}>
        <Box width="100%" display="flex" justifyContent="center">
            <Typography variant="h4">Shape Generator</Typography>
        </Box>
        <Box width="100%" className={classes.main}>
            <Divider variant="middle" />
        </Box>
        <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={12} md={6}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={4}>
                                <Box width="100%" display="flex" flexDirection="row" justifyContent="space-around" flexWrap="wrap">
                                    <Typography variant="body2">Left Click: Place a point</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box width="100%" display="flex" flexDirection="row" justifyContent="space-around" flexWrap="wrap">
                                    <Typography variant="body2">Right Click: Delete a point</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box width="100%" display="flex" flexDirection="row" justifyContent="space-around" flexWrap="wrap">
                                    <Typography variant="body2">Drag a point to move it</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Box width="100%" display="flex" justifyContent="center" id="canvasBox">
                            <Canvas className={classes.shapeCanvas} ref={canvasRef} />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Box width="100%" height="100%" display="flex">
                    <Form classes={classes} points={points} setPoints={changePoints} selectedPoint={selectedPoint} setSelectedPoint={changeSelected} />
                </Box>
            </Grid>
        </Grid>
    </Paper>
}

export default Shape;