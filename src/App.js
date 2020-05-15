import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Navbar from "./components/navBar";
import "./App.css";
import ImageGallery from "./components/imageGallery";
import ImagesList from "./components/images";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

//Mui
// import themeStyles from "./utils/theme";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// const theme = createMuiTheme(themeStyles);
function App() {
  return (
    // <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={ImageGallery} />
            <Route exact path="/images" component={ImagesList} />
          </Switch>
        </Router>
      </Provider>
    // </MuiThemeProvider>
  );
}

export default App;
