import { createContext, useContext } from "react";
import userStore from "./userStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";

interface Store{
    commonStore : CommonStore;
    modalStore: ModalStore;
    userStore: userStore;
}

export const store: Store = {
    commonStore : new CommonStore(),
    modalStore: new ModalStore(),
    userStore: new userStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}