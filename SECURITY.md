# Security Policy

## Supported Versions

`get-browser` follows [semantic versioning](https://semver.org/). Security fixes
land on the latest minor of the current major.

| Version | Supported          |
| ------- | ------------------ |
| 2.x     | :white_check_mark: |
| 1.x     | :x:                |

## Reporting a Vulnerability

**Please do not open a public issue for security vulnerabilities.**

Report privately through GitHub's
[private vulnerability reporting](https://github.com/yankouskia/get-browser/security/advisories/new)
— this opens a confidential advisory visible only to the maintainers.

If you prefer email, contact the maintainer at **aleksandr.yankovskiy@gmail.com**.

Please include:

- A description of the issue and its impact.
- Steps to reproduce — a failing test or a sample user-agent string is ideal.
- The affected version(s).

## What to Expect

- **Acknowledgement** within 3 business days.
- An initial assessment and severity rating within 7 days.
- **Coordinated disclosure:** a fix is published to npm before the advisory goes
  public, and reporters are credited unless they ask otherwise.

## Scope

`get-browser` has **zero runtime dependencies** and performs **no I/O** — it only
inspects user-agent strings the caller already has. The realistic attack surface
is therefore limited to:

- **Regular-expression denial of service (ReDoS)** in the detection patterns.
- Incorrect detection results that could weaken a security-relevant branch in
  consuming code.

Reports in these areas are especially welcome. General "this browser is
misdetected" bugs *without* a security impact belong in the normal
[issue tracker](https://github.com/yankouskia/get-browser/issues) instead.
