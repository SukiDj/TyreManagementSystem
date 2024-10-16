export interface ProductionRecord {
    id: string;
    tyreCode: string;
    quantityProduced: number;
    operatorID: string;
    productionDate: Date | null;
    productionShift: number;
    machineNumber: number;
}

export class ProductionRecord implements ProductionRecord {
    constructor(init?: RecordFromValues) {
        Object.assign(this, init);
    }
}

export class RecordFromValues {
    id?: string = undefined;
    tyreCode: string = '';
    quantityProduced: number = 0;
    operatorID: string = '';
    productionDate: Date | null = null;
    productionShift: number = 0;
    machineNumber: number = 0;

    constructor(record?: RecordFromValues) {
        if (record) {
            this.id = record.id;
            this.tyreCode = record.tyreCode;
            this.quantityProduced = record.quantityProduced;
            this.operatorID = record.operatorID;
            this.productionDate = record.productionDate;
            this.productionShift = record.productionShift;
            this.machineNumber = record.machineNumber;
        }
    }
}
