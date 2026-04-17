// REVIEW: Same `var` vs `const`/`let` inconsistency as articleService.js.
// Use `const` here since API_BASE is never reassigned.
// Modern JavaScript does not use var anymore.
var API_BASE = "/api";

export async function analyzeLinks(urls) {
  var response = await fetch(API_BASE + "/ai/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ urls: urls }),
  });

  if (!response.ok) {
    var errorData = await response.json().catch(function () {
      return {};
    });
    throw new Error(errorData.error || "Failed to get AI analysis");
  }

  return response.json();
}
