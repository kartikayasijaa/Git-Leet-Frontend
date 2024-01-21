import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setLoading, setRefreshToken } from "../../Redux/userSlice";
import { REFRESH_TOKEN } from "../../utils/url";
import { AccessTokenType } from "../../utils/types";
import { Box, Spinner } from "@chakra-ui/react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, accessToken } = useAppSelector((s) => s.user);
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (accessToken && accessToken.length > 0) return;
    (async () => {
      try {
        dispatch(setLoading(true));
        const response = await fetch(REFRESH_TOKEN, {
          credentials: "include",
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch refresh token");
        }
        const data = (await response.json()) as AccessTokenType;
        dispatch(setRefreshToken(data));
      } catch (error) {
        console.log(error);
      } finally {
        setShow(true);
        dispatch(setLoading(false));
      }
    })();
  }, [accessToken]);

  if (!show)
    return (
      <>
        <Box
          height={"70vh"}
          width={"100vw"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner size="xl" />
        </Box>
      </>
    );

  return isAuthenticated ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
