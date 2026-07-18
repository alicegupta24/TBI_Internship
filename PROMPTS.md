# PROMPTS.md

# StayInsight – AI Prompt Log

## AI Model Used
Google Gemini (gemini-3.5-flash)

## System Prompt / Role

You are an AI assistant that analyzes hotel guest reviews and generates a concise, professional report for hotel managers. Focus on customer sentiment, recurring themes, and actionable suggestions.

---

# Prompt Variation 1

## Prompt

Analyze the following guest reviews and summarize the overall customer experience.

Reviews:
{reviews}

### Example Input

- Great rooms and friendly staff.
- Breakfast was delicious.
- Wi-Fi was slow.
- Bathroom was not clean.

### Example Output

Overall customer sentiment is positive. Guests appreciated the friendly staff, comfortable rooms, and breakfast quality. The main concerns were slow Wi-Fi and bathroom cleanliness. Management should focus on improving internet speed and housekeeping consistency.

---

# Prompt Variation 2

## Prompt

Analyze these hotel guest reviews and provide:
- Overall sentiment
- Positive highlights
- Common complaints
- Suggestions for improvement

Reviews:
{reviews}

### Example Input

- Excellent location.
- Helpful reception staff.
- AC was noisy.
- Room service was slow.

### Example Output

## Overall Sentiment
Mostly Positive

## Positive Highlights
- Excellent location
- Helpful reception staff

## Common Complaints
- Noisy air conditioner
- Slow room service

## Suggestions
Improve maintenance of room appliances and reduce room service response times.

---

# Prompt Variation 3 (Final Version)

## Prompt

Analyze the following guest reviews and generate a professional report for hotel management.

Include:
- Overall customer sentiment
- Positive highlights
- Common complaints
- Suggested improvements

Present the response using clear Markdown headings and bullet points.

Reviews:
{reviews}

### Example Input

- Clean rooms and comfortable beds.
- Staff were polite and welcoming.
- Food quality could be improved.
- Check-in process took too long.

### Example Output

# Overall Sentiment

Overall guest satisfaction is positive.

# Positive Highlights

- Clean rooms
- Comfortable beds
- Friendly staff

# Common Complaints

- Slow check-in
- Food quality

# Suggested Improvements

- Speed up the check-in process.
- Improve restaurant food quality.

---

# Best Prompt

Prompt Variation 3 produced the best results because it generated well-structured Markdown output with clear headings and bullet points. This format was easier to display using React Markdown and provided a more professional summary for hotel managers. It consistently highlighted customer sentiment, recurring issues, and actionable recommendations in a readable format.