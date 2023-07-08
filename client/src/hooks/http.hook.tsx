import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../redux/slices/toasts";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null)
  const dispatch = useDispatch();
  const request = useCallback(
    async (
      url: string,
      method = "GET",
      body: any = null,
      headers: any = {}
    ) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Что-то пошло не так");
        }

        if (data.message) {
          dispatch(
            addToast({ id: Date.now(), message: data.message, type: "success" })
          );
        }

        setLoading(false);
        return data;
      } catch (e: any) {
        setLoading(false);
        dispatch(
          addToast({ id: Date.now(), message: e.message, type: "error" })
        );
        // setError(e.message)
        throw e;
      }
    },
    []
  );

  // const clearError = useCallback(() => setError(null), [error, request])

  return {
    loading,
    request,
    // error,
    // clearError
  };
};
