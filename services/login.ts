import React, { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

export const jwt = new BehaviorSubject(null);

export function useLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(!!jwt.value);

  useEffect(() => {
    const loginSubscribe = () => {
      setLoggedIn(!!jwt.value);
      return jwt.subscribe((c) => {
        setLoggedIn(!!jwt.value);
      });
    };
    loginSubscribe();
  }, []);

  return loggedIn;
}
