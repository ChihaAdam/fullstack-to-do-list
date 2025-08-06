import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedLogin, ProtectedRoute } from "./hooks/ProtectedRoute.tsx";
import { lazy,Suspense } from "react";
import Loading from "./components/ui/Loading.tsx";
const Login = lazy(() => import("./pages/login.tsx"));
const Signup = lazy(() => import("./pages/signup.tsx"));
const CompletedTodos = lazy(() => import("./pages/completedTodos.tsx"));
const PendingTodos = lazy(() => import("./pages/pendingTodos.tsx"));
import { AuthProvider } from "./context/AuthContext.tsx";
const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <PendingTodos />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/completed",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <CompletedTodos />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectedLogin>
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      </ProtectedLogin>
    ),
  },
  {
    path: "/Signup",
    element: (
      <ProtectedLogin>
        <Suspense fallback={<Loading />}>
          <Signup />
        </Suspense>
      </ProtectedLogin>
    ),
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;
