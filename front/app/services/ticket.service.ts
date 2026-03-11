import { useAuthStore } from "~/stores/auth";

export const useTicketService = () => {
  const config = useRuntimeConfig();
  const base = config.public.apiBase;
  const auth = useAuthStore();

  const headers = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.token}`,
  });

  const handleResponse = async (res: Response) => {
    if (res.status === 401) {
      auth.logout();
      navigateTo("/login");
      throw new Error("Session expirée");
    }

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Erreur serveur");
    }

    if (res.status === 204) return null;

    return res.json();
  };

  const getAll = async () => {
    const res = await fetch(`${base}/api/tickets`, { headers: headers() });
    return handleResponse(res);
  };

  const getById = async (id: number) => {
    const res = await fetch(`${base}/api/tickets/${id}`, {
      headers: headers(),
    });
    return handleResponse(res);
  };

  const create = async (title: string, description: string) => {
    const res = await fetch(`${base}/api/tickets`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ title, description }),
    });
    return handleResponse(res);
  };

  const update = async (id: number, data: object) => {
    const res = await fetch(`${base}/api/tickets/${id}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  };

  const remove = async (id: number) => {
    const res = await fetch(`${base}/api/tickets/${id}`, {
      method: "DELETE",
      headers: headers(),
    });
    return handleResponse(res);
  };

  return { getAll, getById, create, update, remove };
};
