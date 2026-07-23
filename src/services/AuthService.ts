//import { supabase } from "../config/supabase";


  /*   static async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({email,password,});
    if (error) {
      throw error;
    }
    return data;
  }

  static async logout() {
    await supabase.auth.signOut();
  }

  static async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  static async isAuthenticated() {
    const session = await this.getSession();
    return !!session;
  }
*/

  const API_URL = "http://localhost:3000";

  export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return response.json();
  };

