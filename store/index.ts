import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface LoginSlice {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
}

interface RegisterSlice {
  isRegisterOpen: boolean;
  openRegister: () => void;
  closeRegister: () => void;
}

interface RentSlice {
  isRentOpen: boolean;
  openRent: () => void;
  closeRent: () => void;
}

interface SearchSlice {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const createLoginSlice: StateCreator<LoginSlice> = (set) => ({
  isLoginOpen: false,
  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),
});

const createRegisterSlice: StateCreator<RegisterSlice> = (set) => ({
  isRegisterOpen: false,
  openRegister: () => set({ isRegisterOpen: true }),
  closeRegister: () => set({ isRegisterOpen: false }),
});

const createRentSlice: StateCreator<RentSlice> = (set) => ({
  isRentOpen: false,
  openRent: () => set({ isRentOpen: true }),
  closeRent: () => set({ isRentOpen: false }),
});

const createSearchSlice: StateCreator<SearchSlice> = (set) => ({
  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
});

export const useModalStore = create<
  LoginSlice & RegisterSlice & RentSlice & SearchSlice
>()(
  devtools((...a) => ({
    ...createLoginSlice(...a),
    ...createRegisterSlice(...a),
    ...createRentSlice(...a),
    ...createSearchSlice(...a),
  })),
);
