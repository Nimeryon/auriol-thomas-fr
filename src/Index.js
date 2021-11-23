import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Views
import Home from "./Views/Home.js";
import Tools from "./Views/Tools/Tools.js";
// Components
import Navbar from './Components/Navbar.js';
import Footer from './Components/Footer/footer.js';
// Material-ui
import { CssBaseline, Container } from "@material-ui/core";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
// Colors
import { deepPurple } from "@material-ui/core/colors";
// Style
import useStyles from './Styles/Style.js';

const theme = createTheme({
	palette: {
		primary: deepPurple,
		secondary: deepPurple,
	},
});

const App = () => {
	const classes = useStyles();

	return <ThemeProvider theme={theme}>
		<div className={classes.root}>
			<CssBaseline />
			<Navbar />
			<Container className={classes.main} component="main" maxWidth="lg">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/tools/*" element={<Tools />} />
					</Routes>
				</BrowserRouter>
			</Container>
			<Footer />
		</div>
	</ThemeProvider>;
}

// Rendering the entire react application
ReactDOM.render(<App />, document.getElementById('root'));