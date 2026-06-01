import Badge from "./components/Badge";
import SideBar from "./layouts/SideBar";


function App()
{
  return (
    <>
      <p>SMS-TRUHOSTER</p>
      <Badge color={"green"} children={"Echec"} />
      <SideBar />
    </>
  );
}

export default App