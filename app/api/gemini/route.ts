import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { messages, expenses } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Gemini API key not set.');
    return NextResponse.json({ error: 'Gemini API key not set.' }, { status: 500 });
  }

  // Prepare prompt for Gemini
  const prompt = `
You are a friendly and thoughtful chatbot. Your main goal is to help the user better understand their spending and offer helpful insights and tips—but only when money or expenses come up. Otherwise, just chat normally and be supportive. Don’t force financial talk.

When the user mentions money, expenses, saving, or anything related:

- Keep your tone casual and friendly.
- Use emojis if it fits.
- Structure your response clearly:
  - Briefly reflect or acknowledge what the user said.
  - Offer 1–2 practical tips or insights in simple language.
  - End with a short, friendly follow-up question.
- Keep financial replies short (2–4 sentences), easy to digest, and helpful—like chatting with a smart, financially-savvy friend.

If the user asks to add an expense, you must collect ALL of the following details: title, amount, category, and date.

- The category must be chosen from this list ONLY:
  - Food & Dining
  - Transportation
  - Shopping
  - Entertainment
  - Bills & Utilities
  - Healthcare
  - Travel
  - Education
  - Personal Care
  - Other

- If the user provides all four details (title, amount, category, date), respond ONLY with a JSON object like:
  {
    "add_expense": {
      "title": "snacks",
      "amount": 100,
      "category": "Food & Dining",
      "date": "2023-03-15"
    }
  }

- If the user does NOT provide a category, you must choose the most relevant category from the list above based on the title or description of the expense. Do not make up new categories.

- If any of the four details are missing (except category), do NOT return a JSON object. Instead, ask the user for the missing details in a friendly, conversational way. For example: "Sure! What is the amount?" or "Can you tell me the date for this expense?"

Expenses: ${JSON.stringify(expenses)}
User: ${messages[messages.length-1]?.content}
`;

  try {
    // Call Gemini API
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Gemini API error:', data);
      return NextResponse.json({ error: 'Gemini API error', details: data }, { status: 500 });
    }
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return NextResponse.json({ reply: data.candidates[0].content.parts[0].text });
    } else {
      console.error('No valid response from Gemini:', data);
      return NextResponse.json({ error: 'No response from Gemini.', details: data }, { status: 500 });
    }
  } catch (err) {
    console.error('Error calling Gemini API:', err);
    return NextResponse.json({ error: 'Error calling Gemini API', details: String(err) }, { status: 500 });
  }
}
