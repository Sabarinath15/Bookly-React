import { Route, Routes } from "react-router-dom";
//
import { Home } from "./pages/Home";
import { Events } from "./pages/Events";
import { Account } from "./pages/Account";
import { Dashboard } from "./pages/Dashboard";
import { Create } from "./pages/Create";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="events" element={<Events />} />
      <Route path="account" element={<Account />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="create" element={<Create />} />
    </Routes>
  );
}

export default App;
