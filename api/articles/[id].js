import supabase from "../lib/supabase.js";

export default async function handler(req, res) {
  var { id } = req.query;

  if (req.method === "GET") {
    try {
      var { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return res.json(data);
    } catch (err) {
      return res.status(404).json({ error: "Article not found" });
    }
  }

  if (req.method === "PUT") {
    try {
      var { title, category, content, author, featured, image_url } = req.body;

      var { data, error } = await supabase
        .from("articles")
        .update({ title, category, content, author, featured, image_url })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return res.json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      var { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
