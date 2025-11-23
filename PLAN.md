
I've analyzed the current codebase and the user's feedback.

### Problems Identified

1.  **Metric Extraction Failure**: The `extractMetrics` function relies on a simple regex `(\d+(?:일|주|달|개월|년|시간|분|초|만원|원|%|배|개)?)`. If the user inputs "English score doesn't go up" or "Point lecture", it might return null or fail to find a meaningful metric.
2.  **Fallback Logic Weakness**: When `extractMetrics` fails (returns null), it defaults to "단기간" (short term) or similar hardcoded strings. This doesn't fit all contexts.
3.  **Context-Unaware Replacements**: The `smartReplace` function blindly replaces `{metric}`. If the metric is "단기간" but the template expects a number (e.g., "{metric}배"), we get "단기간배" which is nonsensical.
4.  **Template Rigidity**: Templates often force a structure like "{pain} 때문에 {metric} 고생했다" (Suffered for {metric} because of {pain}). If the user input for `pain` is "English score doesn't go up", it becomes "English score doesn't go up 때문에 3일 고생했다". The Josa (Korean particles) handling helps, but the semantic flow might still be awkward.
5.  **Josa Issues**: The `getJosa` function seems generally okay for Hangul, but might fail on English words or mixed inputs unless handled carefully (though `hasJongseong` logic seems standard). However, the main issue is likely semantic mismatch.
6.  **"Groundbreaking" Improvement**: The user wants a "drastic" improvement. This implies not just fixing bugs, but enhancing the *quality* and *variety* of the generated text.

### Plan for "Groundbreaking" Improvement

I will implement a **"Smart Context Engine"** that classifies inputs and selects more appropriate templates or fallback values. I will also refine the templates to be more flexible and add a "Safety Net" to ensure grammar.

**Specific Steps:**

1.  **Enhance `extractMetrics`**: Improve the regex to catch more patterns (ranges, english units) and return a structured object (value + unit) rather than just a string, allowing for better sentence integration.
2.  **Input Analysis & Tagging**: Add a function to analyze the *type* of input. E.g., is the `pain` physical (pain, skin) or mental (stress, worry)? Is the `solution` a product or a service? (This might be hard with simple JS, but I can use keyword matching).
3.  **Dynamic Template Selection**: instead of random selection, prioritize templates that match the available data. If no metric is found, use "Metric-Free" templates.
4.  **Refined Templates**:
    *   Create a set of "Universal" templates that work without specific metrics.
    *   Fix existing templates to be less prone to awkward phrasing.
5.  **Fix Josa/Grammar Logic**: Ensure English words are handled gracefully (defaulting to a safe particle or checking the last char more robustly).
6.  **Verification**: Create a new verification script `verification/verify_smart_generation.py` to test various inputs (including English, no numbers, complex sentences) and ensure the output is natural.

### Pre-computation/Pre-analysis

I'll start by creating a reproduction script to confirm the "nonsensical" output with the user's likely inputs (based on the image description or typical failure cases).
Then I will refactor `js/app.js` and `js/data.js`.

**User Input from Image (inferred/mocked):**
*   Product: "영어강의" (English Lecture)
*   Target: "수험생" (Examinee)
*   Pain: "영어 점수 안오름" (English score not going up)
*   Solution: "포인트 강의" (Point lecture)

**Hypothetical Bad Output:**
"영어 점수 안오름 때문에 단기간배 고생했다" (Suffered for short-term times because of English score not going up) -> "단기간배" is wrong.
"영어 점수 안오름(이)가 진짜 짜증날 때" -> "안오름이가" might be awkward if not handled as a noun phrase properly, but "안오름" ends in 'm' (consonant) so '이' is picked. "안오름이" is okay-ish but "점수가 안오르는 게" would be better.

I'll proceed with the plan.
