const AUTH_TOKEN_KEY = "token";
const AUTH_ROLE_KEY = "authRole";
const AUTH_ADMIN_KEY = "currentadmin";
const AUTH_USER_KEY = "currentuser";

const isBrowser = () => typeof window !== "undefined";

const safeParse = (value) => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const getAuthToken = () => {
  if (!isBrowser()) return "";
  return localStorage.getItem(AUTH_TOKEN_KEY) || "";
};

export const getAuthHeaders = (baseHeaders = {}) => {
  const token = getAuthToken();
  if (!token) return { ...baseHeaders };

  return {
    ...baseHeaders,
    Authorization: `Bearer ${token}`,
  };
};

export const saveAuthSession = ({ token, role, profile }) => {
  if (!isBrowser()) return;

  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  if (role) {
    localStorage.setItem(AUTH_ROLE_KEY, role);
  }

  if (role === "admin") {
    if (profile) localStorage.setItem(AUTH_ADMIN_KEY, JSON.stringify(profile));
    localStorage.removeItem(AUTH_USER_KEY);
  }

  if (role === "user") {
    if (profile) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(profile));
    localStorage.removeItem(AUTH_ADMIN_KEY);
  }
};

export const loadAuthSession = () => {
  if (!isBrowser()) {
    return {
      token: "",
      role: "",
      admin: null,
      user: null,
    };
  }

  return {
    token: localStorage.getItem(AUTH_TOKEN_KEY) || "",
    role: localStorage.getItem(AUTH_ROLE_KEY) || "",
    admin: safeParse(localStorage.getItem(AUTH_ADMIN_KEY)),
    user: safeParse(localStorage.getItem(AUTH_USER_KEY)),
  };
};

export const clearAuthSession = () => {
  if (!isBrowser()) return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_ROLE_KEY);
  localStorage.removeItem(AUTH_ADMIN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};
