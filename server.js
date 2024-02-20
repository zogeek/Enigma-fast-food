import express from "express";
const app = express();
app.use(express.json());
import BodyParser from "body-parser";
import morgan from "morgan";
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ufgsxiqbsbtyuikcbddp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmZ3N4aXFic2J0eXVpa2NiZGRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0MzQ1OTIsImV4cCI6MjAyNDAxMDU5Mn0.nd__ay1ZAkbmgmHSUMYVz-sEJ3xcPi9nNv053j0JCJQ";
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/", (req, res) => {
  res.status(403).send("Not allowed!");
});

//#region users
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: "https://example.com/welcome",
    },
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(user);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { user, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(user);
});

app.post("/logout", async (req, res) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send("Logged out");
});

app.get("/user", async (req, res) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(400).json({ error: "Not logged in" });
  }
  res.send(user);
});

//#endregion

//#region products
app.get("/products", async (req, res) => {
  const { data, error } = await supabase.from("products").select();
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.get("/products/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", req.params.id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.post("/products", async (req, res) => {
  const { data, error } = await supabase.from("products").insert([req.body]);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.put("/products/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .update(req.body)
    .eq("id", req.params.id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.delete("/products/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", req.params.id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});
//#endregion

//#region category
app.get("/category", async (req, res) => {
  const { data, error } = await supabase.from("categories").select();
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.put("/category/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("categories")
    .update(req.body)
    .eq("id", req.params.id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.post("/category", async (req, res) => {
  const { data, error } = await supabase.from("categories").insert([req.body]);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.delete("/category/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", req.params.id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.get("/category/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("categories")
    .select()
    .eq("id", req.params.id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.get("/category/:id/products", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("category_id", req.params.id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});
//#endregion

//#region orders
app.get("/orders", async (req, res) => {
  const { data, error } = await supabase.from("orders").select();
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.post("/orders", async (req, res) => {
  const { data, error } = await supabase.from("orders").insert([req.body]);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.get("/orders/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("orders")
    .select()
    .eq("id", req.params.id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.put("/orders/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("orders")
    .update(req.body)
    .eq("id", req.params.id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.delete("/orders/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("orders")
    .delete()
    .eq("id", req.params.id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});
//#endregion

//#region order_items
app.get("/order_items", async (req, res) => {
  const { data, error } = await supabase.from("order_items").select();
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.post("/order_items", async (req, res) => {
  const { data, error } = await supabase.from("order_items").insert([req.body]);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.get("/order_items/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("order_items")
    .select()
    .eq("id", req.params.id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.put("/order_items/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("order_items")
    .update(req.body)
    .eq("id", req.params.id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.delete("/order_items/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("order_items")
    .delete()
    .eq("id", req.params.id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.get("/order_items/:id/products", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", req.params.id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});
//#endregion

app.listen(3000, () => console.log(`Listening on port 3000 ...`));
