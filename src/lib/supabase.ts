import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kitaomzrbrnnmzjckqmp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpdGFvbXpyYnJubm16amNrcW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MTU4MDUsImV4cCI6MjA3MDQ5MTgwNX0.MEGWYe58fM3rq7Fws94B5DhZN2LNa8z2ZnYI9jQdySI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
