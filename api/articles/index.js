import supabase from "../lib/supabase.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      var { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return res.json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      var { title, category, content, author, featured, image_url } = req.body;

      var { data, error } = await supabase
        .from("articles")
        .insert([{ title, category, content, author, featured, image_url }])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
