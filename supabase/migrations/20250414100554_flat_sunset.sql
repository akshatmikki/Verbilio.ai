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

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  joined_at timestamptz DEFAULT now()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert into waitlist
CREATE POLICY "Anyone can join waitlist" ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only allow users to read their own entries
CREATE POLICY "Users can read own entries" ON waitlist
  FOR SELECT
  TO public
  USING (email = current_setting('request.jwt.claims')::json->>'email');

-- Replace or add this:
CREATE POLICY "Public can read waitlist entries" ON waitlist
  FOR SELECT
  TO public
  USING (true);


  -- ====================================================
-- Contact Form - Schema Setup
-- ====================================================

-- 1. Create Table: contact_messages
CREATE TABLE IF NOT EXISTS contactus (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 2. Enable Row-Level Security
ALTER TABLE contactus ENABLE ROW LEVEL SECURITY;

-- 3. Policies

-- Allow anonymous users to submit a contact message
CREATE POLICY "Public can submit contact messages"
  ON contactus
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- (Optional) Allow authenticated users to insert messages as well
CREATE POLICY "Authenticated users can submit contact messages"
  ON contactus
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 1. Create Table: blog_posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  tags text[] DEFAULT '{}',             
  image_url text,                       
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- 2. Enable Row-Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 3. Policies

-- Public can view all posts (customize with a "published" flag if needed)
CREATE POLICY "Public can view posts"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (true);

-- Authenticated users can view their own posts
CREATE POLICY "Users can view own posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Authenticated users can insert their own posts
CREATE POLICY "Users can insert posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users can update their own posts
CREATE POLICY "Users can update their posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users can delete their own posts
CREATE POLICY "Users can delete their posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
