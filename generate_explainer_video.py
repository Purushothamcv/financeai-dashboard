"""
This script generates an AI-powered explainer video for the FinanceAI project using the OpenAI API and the moviepy library.
It creates a narrated video with slides describing the app's features and workflow.
You must provide your OpenAI API key in the environment or as a variable.
"""

import os
from moviepy.editor import TextClip, CompositeVideoClip, concatenate_videoclips, AudioFileClip
import openai

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY") or "sk-..."

# Define the script for narration
script = """
Welcome to FinanceAI, a modern web application for smarter financial decisions.
FinanceAI features AI-powered lead priority prediction, instant loan approval analysis, and an interactive CapreCapital chatbot.
Built with React and FastAPI, it leverages advanced machine learning models for real-time predictions.
Users can analyze company data, predict lead priority levels, and evaluate loan applications instantly.
The floating chatbot answers finance and AI questions, making the experience interactive and insightful.
Get started with FinanceAI today!
"""

# Generate narration audio using OpenAI TTS (or use any TTS provider)
def generate_narration(text, filename="narration.mp3"):
    response = openai.audio.speech.create(
        model="tts-1",
        voice="alloy",
        input=text
    )
    with open(filename, "wb") as f:
        f.write(response.content)
    return filename

# Create video slides
def create_slide(text, duration=4, fontsize=40, color='white', bg_color='#2563eb'):
    return TextClip(text, fontsize=fontsize, color=color, bg_color=bg_color, size=(1280, 720)).set_duration(duration)

def main():
    # Generate narration audio
    audio_file = generate_narration(script)

    # Create slides
    slides = [
        create_slide("FinanceAI", duration=3, fontsize=70, bg_color="#2563eb"),
        create_slide("AI-powered Lead Priority Prediction", duration=4, bg_color="#1e40af"),
        create_slide("Instant Loan Approval Analysis", duration=4, bg_color="#06b6d4"),
        create_slide("CapreCapital Chatbot", duration=4, bg_color="#0e7490"),
        create_slide("Built with React & FastAPI", duration=3, bg_color="#2563eb"),
        create_slide("Advanced ML Models for Real-Time Predictions", duration=4, bg_color="#1e40af"),
        create_slide("Get Started Today!", duration=3, bg_color="#06b6d4"),
    ]

    video = concatenate_videoclips(slides, method="compose")
    audio = AudioFileClip(audio_file)
    video = video.set_audio(audio)
    video.write_videofile("financeai_explainer.mp4", fps=24)

if __name__ == "__main__":
    main()

# To add this file to your existing git repository, run these commands in your terminal from the project root:
#
# git add generate_explainer_video.py
# git commit -m "Add AI explainer video generator script"
# git push

