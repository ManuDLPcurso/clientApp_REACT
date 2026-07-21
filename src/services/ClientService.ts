import { url } from '../config/supabase';
import { ClientInterface } from '../interfaces/ClientInterface';



export class ClientService {

    /* static async getClients(){
        const {data, error} = await supabase
        .from("clients")
        .select("*")
        .order("id",{
        ascending:true
        })

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
     } */

        static async getClients(){
            const res = await fetch ('http://localhost:3000/clients')
            return await res.json();
        }

    
        static async createClient(client:ClientInterface) {
        const res =await fetch('http://localhost:3000/clients/add-clients',
            {
            method:'POST',
            headers: {'Content-Type':'application/json'
            },
            body:
            JSON.stringify(client)
            }
            );
            return await res.json();
            }

        static async updateClient(_id:string,client:ClientInterface) {
            await fetch(
            `http://localhost:3000/clients/edit-client/${_id}`,
            {
                method:'PUT',
                headers: {
                'Content-Type':
                'application/json'
                },
                body:
                JSON.stringify(client)
            }
        );
        }

        static async deleteClient(
_id:string
) {
await fetch(
`http://localhost:3000/clients/edit-client/:_id`,
{
method:'DELETE'
}
);
}

}
