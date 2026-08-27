import 'dotenv/config';
import fs from 'fs/promises';
import pg from 'pg';
const {Pool}=pg;
const useSSL=process.env.DATABASE_SSL==='true' || process.env.DATABASE_URL?.includes('sslmode=require');
const pool=new Pool({connectionString:process.env.DATABASE_URL,ssl:useSSL?{rejectUnauthorized:false}:undefined});
const sql=await fs.readFile(new URL('../sql/schema.sql',import.meta.url),'utf8');
try { await pool.query(sql); console.log('Database schema is ready.'); }
finally { await pool.end(); }
