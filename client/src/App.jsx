import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className=" mx-auto max-w-7xl">
     <Outlet/>
    </div>
  );
};

export default App;
