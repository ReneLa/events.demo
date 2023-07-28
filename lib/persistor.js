import { persistStore } from "redux-persist";
import { store } from "../redux/store";

export const clearPersistedStorage = async () => {
  const persistor = persistStore(store);
  await persistor.purge();
};
