/**
 * Extract template variables from text (e.g., {{variable}})
 */
export function extractVariables(text: string): string[] {
  const matches = [...text.matchAll(/{{\s*([\w$]+)\s*}}/g)];
  return [...new Set(matches.map(m => m[1]))];
}

/**
 * Highlight variables in text for display
 */
export function highlightVariables(text: string): string {
  return text.replace(
    /{{\s*([\w$]+)\s*}}/g,
    '<span class="text-primary font-medium">{{$1}}</span>'
  );
}
