//Styles
import GlobalStyle from "../styles/Global"
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Pages
import { Landing } from "./Landing";
export default function Home() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
