import { Router } from "express";
import supabase from "../lib/supabase.js";

var router = Router();

router.get("/", async function (req, res) {
  try {
    var { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async function (req, res) {
  try {
    var { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: "Article not found" });
  }
});

router.post("/", async function (req, res) {
  try {
    var { title, category, content, author, featured, image_url } = req.body;

    var { data, error } = await supabase
      .from("articles")
      .insert([{ title, category, content, author, featured, image_url }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async function (req, res) {
  try {
    var { title, category, content, author, featured, image_url } = req.body;

    var { data, error } = await supabase
      .from("articles")
      .update({ title, category, content, author, featured, image_url })
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    var { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
