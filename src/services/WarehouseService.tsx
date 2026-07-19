import { supabase } from '../config/supabase'
import { WarehouseInterface } from '../interfaces/WarehouseInterface'


export class WarehouseService{

    static async getWarehouses(){
        const {data, error} = await supabase
        .from ('warehouses')
        .select("*")
        .order("id" ,{ascending:true});

        if(error){
            throw error;
        }

        return(data);
    }
//---------------------------------------------------------------------------

    static async addWarehouse(warehouse:WarehouseInterface){
        await supabase
        .from ('warehouses')
        .insert([warehouse])
    }
//---------------------------------------------------------------------------

    static async getWarehouse(id:number){
        const {data, error} = await supabase
        .from('warehouses')
        .select("*")
        .eq("id",id)
        .single();

        if(error){
            throw error
        }

        return data
    }
//---------------------------------------------------------------------------

    static async updateWarehouse(id:Number, warehouse:WarehouseInterface){
        const {error} = await supabase
        .from ('warehouses')
        .update(warehouse)
        .eq("id",id)

        if (error){
            throw error
        }
    }
//---------------------------------------------------------------------------

    static async deleteWarehouse(id:Number){
        const {error} = await supabase
        .from('warehouses')
        .delete()
        .eq("id",id);

        if(error){
            throw error
        }
    }



}//Cierre Class