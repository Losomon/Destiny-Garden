---
name: "Bug report 🐛"
description: File a bug report for Destiny Gardens website
title: "[BUG] "
labels: ["bug", "triage"]
assignees: ["Losomon"]
body:
  - type: markdown
    attributes:
      value: "Thanks for reporting a bug! Help us fix it faster."
  - type: textarea
    id: description
    attributes:
      label: "Describe the bug"
      description: "Clear steps to reproduce the issue."
      placeholder: "1. Go to... 2. Click... 3. See error..."
    validations:
      required: true
  - type: dropdown
    id: browsers
    attributes:
      label: "Browser(s) affected"
      description: "Select all that apply"
      multiple: true
      options:
        - Chrome (desktop)
        - Chrome (Android)
        - Chrome (iOS)
        - Firefox
        - Safari (iOS/macOS)
        - Edge
        - Other (comment below)
  - type: dropdown
    id: device
    attributes:
      label: "Device"
      options:
        - Desktop
        - Tablet
        - Mobile (Android)
        - Mobile (iOS)
    validations:
      required: true
  - type: textarea
    id: screenshots
    attributes:
      label: "Screenshots"
      description: "Drag & drop images here."
  - type: textarea
    id: additional
    attributes:
      label: "Additional context (e.g., console errors)"

