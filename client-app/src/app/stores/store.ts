import { createContext, useContext } from "react";
import userStore from "./userStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import RecordStore from "./productionRecordStore";

interface Store{
    commonStore : CommonStore;
    modalStore: ModalStore;
    userStore: userStore;
    recordStore: RecordStore
}

export const store: Store = {
    commonStore : new CommonStore(),
    modalStore: new ModalStore(),
    userStore: new userStore(),
    recordStore: new RecordStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}