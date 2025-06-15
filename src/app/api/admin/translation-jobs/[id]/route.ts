import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const TRANSLATION_JOBS_FILE = path.join(process.cwd(), 'data', 'translation-jobs.json');

// Load translation jobs from file
async function loadTranslationJobs() {
  try {
    const data = await fs.readFile(TRANSLATION_JOBS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// GET - Retrieve specific translation job
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jobs = await loadTranslationJobs();
    
    const job = jobs.find((j: any) => j.id === id);
    if (!job) {
      return NextResponse.json({ error: 'Translation job not found' }, { status: 404 });
    }
    
    return NextResponse.json(job);
  } catch (error) {
    console.error('Error loading translation job:', error);
    return NextResponse.json({ error: 'Failed to load translation job' }, { status: 500 });
  }
}