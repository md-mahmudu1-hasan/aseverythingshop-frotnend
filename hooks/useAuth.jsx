"use client";

import { use } from "react";
import { AuthContext } from "@/authentication/AuthContext/AuthContext";


const useAuth = () => {
  const authinfo = use(AuthContext);
  return authinfo;
};
export default useAuth;
