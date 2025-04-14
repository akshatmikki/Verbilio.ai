/*
  # Initial schema setup for waitlist application

  1. New Tables
    - `waitlist_entries`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `waitlist_entries` table
    - Add policies for:
      - Users can read their own entries
      - Users can insert their own entries
*/

CREATE TABLE IF NOT EXISTS waitlist_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own entries"
  ON waitlist_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own entries"
  ON waitlist_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public can insert entries"
  ON waitlist_entries
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);