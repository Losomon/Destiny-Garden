---
name: "Feature request ✨"
description: Suggest a new feature or improvement
title: "[FEAT] "
labels: ["enhancement", "triage"]
body:
  - type: markdown
    attributes:
      value: "Feature requests help prioritize development!"
  - type: textarea
    id: description
    attributes:
      label: "What feature would you like?"
      description: "Detailed use case and benefits."
    validations:
      required: true
  - type: textarea
    id: alternatives
    attributes:
      label: "What alternatives have you considered?"
  - type: textarea
    id: additional
    attributes:
      label: "Additional context"

