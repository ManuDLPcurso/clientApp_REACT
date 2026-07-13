import { supabase } from '../config/supabase';
import { ClientInterface } from '../interfaces/ClientInterface';


export class ClientService {

    static async obtClients(){
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





}