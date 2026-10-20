import { Route, Routes } from "react-router";
import { HomeScreen } from "./pages/home-screen";
import { NotFound } from "./pages/not-found";
import Results from "./pages/results";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/results" element={<Results />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default App;
