// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

let lastTopic = '';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // ✅ Fetch DB
    const profile = await prisma.profile.findFirst();

    if (!profile) {
      return NextResponse.json(
        { reply: "No profile data found in database." },
        { status: 200 }
      );
    }

    // ✅ Safe parsing
    const skills =
      Array.isArray(profile.skills)
        ? profile.skills.join(', ')
        : typeof profile.skills === 'string'
        ? profile.skills
        : '';

    const projects =
      Array.isArray(profile.projects)
        ? profile.projects.join(', ')
        : typeof profile.projects === 'string'
        ? profile.projects
        : '';

    const education =
      typeof profile.education === 'string'
        ? profile.education
        : JSON.stringify(profile.education);

    const dbData = `
Role: ${profile.role ?? ''}
Company: ${profile.company ?? ''}
Experience: ${profile.experience ?? ''}
Skills: ${skills}
Projects: ${projects}
Education: ${education}
`;

    // 🧠 User message
    const userMessage =
      messages[messages.length - 1]?.content?.toLowerCase() || '';

    // 🔥 Detect topic
    let intent = '';

    if (userMessage.includes('skill')) intent = 'skills';
    else if (userMessage.includes('project')) intent = 'projects';
    else if (userMessage.includes('experience')) intent = 'experience';
    else if (userMessage.includes('education')) intent = 'education';

    if (intent) lastTopic = intent;

    // 🔥 Detect generic queries
    const isGeneric =
      userMessage.includes('about') ||
      userMessage.includes('what') ||
      userMessage.includes('who') ||
      userMessage.includes('tell') ||
      userMessage.includes('explain');

    // ✅ FINAL POWERFUL PROMPT
    const systemPrompt = `
You are Latha's intelligent portfolio assistant.

DATABASE DATA:
${dbData}

USER CONTEXT:
Last Topic: ${lastTopic}
Generic Question: ${isGeneric}

STRICT RULES:
- Answer ONLY using the database data
- DO NOT add any false or external information
- You CAN explain GENERICALLY using known meanings (React = frontend, GIS = mapping, dashboard = visualization)
- If question is broad (like "tell me about her"):
   → Combine role, skills, experience, and projects into a meaningful answer
- If question is about projects:
   → Explain projects in a general, meaningful way based on their names
- If question is vague:
   → Use lastTopic
- Keep answers natural, slightly descriptive, and human-like
- If unrelated:
   → "You can ask me about skills, projects, experience, or education 😊"
`;

    // ✅ OpenAI call
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-6),
        ],
        temperature: 0.5, // more natural responses
        max_tokens: 400,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'OpenAI error' },
        { status: response.status }
      );
    }

    let reply =
      data.choices?.[0]?.message?.content ||
      'You can ask me about skills, projects, or experience 😊';

    // 🔥 Safety fallback
    if (
      reply.toLowerCase().includes("i don't have that information") ||
      reply.length < 5
    ) {
      reply =
        "You can ask me about skills, projects, experience, or education 😊";
    }

    return NextResponse.json({ reply });

  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}