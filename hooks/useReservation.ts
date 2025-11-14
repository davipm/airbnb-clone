import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export function useReservation() {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const { mutate } = useMutation({
    mutationFn: (id: string) => {
      setDeletingId(id);
      return axios.delete(`/api/reservations/${id}`);
    },
    onSuccess: () => {
      toast.success("Reservation cancelled");
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  return { mutate, deletingId };
}
