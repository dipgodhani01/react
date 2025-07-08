import "./App.css";
import { Suspense } from "react";
import Router from "./Routers/Router";
import { Toaster } from "react-hot-toast";
import LoaderLarge from "./component/LoaderLarge";

function App() {
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3500,
        }}
        containerStyle={{
          zIndex: 99999999,
        }}
      />
        <Suspense fallback={<LoaderLarge />}>
          <Router />
        </Suspense>
    </div>
  );
}

export default App;
