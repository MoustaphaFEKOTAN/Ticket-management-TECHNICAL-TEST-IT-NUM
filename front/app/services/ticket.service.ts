import { useAuthStore } from "~/stores/auth";

export const useTicketService = () => {
  const config = useRuntimeConfig();
  const base = config.public.apiBase;
  const auth = useAuthStore();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.token}`,
  };

  const getAll = async () => {
    const res = await fetch(`${base}/api/tickets`, { headers });
    if (!res.ok) throw new Error("Impossible de récupérer les tickets");
    return res.json();
  };

  const getById = async (id: number) => {
    const res = await fetch(`${base}/api/tickets/${id}`, { headers });
    if (!res.ok) throw new Error("lE Ticket est introuvable");
    return res.json();
  };

  const create = async (title: string, description: string) => {
    const res = await fetch(`${base}/api/tickets`, {
      method: "POST",
      headers,
      body: JSON.stringify({ title, description }),
    });
    if (!res.ok)
      throw new Error(
        "Erreur lors de la création du ticket, veuillez réessayer",
      );
    return res.json();
  };

  const update = async (id: number, data: object) => {
    const res = await fetch(`${base}/api/tickets/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok)
      throw new Error(
        "Erreur lors de la mise à jour du ticket, veuillez réessayer",
      );
    return res.json();
  };

  const remove = async (id: number) => {
    const res = await fetch(`${base}/api/tickets/${id}`, {
      method: "DELETE",
      headers,
    });
    if (!res.ok)
      throw new Error(
        "Erreur lors de la suppression du ticket, veuillez réessayer",
      );
  };

  return { getAll, getById, create, update, remove };
};
