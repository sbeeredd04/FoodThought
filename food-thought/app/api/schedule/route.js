// app/api/schedule/route.js
import fs from 'fs';
import path from 'path';

const scheduleFilePath = path.join(process.cwd(), 'app', 'schedule.json');

export async function GET(request) {
  try {
    const data = fs.readFileSync(scheduleFilePath, 'utf8');
    return new Response(data, { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to read schedule file' }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newSchedule = await request.json();
    fs.writeFileSync(scheduleFilePath, JSON.stringify(newSchedule, null, 2));
    return new Response(JSON.stringify({ message: 'Schedule updated successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update schedule file' }), { status: 500 });
  }
}
