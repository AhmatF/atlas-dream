import postgres from 'postgres';

const DATABASE_URL = 'postgresql://postgres:Rz7z3%21%2Bp.W%23YFKZ@db.zbywcmcsktsjyithyvre.supabase.co:5432/postgres';

const sql = postgres(DATABASE_URL);

async function cleanDatabase() {
  try {
    console.log('🧹 Cleaning Supabase database...\n');

    // Drop schema
    await sql`DROP SCHEMA IF EXISTS public CASCADE`;
    console.log('✓ Dropped public schema');

    // Recreate schema
    await sql`CREATE SCHEMA public`;
    console.log('✓ Created public schema');

    // Grant permissions
    await sql`GRANT ALL ON SCHEMA public TO postgres`;
    await sql`GRANT ALL ON SCHEMA public TO public`;
    console.log('✓ Granted permissions');

    console.log('\n✅ Database cleaned successfully!');
    console.log('All tables have been dropped and schema recreated.');
    console.log('👉 Restart your dev server to run fresh migrations.\n');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
  } finally {
    await sql.end();
  }
}

cleanDatabase();
