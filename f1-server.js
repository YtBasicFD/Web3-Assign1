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

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

app.get("/api/circuits/:ref", async (req, res) => {
  const { ref } = req.params;
  const { data, error } = await supabase
  .from("circuits")
  .select("*")
  .eq("circuitRef", ref)
  .single();

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

app.get("/api/circuits/season/:year", async (req, res) => {
  const { year } = req.params;
  const { data, error } = await supabase
    .from("races")
    .select("round, circuits!inner(*)")
    .eq("year", year)
    .order("round", { ascending: true });

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

//constructors api
app.get("/api/constructors", async (req, res) => {
  const { data, error } = await supabase
  .from("constructors")
  .select("*");

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

app.get("/api/constructors/:ref", async (req, res) => {
  const { ref } = req.params;
  const { data, error } = await supabase
  .from("constructors")
  .select("*")
  .eq("constructorRef", ref)
  .single();

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

//drivers api
app.get("/api/drivers", async (req, res) => {
  const { data, error } = await supabase
  .from("drivers")
  .select("*");

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

app.get("/api/drivers/:ref", async (req, res) => {
  const { ref } = req.params;
  const { data, error } = await supabase
  .from("drivers")
  .select("*")
  .eq("driverRef", ref)
  .single();

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

app.get("/api/drivers/search/:substring", async (req, res) => {
  const { substring } = req.params;
  const { data, error } = await supabase
    .from("drivers")
    .select("*")
    .ilike("surname", `${substring}%`);

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

app.get("/api/drivers/race/:raceId", async (req, res) => {
  const { raceId } = req.params;
  const { data, error } = await supabase
    .from("results")
    .select("drivers!inner(*)")
    .eq("raceId", raceId);

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

//races api
app.get("/api/races/:raceId", async (req, res) => {
  const { raceId } = req.params;
  const { data, error } = await supabase
    .from("races")
    .select("*, circuits!inner(name, location, country)")
    .eq("raceId", raceId)
    .single();

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

app.get("/api/races/season/:year", async (req, res) => {
  const { year } = req.params;
  const { data, error } = await supabase
    .from("races")
    .select("*")
    .eq("year", year)
    .order("round", { ascending: true });

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

app.get("/api/races/season/:year/:round", async (req, res) => {
  const { year, round } = req.params;
  const { data, error } = await supabase
    .from("races")
    .select("*")
    .eq("year", year)
    .eq("round", round)
    .single();

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

app.get("/api/races/circuits/:ref", async (req, res) => {
  const { ref } = req.params;
  const { data, error } = await supabase
    .from("races")
    .select("*, circuits!inner(circuitRef)")
    .eq("circuits.circuitRef", ref)
    .order("year", { ascending: true });

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

app.get("/api/races/circuits/:ref/season/:start/:end", async (req, res) => {
  const { ref, start, end } = req.params;
  const { data, error } = await supabase
    .from("races")
    .select("*, circuits!inner(circuitRef)")
    .eq("circuits.circuitRef", ref)
    .gte("year", start)
    .lte("year", end)
    .order("year", { ascending: true });

  if (error) {
    return res.json({ error: 'Data not found' });
  } else if (start > end) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

//results api
app.get("/api/results/:raceId", async (req, res) => {
  const { raceId } = req.params;
  const { data, error } = await supabase
    .from("results")
    .select(`grid, position, time, points,
      drivers!inner(driverRef, code, forename, surname),
      races!inner(name, round, year, date),
      constructors!inner(name, constructorRef, nationality)
    `)
    .eq("raceId", raceId)
    .order("grid", { ascending: true });

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

app.get("/api/results/drivers/:ref", async (req, res) => {
  const { ref } = req.params;
  const { data, error } = await supabase
    .from("results")
    .select("*, drivers!inner (driverRef, forename, surname)")
    .eq("drivers.driverRef", ref);

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

app.get("/api/results/drivers/:ref/seasons/:start/:end", async (req, res) => {
  const { ref, start, end } = req.params;
  const { data, error } = await supabase
    .from("results")
    .select("*, drivers!inner (driverRef, forename, surname), races!inner(year)")
    .eq("drivers.driverRef", ref)
    .gte("races.year", start)
    .lte("races.year", end);

  if (error) {
    return res.json({ error: 'Data not found' });
  } else if (start > end) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

//qualifying api
app.get("/api/qualifying/:raceId", async (req, res) => {
  const { raceId } = req.params;
  const { data, error } = await supabase
    .from("qualifying")
    .select(`position, q1, q2, q3, drivers!inner(driverRef, forename, surname), constructors!inner(constructorRef, name, nationality)`)
    .eq("raceId", raceId)
    .order("position", { ascending: true });

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

//standings api
app.get("/api/standings/drivers/:raceId", async (req, res) => {
  const { raceId } = req.params;
  const { data, error } = await supabase
    .from("drivers_standings")
    .select(`position, points, wins, drivers!inner(driverRef, code, forename, surname)`)
    .eq("raceId", raceId)
    .order("position", { ascending: true });

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

app.get("/api/standings/constructors/:raceId", async (req, res) => {
  const { raceId } = req.params;
  const { data, error } = await supabase
    .from("constructor_standings")
    .select(`position, points, wins, constructors!inner(constructorRef, name, nationality)`)
    .eq("raceId", raceId)
    .order("position", { ascending: true });

  if (error) {
    return res.json({ error: 'Data not found' });
  };

  res.json(data);
});

app.listen(10000);