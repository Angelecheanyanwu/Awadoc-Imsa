import type { Metadata } from "next";
import BookingFlow from "@/components/BookingFlow";

export const metadata: Metadata = {
  title: "Book | AwaDoc Genomics",
  description: "Book counselling and procedures for your couple, in six steps.",
};

export default function BookPage() {
  return <BookingFlow />;
}
