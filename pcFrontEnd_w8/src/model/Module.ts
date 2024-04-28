
export interface Activity {
    id: number;
    name: string;
    tips: string;
    outcome: string;
    module_id?: number;
    module_id_1?: number;
    introduction: string;
    
}

export interface Module {
    id: number;
    name: string;

    activities?: Activity[];
}

export interface ExpandedState {
    moduleId: number;
    isExpanded: boolean;
  }
//A new type for mapping modules to their corresponding activities.
export interface ModuleWithActivities {
    module: Module; // The Module interface you previously defined
    activities: Activity[]; // The Activity interface you defined earlier
}
