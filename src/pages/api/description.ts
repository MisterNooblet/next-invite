import { Configuration, OpenAIApi } from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';

const configuration = new Configuration({
  apiKey: process.env.JAPETTA_API,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case 'POST':
      if (!configuration.apiKey) {
        res.status(500).json({
          error: {
            message: 'OpenAI API key not configured, please follow instructions in README.md',
          },
        });

        const name = req.body.name;
        if (name.trim().length === 0) {
          res.status(400).json({
            error: {
              message: 'Please enter a valid name',
            },
          });
          return;
        }

        return;
      }

      try {
        const completion = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: generatePrompt(req.body.name),
          temperature: 0.2,
          max_tokens: 60,
        });
        res.status(200).json({ description: completion.data.choices[0].text });
      } catch (error: OpenAiError | any) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
          console.error(error.response.status, error.response.data);
          res.status(error.response.status).json(error.response.data);
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
          res.status(500).json({
            error: {
              message: 'An error occurred during your request.',
            },
          });
        }
      }
      break;
    default:
      res.status(405).json({ error: 'Method not supported' });
      break;
  }
}

interface OpenAiError {
  response: {
    status: number;
    data: {
      error: {
        message: string;
      };
    };
  };
}

function generatePrompt(event: string) {
  const capitalizedAnimal = event[0].toUpperCase() + event.slice(1).toLowerCase();
  return `Suggest a (60 word) description for an event.
Event: Johns and janes wedding
Description: Get ready to join us for an exciting and unforgettable event! We are thrilled to invite you to celebrate Johns and janes wedding with us. We are so excited to share this special day with you!
Event: ${event}
Description:`;
}
