import type { Idea } from "@/types";
import api from "@/lib/axios";

export const fetchIdeas = async (): Promise<Idea[]> => {
  const res = await api.get('/ideas');
  return res.data;
};

export const fetchIdea = async (ideaId: string): Promise<Idea> => {
  const res = await api.get(`/ideas/${ideaId}`);
  return res.data;
};