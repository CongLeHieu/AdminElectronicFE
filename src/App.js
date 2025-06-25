import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (document.visibilityState === "hidden") {
        // Clear localStorage if the page is hidden (indicating close)
        localStorage.clear();
      }
    };
    // Function to handle the visibilitychange event
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Set a flag in sessionStorage to indicate the page is hidden
        sessionStorage.setItem("isPageHidden", "true");
      } else {
        // Remove the flag if the page is visible
        sessionStorage.removeItem("isPageHidden");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* admin role */}
          <Route element={<RequireAuth allowedRoles={"admin"} />}>
            <Route path="/admin" element={<NavBar />}></Route>
            <Route path="/admin/user" element={<UserManagement />}></Route>
            <Route path="/admin/edit/:id" element={<Edit />}></Route>
            <Route path="/admin/create" element={<CreateUser />}></Route>
            <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<div>There nothing here</div>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
