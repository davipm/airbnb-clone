"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import ListingCard from "@/components/listings/listing-card";
import { SafeListing, SessionInterface } from "@/types";

interface Props {
  listings: SafeListing[];
  currentUser?: SessionInterface | null;
}

export default function PropertiesContainer({ listings, currentUser }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const { mutate } = useMutation({
    mutationFn: (listingId: string) => {
      setDeletingId(listingId);
      return axios.delete(`/api/listings/${listingId}`);
    },
    onSuccess: () => {
      toast.success("Listing deleted");
      router.refresh();
    },
    onError: () => {
      toast.error("Error");
    },
  });

  return (
    <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
      {listings.map((item) => (
        <ListingCard
          key={item.id}
          data={item}
          actionId={item.id}
          onAction={mutate}
          disabled={deletingId === item.id}
          actionLabel="Delete property"
          currentUser={currentUser}
        />
      ))}
    </section>
  );
}
