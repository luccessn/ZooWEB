import AppRoutes from "./AppRoutes";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <div className="h-[20000px]">
      <NavBar />
      <AppRoutes />
    </div>
  );
}

export default App;
