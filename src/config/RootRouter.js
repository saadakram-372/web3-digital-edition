import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { EditionsDashboard } from "../editions";
// import { UploadDashboard } from "../upload";

export const RootRouter = () => (
  <Router>
    <Routes>
      <Route path="/" Component={EditionsDashboard}></Route>
      <Route path="/edition" Component={EditionsDashboard}></Route>
      {/* <Route path="/upload" Component={UploadDashboard}></Route> */}
    </Routes>
  </Router>
);
