import { todo } from "../interface/todo";

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: {
        text?: string;
      }[];
    };
  }[];
}

/**
 * Converts user input text into structured tasks using Google Gemini API
 * Returns null if the input is just generic conversation (hello, thanks, etc.)
 */
export async function convertTextToTasks(text: string): Promise<todo[] | null> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file');
    }

    const prompt = `You are an AI assistant that converts user input into actionable tasks. 

IMPORTANT RULES:
1. If the input is just a greeting (hello, hi, hey), generic conversation, or not task-related, return exactly: {"tasks": null}
2. Only create tasks if the input contains actionable items, work to be done, or to-do items
3. Extract multiple tasks if mentioned
4. Generate appropriate categories based on task type (e.g., "Development", "Design", "Marketing", "Personal", "Work", "Meeting")
5. Set realistic priorities based on urgency words (urgent=high, soon=medium, otherwise=low)
6. Set status as "pending" for new tasks
7. Generate IDs using timestamps

INPUT TEXT: "${text}"

Return a JSON object with this exact structure:
{
  "tasks": [
    {
      "id": "unique_id_here",
      "title": "Short task title",
      "description": "Detailed description",
      "category": "Appropriate category",
      "status": "pending",
      "priority": "low|medium|high",
      "dueDate": "YYYY-MM-DD format if mentioned, otherwise null",
      "createdAt": "current ISO date",
      "comments": "0"
    }
  ]
}

If no actionable tasks detected, return: {"tasks": null}

Return ONLY valid JSON, no markdown, no explanation.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 2048,
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate tasks');
    }

    const data: GeminiResponse = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    if (!generatedText) {
      throw new Error('No response from Gemini');
    }

    // Clean up the response - remove markdown code blocks if present
    let cleanedText = generatedText.trim();
    cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    // Parse JSON response
    const parsed = JSON.parse(cleanedText);
    
    // If Gemini determined this isn't a task, return null
    if (parsed.tasks === null) {
      return null;
    }

    // Validate and return tasks
    if (Array.isArray(parsed.tasks) && parsed.tasks.length > 0) {
      // Ensure each task has required fields
      const validTasks = parsed.tasks.map((task: any) => ({
        id: task.id || `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: task.title || 'Untitled Task',
        description: task.description || '',
        category: task.category || 'General',
        status: task.status || 'pending',
        priority: task.priority || 'medium',
        dueDate: task.dueDate || undefined,
        createdAt: task.createdAt || new Date().toISOString(),
        comments: task.comments || '0',
        updatedAt: new Date().toISOString()
      })) as todo[];

      return validTasks;
    }

    return null;
  } catch (error) {
    console.error('Error converting text to tasks:', error);
    throw error;
  }
}
