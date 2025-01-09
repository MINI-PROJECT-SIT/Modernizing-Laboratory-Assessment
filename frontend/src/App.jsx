import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Landing } from "./pages/Landing";
import { UserLogin } from "./pages/UserLogin";
import { UserDashBoard } from "./pages/UserDashBoard";
import { Tests } from "./pages/Tests";
import { Test } from "./pages/Test";
import { CodeEditor } from "./pages/CodeEditor";
import { Viva } from "./pages/Viva";
import { TestResult } from "./pages/TestResult";
import { Results } from "./pages/Results";
import { AdminLogin } from "./pages/AdminLogin";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/dashboard" element={<UserDashBoard />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/test/:id" element={<Test />} />
          <Route path="/question/:id" element={<CodeEditor />} />
          <Route path="/viva/:id" element={<Viva />} />
          <Route path="/result/:id" element={<TestResult />} />
          <Route path="/results" element={<Results />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
