# MyEMT hardcoded operational-data inventory

UI labels, option lists and explanatory copy are intentionally excluded. This inventory covers values that can be mistaken for real member, health, course or operational records.

| Pages | Hardcoded value group | Authoritative field | Resolution |
|---|---|---|---|
| `course_tindakan.html`, `course_result.html`, `user_healthview.html` | Member name, IC, age, gender, service, phone, designation, facility, state | `GET /api/members/:id` | Render member record; otherwise `Belum direkodkan` |
| Same pages | Tetanus, hepatitis B, influenza and COVID status | `health.vaccinations.<type>.status` | Removed fictional `Lengkap`; render normalized health API value |
| Same pages | Fitness status and assessment dates | `health.fitness.status`, `assessedAt`, `validUntil` | Removed fictional Fit/dates |
| Same pages | Weight, height and BMI | `health.vitals.weightKg`, `heightCm`, computed `bmi` | Map legacy `weight`/`height`; compute BMI server-side |
| Same pages | Heart and respiratory condition | `health.vitals.heartCondition`, `respiratoryCondition` | Missing data renders `Belum direkodkan` |
| Same pages | Stress, PTSD, sleep, coping and trauma | `health.psychological.*` | Missing data renders `Belum direkodkan` |
| Same pages | Medication example (Bisoprolol) | `health.medications[]` | Fictional row removed; empty table state used |
| Same pages | Flood/rural/international suitability and restrictions | `health.deployment.*` | Fictional `Sesuai` removed |
| Same pages | Permanent injury/additional notes | `health.notes` and legacy `permanent_injury_details` | Render actual value or empty state |
| `course_management.html` | State quota allocation | `session.stateQuotas` | Remains policy configuration until an admin editor is added; not member data |
| Mission dashboards | Seed mission/member/session rows | Corresponding `/api/*` collections | Test/development seed data, explicitly separated from production records |
| MDS demo/legacy views | Example patient/date/vital values | `/api/mds/:id` | Legacy pages should not be used as authoritative views; active `emt_mdsview.html` is API-backed |

## Canonical member health schema

```json
{
  "schemaVersion": 1,
  "fitness": { "status": null, "assessedAt": null, "validUntil": null },
  "vitals": { "weightKg": null, "heightCm": null, "bmi": null, "heartCondition": null, "respiratoryCondition": null },
  "vaccinations": { "tetanus": null, "hepatitisB": null, "influenza": null, "covid19": null, "other": [] },
  "psychological": { "stressLevel": null, "ptsdRisk": null, "sleepIssue": null, "copingAbility": null, "traumaHistory": null },
  "medications": [],
  "deployment": { "flood": null, "rural": null, "international": null, "restrictions": [] },
  "medicalCondition": { "hasCondition": null, "details": null },
  "allergy": { "hasAllergy": null, "details": null },
  "disability": { "hasDisability": null, "details": null },
  "notes": null
}
```
