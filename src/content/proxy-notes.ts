export type AgentId = "planner" | "coder" | "reviewer"

export interface ProxyNote {
  /** "behnam" for the notes he writes himself, like the spec that starts the loop */
  from: AgentId | "behnam"
  to: AgentId
  text: string
  /** what Behnam writes over the note; without one he just passes it on */
  fix?: string
}

// One ticket through Behnam's loop: spec, plan, implement, review, resolve, review again.
export const proxyNotes: ProxyNote[] = [
  {from: "behnam", to: "planner", text: "Spec: login times out on slow networks."},
  {from: "planner", to: "coder", text: "Plan: rebuild auth in 14 steps.", fix: "Just raise the timeout."},
  {from: "coder", to: "reviewer", text: "PR #482: timeout 10s → 30s."},
  {from: "reviewer", to: "coder", text: "2 comments: add a slow-network test."},
  {from: "coder", to: "reviewer", text: "Resolved. All tests pass ✓", fix: "You deleted the failing one."},
]
