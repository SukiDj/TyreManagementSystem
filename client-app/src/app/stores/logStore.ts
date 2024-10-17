import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../../api/agent'; // Vaš API agent za HTTP zahteve

export default class LogStore {
    logs: string[] = []; // Lista logova
    loadingLogs = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadLogs = async (): Promise<string[]> => {
        try {
            const logs = await agent.Logs.list(); // Pretpostavka da je ovo asinkroni poziv ka API-u
            runInAction(() => {
                this.logs = logs; // Postavljanje stanja u MobX
            });
            return logs; // Vraćanje niza logova
        } catch (error) {
            console.error("Failed to load logs", error);
            return []; // Vraća prazan niz u slučaju greške
        }
    }
    
}
