import LoginPage from "./pages/loginPage/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/dashboardPage/dashboard";
import Error from "./pages/error/error";
import PageableProvider from "./pageableContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PageableProvider>
                <HomePage />
              </PageableProvider>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
