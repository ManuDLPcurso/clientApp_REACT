import { useState, useEffect } from "react";
import { Route, Redirect } from "react-router";
import { AuthService } from "../services/AuthService";
import { useIonViewWillEnter } from "@ionic/react";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}
export default function ProtectedRoute2({
  component: Component,
  ...rest
}: ProtectedRouteProps) {

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const logged = await AuthService.isAuthenticated();
      setIsAuthenticated(logged);
      setLoading(false);
    };
    checkAuth();
  }, []);
  return (

    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return <div>Cargando...</div>;
        }
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />

  );
}
