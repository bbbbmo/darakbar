import { Outlet } from "react-router-dom";
import AppNavBar from "./components/App/AppNavBar/AppNavBar";
import AppFooter from "./components/App/AppFooter";

function App() {
  return (
    <div className="flex h-screen flex-col">
      <AppNavBar />
      <main className="flex-grow overflow-auto">
        {/* children 중 현재 URL과 매칭되는 element를 이 자리에 렌더링 */}
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
