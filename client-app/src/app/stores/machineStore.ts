import { makeAutoObservable } from 'mobx';
import { Tyre } from '../models/tyre';
import agent from '../../api/agent';

export default class tyreStore {
  machineRegistry = new Map<string, Tyre>();
  loadingInitial = false;


  constructor(){
    makeAutoObservable(this);
}
setLoadingInitial = (state: boolean) =>{
    this.loadingInitial = state;
}

setTyre = (tyre: Tyre) => {
    this.machineRegistry.set(tyre.code, tyre);
}
loadTyres = async () => {
    this.setLoadingInitial(true);
    try {
        const tyres :Tyre[] = await agent.Tyres.getTyres();
        
        tyres.forEach(tyre => {
                this.setTyre(tyre);
            });
            this.setLoadingInitial(false);
            
    } catch (error) {
        console.log(error);
       
            this.setLoadingInitial(false);
        
    }
}
get tyreOptions() {
    return Array.from(this.machineRegistry.values()).map((tyre) => ({
      key: tyre.code,      // Unique key
      text: tyre.code,     // Displayed in the dropdown
      value: tyre.code,    // Value to be selected
    }));
  }
}
