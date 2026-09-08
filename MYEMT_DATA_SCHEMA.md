# MyEMT operational data contracts

## Course application and training

`status` and `enrollmentStatus` describe registration approval only. Training is
authoritative only when recorded separately in `attendance`, `componentResults`
and `completion`.

```json
{
  "id": "CA...",
  "memberId": "M...",
  "sessionId": "S...",
  "status": "pending | approved | rejected",
  "enrollmentStatus": "pending | approved | rejected",
  "attendance": {
    "status": "not_recorded | attended | absent",
    "checkedInAt": null
  },
  "componentResults": {
    "B-Course": { "status": "pending | passed | failed | null", "assessedAt": null, "assessor": null, "remark": "" },
    "C-Course": { "status": "pending | passed | failed | null", "assessedAt": null, "assessor": null, "remark": "" },
    "TTX": { "status": "pending | passed | failed | null", "assessedAt": null, "assessor": null, "remark": "" },
    "FTX": { "status": "pending | passed | failed | null", "assessedAt": null, "assessor": null, "remark": "" }
  },
  "completion": { "status": "not_completed | completed", "completedAt": null }
}
```

## Mission application

```json
{
  "id": "MA...",
  "memberId": "M...",
  "missionId": "MSN...",
  "status": "pending | approved | rejected",
  "submittedAt": "YYYY-MM-DD",
  "reviewedAt": null,
  "remark": "",
  "statusHistory": []
}
```

The backend, rather than the browser, decides mission eligibility. The current
rules require approved membership, an open mission, passed B-Course and
C-Course results, current medical fitness, and compatible deployment status.
Allergy and medical-condition data inform the clinical decision but do not by
themselves mark a member unfit.

## Daily mission report

```json
{
  "id": "DR...",
  "missionId": "MSN...",
  "reportDate": "YYYY-MM-DD",
  "date": "YYYY-MM-DD",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

`reportDate` is the UI field and `date` is retained as an API compatibility
alias. Both are normalized to the same value.
