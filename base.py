from summary import *
from transcribe import *

TEXT_PATH = "C:\\Users\\ruhen\source\\repos\inSummary\\trial.txt"
AUDIO_PATH = "C:\\Users\\ruhen\\source\\repos\\inSummary\\Bueller-Life-moves-pretty-fast.wav"

article = fileReader(TEXT_PATH)

summary_text = summarizer(article, max_length = 400, min_length = 60, do_sample = False)

transcript_text = asyncio.run(transcribe_audio(AUDIO_PATH))

