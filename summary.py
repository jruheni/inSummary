from transformers import pipeline


def fileReader(path):
    try:
        with open(path, 'r') as file:
            return file.read()
    except FileNotFoundError:
        print("file not found")
        return None
    
summarizer = pipeline('summarization')