import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import ImageGallery from "./components/imageGallery";
import ImagesList from "./components/images";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
      <Provider store={store}>
        <Router>
          <Switch>
            {/* <Route exact path="/" component={ImageGallery} /> */}
            <Route path="/" component={ImagesList} />
          </Switch>
        </Router>
      </Provider>
  );
}

export default App;
