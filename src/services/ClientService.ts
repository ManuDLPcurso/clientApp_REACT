import { supabase } from '../config/supabase';
import { ClientInterface } from '../interfaces/ClientInterface';


export class ClientService {

    static async getClients(){
        const {data, error} = await supabase
        .from("clients")
        .select("*");

        if(error) {
            throw error;
        }

        return data;
    }

    static async addClient(client:ClientInterface){
        await supabase
        .from("clients")
        .insert([client])
    }


    static async getClient(id:number){
        const {data, error} = await supabase
        .from("clients")
        .select("*")
        .eq("id", id)
        .single();

        if(error){
            throw error;
        }  
        return data;
     }

     static async updateClient(id:Number, client:ClientInterface){
        const {error} = await supabase
        .from ("clients")
        .update(client)
        .eq("id",id)

        if (error){
            throw error
        }

     }
    static async deleteClient (id:Number){
        const {error} = await supabase
        .from ("clients")
        .delete()
        .eq("id",id);
        
        if (error){
            throw error
        }
     }
  

}