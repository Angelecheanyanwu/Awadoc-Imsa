import { create } from "zustand";

// The "in progress" notice shown when someone tries to start a booking. The booking page itself still exists at
// /book; this is the only thing the "Start booking" and "Bookings" buttons open for now.
interface InProgressState {
  open: boolean;
  show: () => void;
  hide: () => void;
}

export const useInProgressStore = create<InProgressState>((set) => ({
  open: false,
  show: () => set({ open: true }),
  hide: () => set({ open: false }),
}));
