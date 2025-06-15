import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const TRANSLATION_JOBS_FILE = path.join(process.cwd(), 'data', 'translation-jobs.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Load translation jobs from file
async function loadTranslationJobs() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(TRANSLATION_JOBS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist, return empty array
    return [];
  }
}

// Save translation jobs to file
async function saveTranslationJobs(jobs: any[]) {
  await ensureDataDir();
  await fs.writeFile(TRANSLATION_JOBS_FILE, JSON.stringify(jobs, null, 2));
}

// GET - Retrieve all translation jobs
export async function GET() {
  try {
    const jobs = await loadTranslationJobs();
    // Sort by most recent first
    jobs.sort((a: any, b: any) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error loading translation jobs:', error);
    return NextResponse.json({ error: 'Failed to load translation jobs' }, { status: 500 });
  }
}