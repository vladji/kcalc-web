import { NavigateFunction } from "react-router";

export const responseNotify = async (response?: Response) => {
  if (response && !response.ok) {
    const { error } = await response.json();
    console.log('error', error);
    if (error) {
      alert(error);
    } else {
      alert("Oops... Something went wrong");
    }
  }
};

export const checkRedirectToLogin = (navigate: NavigateFunction, response?: Response) => {
  if (response?.status === 401) {
    navigate("/admin-login");
  }
};
