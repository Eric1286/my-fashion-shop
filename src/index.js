import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
);
