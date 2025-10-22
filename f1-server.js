const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();

const supaUrl = 'https://bbutseotcterrdjqznrt.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJidXRzZW90Y3RlcnJkanF6bnJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5OTMzNzUsImV4cCI6MjA3NjU2OTM3NX0.QK9kW10YS2IoB3TqkXwCiRGZKFnwz0Nmw_Cn4AnGlHI';

const supabase = supa.createClient(supaUrl, supaAnonKey); 