export const setToken = (token: string) => {
    localStorage.setItem("token", token);
  };
  
  export const getToken = (): string | null => {
    return localStorage.getItem("token");
  };

  export function isAuthenticated(): boolean {
    const token = getToken();
    return !!token; // Возвращает true, если токен существует
  }
  
  export function clearToken(): void {
      localStorage.removeItem('token');
  }