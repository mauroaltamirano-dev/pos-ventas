import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useSuppliersClientsStore } from "./SuppliersClientsStore";

const initialState = {
  items: [],
  total: 0,
  statePayment: false,
  typePayment: "",
};

const calcWithoutTax = (items) => {
  return items.reduce(
    (acc, item) => acc + item._sale_price * item._quantity,
    0
  );
};

const calcTotal = (items) => {
  return items.reduce(
    (acc, item) => acc + item._sale_price * item._quantity,
    0
  );
};

export const useSalesCartStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      addItem: (p) => {
        set((state) => {
          const exists = state.items.find(
            (item) => item._id_product === p._id_product
          );

          let updatedItems;

          if (exists) {
            updatedItems = state.items.map((item) => {
              if (item._id_product === p._id_product) {
                return { ...item, _quantity: item._quantity + 1 };
              }
              return item;
            });
          } else {
            updatedItems = [...state.items, p];
          }

          const updatedTotal = calcTotal(updatedItems);

          return {
            items: updatedItems,
            total: updatedTotal,
          };
        });
      },

      removeItem: (p) => {
        set((state) => {
          const updatedItems = state.items.filter(
            (item) => item._id_product !== p._id_product
          );

          const updatedTotal = calcTotal(updatedItems);

          return {
            items: updatedItems,
            total: updatedTotal,
          };
        });
      },

      addQuantityItem: (p) => {
        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item._id_product === p._id_product) {
              return { ...item, _quantity: item._quantity + 1 };
            }
            return item;
          });

          const updatedTotal = calcTotal(updatedItems);

          return {
            items: updatedItems,
            total: updatedTotal,
          };
        });
      },

      removeQuantityItem: (p) => {
        set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item._id_product === p._id_product) {
                const newQty = item._quantity - 1;
                if (newQty <= 0) return null;
                return { ...item, _quantity: newQty };
              }
              return item;
            })
            .filter(Boolean);

          const updatedTotal = calcTotal(updatedItems);

          return {
            items: updatedItems,
            total: updatedTotal,
          };
        });
      },

      resetState: () => {
        const { selectSuppliersClients } = useSuppliersClientsStore.getState();
        selectSuppliersClients([]);
        set(initialState);
      },

      setStatePayment: (p) => {
        set((state) => {
          if (state.items.length === 0) {
            toast.warning("No hay productos agregados.");
            return state;
          } else {
            return {
              statePayment: !state.statePayment,
              typePayment: p.typePayment,
            };
          }
        });
      },
    }),
    { name: "cart_sales_storage" }
  )
);
