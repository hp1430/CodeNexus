import { executionService } from '../services/executionService.js';

export const executeCode = async (req, res) => {
  try {
    const { roomId, language, code } = req.body;
    if (!roomId || !language || !code) {
      return res.status(400).json({
        success: false,
        message: 'roomId, language and code are required'
      });
    }

    const result = await executionService({
      roomId,
      language,
      code
    });
    return res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
