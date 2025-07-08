import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
import Router from "./Routers/Router";
import Loader from "./component/Loader";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
        }}
        containerStyle={{
          zIndex: 99999999,
        }}
      />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Router />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
