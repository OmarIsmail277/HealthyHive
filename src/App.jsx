<<<<<<< Updated upstream
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
=======
// import { BrowserRouter } from "react-router-dom";

// function App() {
//   return <BrowserRouter>{/* Put your Components here */}</BrowserRouter>;
// }
// export default App;

import Cart from "./components/Cart/Cart";

function App() {
  return (
    <Cart/>
>>>>>>> Stashed changes
  );
}
export default App;

