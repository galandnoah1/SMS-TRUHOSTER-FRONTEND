import { useState } from "react";
import DashBoardLayout from "./layouts/DashBoardLayout";
import ClassePage from "./pages/ClassePage";
import HomePage from "./pages/HomePage";
import './styles/global.css'
import StudentPage from "./pages/StudentPage";




function App()
{

  const pages = {
    "acceuil": <HomePage />,
    "classes": <ClassePage />,
    "eleves": <StudentPage />
  }

  const [page, setPage] = useState("acceuil")

  const changePage = (page_) => {
    setPage(page_)
  }

  return (
    <>
      <DashBoardLayout 
        children={pages[page]}
        navigate={changePage}
      />
    </>
  );
}

export default App