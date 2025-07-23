import { RequestHandler } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

import dotenv from 'dotenv';
dotenv.config();

const upload = multer({ dest: 'uploads/' });

// Helper: Analyze audio (stub, expand as needed)
async function analyzeAudio(audioPath: string) {
  // Integrate OpenSMILE, AssemblyAI, etc. for real analysis
  return {
    tone: 'neutral',
    pitch: 120,
    mood: 'happy',
    sentiment: 'positive',
    language: 'en',
  };
}

// Helper: ElevenLabs STT
async function elevenLabsSTT(audioPath: string) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const formData = new FormData();
  formData.append('file', fs.createReadStream(audioPath));
  formData.append('model_id', 'scribe_v1_experimental');
  formData.append('num_speakers', '1');
  formData.append('file_format', 'other');
  formData.append('tag_audio_events', 'true');
  formData.append('timestamps_granularity', 'word');
  formData.append('cloud_storage_url', '');
  formData.append('language_code', 'en');

  const response = await axios.post(
    'https://api.elevenlabs.io/v1/speech-to-text?enable_logging=true',
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        'xi-api-key': apiKey,
      },
      maxBodyLength: Infinity,
    }
  );
  return response.data;
}

// Helper: DeepL Translate
async function deepLTranslate(text: string, targetLang: string, sourceLang: string) {
  const apiKey = process.env.DEEPL_API_KEY;
  const payload = {
    split_sentences: "1",
    preserve_formatting: false,
    formality: "prefer_less",
    outline_detection: true,
    text: [text],
    target_lang: targetLang,
    source_lang: sourceLang,
    model_type: "prefer_quality_optimized"
  };

  const response = await axios.post(
    'https://api.deepl.com/v2/translate',
    payload,
    {
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data.translations[0];
}

// Helper: ElevenLabs TTS
async function elevenLabsTTS(
  text: string,
  voiceId: string,
  modelId: string = "eleven_flash_v2_5",
  languageCode: string = "en",
  voiceSettings = {
    stability: 0,
    use_speaker_boost: false,
    style: 0,
    similarity_boost: 0,
    speed: 1
  }
) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream?output_format=mp3_44100_128`;

  const response = await axios.post(
    url,
    {
      text,
      model_id: modelId,
      language_code: languageCode,
      voice_settings: voiceSettings
    },
    {
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json"
      },
      responseType: "arraybuffer"
    }
  );

  const audioDir = path.join(__dirname, '../../audio');
  if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir);
  const audioPath = path.join(audioDir, `tts_${Date.now()}.mp3`);
  fs.writeFileSync(audioPath, response.data);
  return path.basename(audioPath);
}

export const handleProcessAudio: RequestHandler = async (req, res) => {
  upload.single('audio')(req, res, async (err) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No audio file uploaded.' });
    const audioPath = req.file.path;

    try {
      // 1. Analyze audio features
      const features = await analyzeAudio(audioPath);

      // 2. Speech-to-Text (STT)
      const sttResult = await elevenLabsSTT(audioPath);
      const transcript = sttResult.text;
      const detectedLang = sttResult.language_code || 'EN';

      // 3. Translation (DeepL)
      const targetLang = req.body.targetLang || 'ES'; // Default to Spanish
      const translation = await deepLTranslate(transcript, targetLang, detectedLang);

      // 4. Text-to-Speech (TTS) with all parameters
      const voiceId = req.body.voiceId || 'JBFqnCBsd6RMkjVDRZzb'; // Your default voice ID
      const modelId = req.body.modelId || 'eleven_flash_v2_5';
      const languageCode = req.body.ttsLanguageCode || 'en';
      const voiceSettings = req.body.voiceSettings
        ? JSON.parse(req.body.voiceSettings)
        : {
            stability: 0,
            use_speaker_boost: false,
            style: 0,
            similarity_boost: 0,
            speed: 1
          };

      const ttsAudioFilename = await elevenLabsTTS(
        translation.text,
        voiceId,
        modelId,
        languageCode,
        voiceSettings
      );

      // 5. Return result
      res.json({
        audioUrl: `/audio/${ttsAudioFilename}`,
        transcript,
        translatedText: translation.text,
        detectedSourceLanguage: translation.detected_source_language,
        modelTypeUsed: translation.model_type_used,
        sttWords: sttResult.words,
        features,
      });

      fs.unlink(audioPath, () => {});
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
      fs.unlink(audioPath, () => {});
    }
  });
};