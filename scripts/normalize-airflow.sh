#!/usr/bin/env bash
set -euo pipefail

# Normalizes images in client/public/sequence/airflow
# Usage: run from project root or via npm script in client: npm run normalize-airflow

INPUT_DIR="client/public/sequence/airflow"
OUTPUT_DIR="$INPUT_DIR/frames"

mkdir -p "$OUTPUT_DIR"

# Find max width and height among images
max_w=0
max_h=0
count=0
for img in "$INPUT_DIR"/*.{jpg,JPG,jpeg,png,PNG} ; do
  [ -e "$img" ] || continue
  ((count++))
  w=$(sips -g pixelWidth "$img" 2>/dev/null | awk '/pixelWidth/ {print $2}')
  h=$(sips -g pixelHeight "$img" 2>/dev/null | awk '/pixelHeight/ {print $2}')
  if [ -n "$w" ] && [ -n "$h" ]; then
    if [ "$w" -gt "$max_w" ]; then max_w=$w; fi
    if [ "$h" -gt "$max_h" ]; then max_h=$h; fi
  fi
done

if [ "$count" -eq 0 ]; then
  echo "No images found in $INPUT_DIR"
  exit 1
fi

# Default target: use largest dimensions found
target_w=$max_w
target_h=$max_h

echo "Found $count images. Normalizing to ${target_w}x${target_h} and converting to PNG..."

i=1
for img in "$INPUT_DIR"/*.{jpg,JPG,jpeg,png,PNG} ; do
  [ -e "$img" ] || continue
  out_file=$(printf "%s/%04d.png" "$OUTPUT_DIR" "$i")
  # Prefer ImageMagick (convert) to trim white borders and make background transparent.
  if command -v convert >/dev/null 2>&1; then
    # Remove near-white background, trim, then center onto a transparent square canvas
    convert "$img" -fuzz 10% -transparent white -trim +repage -resize "${target_w}x${target_h}" -gravity center -background none -extent "${target_w}x${target_h}" "$out_file"
  else
    # Fallback to sips: resize then force canvas size (may leave white edges)
    tmp="${out_file}.tmp.png"
    sips -Z "$target_w" "$img" --out "$tmp" >/dev/null 2>&1 || sips -Z "$target_h" "$img" --out "$tmp" >/dev/null 2>&1
    sips -z "$target_h" "$target_w" "$tmp" --out "$out_file" >/dev/null 2>&1 || cp "$tmp" "$out_file"
    rm -f "$tmp"
  fi
  echo "Wrote $out_file"
  i=$((i+1))
done

echo "Normalized $((i-1)) images to $OUTPUT_DIR"
exit 0
