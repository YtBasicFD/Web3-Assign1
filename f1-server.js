const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();

const supaUrl = 'https://bbutseotcterrdjqznrt.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJidXRzZW90Y3RlcnJkanF6bnJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5OTMzNzUsImV4cCI6MjA3NjU2OTM3NX0.QK9kW10YS2IoB3TqkXwCiRGZKFnwz0Nmw_Cn4AnGlHI';

const supabase = supa.createClient(supaUrl, supaAnonKey);

app.use(express.json());

//circuits api
app.get("/api/circuits", async (req, res) => {
  const { data, error } = await supabase
  .from("circuits")
  .select("*");

  res.json(data);
});

app.get("/api/circuits/:ref", async (req, res) => {
  const { ref } = req.params;
  const { data, error } = await supabase
  .from("circuits")
  .select("*")
  .eq("circuitRef", ref)
  .single();

  res.json(data);
});

app.get("/api/circuits/season/:year", async (req, res) => {
  const { year } = req.params;
  const { data, error } = await supabase
    .from("races")
    .select("round, circuits!inner(*)")
    .eq("year", year)
    .order("round", { ascending: true });

  res.json(data);
});

//constructors api
app.get("/api/constructors", async (req, res) => {
  const { data, error } = await supabase
  .from("constructors")
  .select("*");

  res.json(data);
});

app.get("/api/constructors/:ref", async (req, res) => {
  const { ref } = req.params;
  const { data, error } = await supabase
  .from("constructors")
  .select("*")
  .eq("constructorRef", ref)
  .single();

  res.json(data);
});

//drivers api
app.get("/api/drivers", async (req, res) => {
  const { data, error } = await supabase
  .from("drivers")
  .select("*");

  res.json(data);
});

app.get("/api/drivers/:ref", async (req, res) => {
  const { ref } = req.params;
  const { data, error } = await supabase
  .from("drivers")
  .select("*")
  .eq("driverRef", ref)
  .single();

  res.json(data);
});

app.get("/api/drivers/search/:substring", async (req, res) => {
  const { substring } = req.params;
  const { data, error } = await supabase
    .from("drivers")
    .select("*")
    .ilike("surname", `${substring}%`);

  res.json(data);
});

app.get("/api/drivers/race/:raceId", async (req, res) => {
  const { raceId } = req.params;
  const { data, error } = await supabase
    .from("results")
    .select("drivers!inner(*)")
    .eq("raceId", raceId);

  res.json(data);
});