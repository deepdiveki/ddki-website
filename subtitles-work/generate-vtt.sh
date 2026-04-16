#!/bin/bash
set -e

WORK_DIR="/Users/bjoernmbp/Documents/GitHub/ddki-website/ddki-website/subtitles-work"
WHISPER="/Users/bjoernmbp/Library/Python/3.9/bin/whisper"
VIDEOS_FILE="$WORK_DIR/videos.txt"

mkdir -p "$WORK_DIR/audio" "$WORK_DIR/vtt"

count=0
total=$(wc -l < "$VIDEOS_FILE" | tr -d ' ')

while IFS= read -r url; do
  [ -z "$url" ] && continue
  count=$((count + 1))

  # Decode URL to get the filename
  decoded=$(python3 -c "import urllib.parse, sys; print(urllib.parse.unquote(sys.argv[1]))" "$url")
  filename=$(basename "$decoded")
  basename_no_ext="${filename%.mp4}"

  # Extract R2 folder path for output organization
  r2_path=$(python3 -c "import urllib.parse, sys; u=urllib.parse.unquote(sys.argv[1]); print(u.split('.r2.dev/')[1])" "$url")
  r2_dir=$(dirname "$r2_path")

  mkdir -p "$WORK_DIR/vtt/$r2_dir"

  vtt_out="$WORK_DIR/vtt/$r2_dir/$basename_no_ext.vtt"

  if [ -f "$vtt_out" ]; then
    echo "[$count/$total] SKIP (exists): $basename_no_ext"
    continue
  fi

  echo "[$count/$total] Processing: $basename_no_ext"

  audio_file="$WORK_DIR/audio/${count}.wav"

  # Use the original URL (with encoding) for ffmpeg - it handles https:// URLs fine
  echo "  Extracting audio..."
  ffmpeg -y -i "$url" -vn -acodec pcm_s16le -ar 16000 -ac 1 "$audio_file" -loglevel error 2>&1

  # Run Whisper
  echo "  Running Whisper..."
  "$WHISPER" "$audio_file" \
    --model small \
    --language de \
    --output_format vtt \
    --output_dir "$WORK_DIR/vtt/$r2_dir" \
    2>&1 | grep -v "^$" | grep -v "FP16 is not supported" | grep -v "^[[:space:]]*[0-9]*%|"

  # Whisper outputs as {count}.vtt, rename to match video name
  if [ -f "$WORK_DIR/vtt/$r2_dir/${count}.vtt" ]; then
    mv "$WORK_DIR/vtt/$r2_dir/${count}.vtt" "$vtt_out"
  fi

  # Clean up audio file to save space
  rm -f "$audio_file"

  echo "  Done: $vtt_out"
  echo ""

done < "$VIDEOS_FILE"

echo "=== All $total videos processed ==="
echo "VTT files are in: $WORK_DIR/vtt/"
