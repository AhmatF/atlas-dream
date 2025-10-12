-- Cleanup script for Supabase database
-- This will drop all Payload CMS tables to allow a clean migration

-- Drop all tables in reverse order (respecting foreign keys)
DROP TABLE IF EXISTS "payload_locked_documents_rels" CASCADE;
DROP TABLE IF EXISTS "payload_locked_documents" CASCADE;
DROP TABLE IF EXISTS "payload_preferences_rels" CASCADE;
DROP TABLE IF EXISTS "payload_preferences" CASCADE;
DROP TABLE IF EXISTS "payload_migrations" CASCADE;
DROP TABLE IF EXISTS "leads" CASCADE;
DROP TABLE IF EXISTS "pages_locales" CASCADE;
DROP TABLE IF EXISTS "pages" CASCADE;
DROP TABLE IF EXISTS "blog_posts_locales" CASCADE;
DROP TABLE IF EXISTS "blog_posts" CASCADE;
DROP TABLE IF EXISTS "concierge_ala_carte_locales" CASCADE;
DROP TABLE IF EXISTS "concierge_ala_carte" CASCADE;
DROP TABLE IF EXISTS "concierge_packs_locales" CASCADE;
DROP TABLE IF EXISTS "concierge_packs" CASCADE;
DROP TABLE IF EXISTS "villas_locales" CASCADE;
DROP TABLE IF EXISTS "villas" CASCADE;
DROP TABLE IF EXISTS "cars_locales" CASCADE;
DROP TABLE IF EXISTS "cars" CASCADE;
DROP TABLE IF EXISTS "media" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;

-- Done
SELECT 'Database cleaned successfully' as message;
