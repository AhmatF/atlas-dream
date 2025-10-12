const postgres = require('postgres');

const sql = postgres(process.env.DATABASE_URL, {
  max: 1,
  connection: {
    application_name: 'cleanup'
  }
});

async function cleanDatabase() {
  try {
    console.log('🧹 Cleaning Supabase database...\n');

    // Drop all tables in one query
    const dropQuery = `
      DROP TABLE IF EXISTS
        payload_locked_documents_rels,
        payload_locked_documents,
        payload_preferences_rels,
        payload_preferences,
        payload_migrations,
        leads,
        pages_locales,
        pages,
        blog_posts_locales,
        blog_posts,
        concierge_ala_carte_locales,
        concierge_ala_carte,
        concierge_packs_locales,
        concierge_packs,
        villas_locales,
        villas,
        cars_locales,
        cars,
        media,
        users
      CASCADE;
    `;

    await sql.unsafe(dropQuery);
    console.log('✅ All tables dropped successfully!');
    console.log('👉 Restart your dev server to run fresh migrations.\n');

  } catch (error) {
    console.error('❌ Error cleaning database:', error.message);
  } finally {
    await sql.end();
    process.exit(0);
  }
}

cleanDatabase();
