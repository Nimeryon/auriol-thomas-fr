import { makeStyles } from "@material-ui/core";
// Colors
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        minWidth: "400px"
    },
    fullWidth: {
        width: "100%"
    },
    fullHeight: {
        height: "100%"
    },
    main: {
        marginTop: "8px",
        marginBottom: "8px"
    },
    navbar: {
        display: "flex",
        flexDirection: "row"
    },
    navbarPop: {
        marginTop: "8px"
    },
    form: {
        padding: "8px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    shapeForm: {
        flexGrow: 1,
        padding: "8px",
        display: "flex",
        flexDirection: "column",
    },
    formGroup: {
        margin: "4px",
        padding: "4px"
    },
    formButtons: {
        padding: "8px",
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end"
    },
    view: {
        padding: "8px"
    },
    dividerWhite: {
        marginLeft: "16px",
        marginRight: "16px",
        backgroundColor: "rgba(255, 255, 255, 0.2)"
    },
    footer: {
        padding: "8px",
        marginTop: "auto",
        backgroundColor: grey[300],
    },
    inputSlider: {
        marginTop: "8px"
    },
    hand: {
        cursor: "pointer"
    },
    shapeCanvas: {
        border: "2px outset rgba(103,58,183,0.35);"
    },
    pointList: {
        height: "100%",
        overflow: "hidden",
        overflowY: "scroll",
    },
    area: {
        height: "100%",
        overflow: "hidden",
        overflowY: "scroll",
        resize: "none"
    },
    listForm: {
        height: "40%",
        maxHeight: "40%"
    },
    areaForm: {
        height: "20%",
        maxHeight: "20%"
    }
});

export default useStyles;