import DashBoardLayout from "./layouts/DashBoardLayout";
import HomePage from "./pages/HomePage";



function App()
{
  return (
    <>
      <DashBoardLayout 
        children={<HomePage />}
      />
    </>
  );
}

export default App