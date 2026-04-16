#!/usr/bin/env python3
"""Download audio from R2 videos and generate VTT subtitles using Whisper."""

import subprocess
import urllib.parse
import os
import sys

WORK_DIR = "/Users/bjoernmbp/Documents/GitHub/ddki-website/ddki-website/subtitles-work"
WHISPER = "/Users/bjoernmbp/Library/Python/3.9/bin/whisper"
VIDEOS_FILE = os.path.join(WORK_DIR, "videos.txt")

os.makedirs(os.path.join(WORK_DIR, "audio"), exist_ok=True)
os.makedirs(os.path.join(WORK_DIR, "vtt"), exist_ok=True)

with open(VIDEOS_FILE) as f:
    urls = [line.strip() for line in f if line.strip()]

total = len(urls)

for i, url in enumerate(urls, 1):
    decoded = urllib.parse.unquote(url)
    filename = os.path.basename(decoded)
    basename_no_ext = filename.rsplit(".mp4", 1)[0]

    # Extract R2 folder path
    r2_path = decoded.split(".r2.dev/", 1)[1]
    r2_dir = os.path.dirname(r2_path)

    vtt_dir = os.path.join(WORK_DIR, "vtt", r2_dir)
    os.makedirs(vtt_dir, exist_ok=True)

    vtt_out = os.path.join(vtt_dir, basename_no_ext + ".vtt")

    if os.path.isfile(vtt_out):
        print(f"[{i}/{total}] SKIP (exists): {basename_no_ext}")
        continue

    print(f"[{i}/{total}] Processing: {basename_no_ext}")

    audio_file = os.path.join(WORK_DIR, "audio", f"{i}.wav")

    # Extract audio
    print("  Extracting audio...")
    result = subprocess.run(
        ["ffmpeg", "-y", "-i", url, "-vn", "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1", audio_file],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        print(f"  ERROR extracting audio: {result.stderr[-500:]}")
        continue

    # Run Whisper
    print("  Running Whisper...")
    result = subprocess.run(
        [WHISPER, audio_file, "--model", "small", "--language", "de", "--output_format", "vtt", "--output_dir", vtt_dir],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        print(f"  ERROR running Whisper: {result.stderr[-500:]}")
        continue

    # Whisper outputs as {i}.vtt, rename to match video name
    whisper_out = os.path.join(vtt_dir, f"{i}.vtt")
    if os.path.isfile(whisper_out):
        os.rename(whisper_out, vtt_out)

    # Clean up audio
    if os.path.isfile(audio_file):
        os.remove(audio_file)

    print(f"  Done: {vtt_out}")
    print()

print(f"=== All {total} videos processed ===")
print(f"VTT files are in: {os.path.join(WORK_DIR, 'vtt')}/")
