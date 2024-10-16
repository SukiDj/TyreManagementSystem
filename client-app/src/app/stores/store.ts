import { createContext, useContext } from "react";
import userStore from "./userStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import BusinessUnitStore from "./businessUnitStore";

interface Store{
    commonStore : CommonStore;
    modalStore: ModalStore;
    userStore: userStore;
    businessUnitStore: BusinessUnitStore;
}

export const store: Store = {
    commonStore : new CommonStore(),
    modalStore: new ModalStore(),
    userStore: new userStore(),
    businessUnitStore: new BusinessUnitStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}