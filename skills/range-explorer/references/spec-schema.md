# RANGES spec schema (`range-explorer/1`)

The spec is one JavaScript constant, `const RANGES = {...};`, whose value is **strict JSON**: double-quoted keys and strings, no comments, no trailing commas. `range_tool.py` parses it with a JSON reader. Put comments above the `const`.

## Top-level fields

| Field | Required | Notes |
|---|---|---|
| `schema` | yes | Always `"range-explorer/1"`. |
| `id` | yes | Kebab-case; must equal the sim folder name. |
| `title` | yes | Two to four words. |
| `caption` | recommended | One or two short sentences shown under the title before a row is selected. Keep it to about 150 characters so it fits two lines at 640 px. Say that values are illustrative when they are. |
| `axis` | yes | See below. |
| `groups` | yes | 1 to 5 families; see below. |
| `items` | yes | 2 to 16 options; see below. |
| `marks` | no | Up to 4 reference lines, each `{ "value": 40, "label": "Riverbend girder, 40 ft" }`. Tie them to the chapter's worked examples. |
| `chapter`, `lesson` | for `new` | Same blocks as the layered-assembly skill: chapter number, title, dir; objective, bloom, usage, activities, assessment, concepts. |
| `currency` | recommended | `asOf`, `timeless` list, and `ages` list of `{item, basis, check}`. The validator warns if it is missing. |

## `axis`

| Field | Notes |
|---|---|
| `label` | Short noun: "Span", "Load", "Airflow". Used in the headline and the slider caption. |
| `unit` | Base unit, shown after values: "ft", "A", "cfm". Values in the spec are always in this unit. |
| `min`, `max` | Numbers with `min < max`. Ranges that run past `max` are drawn with an arrow. |
| `step` | Slider and drag increment (default 1). |
| `start` | Starting value. |
| `si` | Optional. `{ "unit": "m", "factor": 0.3048, "digits": 1 }`. Display value = base value x factor. Adds an IP/SI selector. Omit for quantities with no metric equivalent (amps). |

## `groups`

```json
{ "id": "wood", "name": "Wood", "color": "#b8860b" }
```

`name` is a checkbox label, 14 characters or fewer. `color` is any CSS color; use muted colors, because the bars are drawn with transparency.

## `items`

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Unique. |
| `name` | yes | 30 characters or fewer; longer names are shrunk or cut in the label column. |
| `group` | yes | A group `id`. |
| `range` | yes | `[low, high]`, the possible range, in base units. |
| `typical` | recommended | `[low, high]` inside `range`. Without it, students cannot tell usual from merely possible. |
| `what` | yes | One sentence: what the option is. |
| `why` | yes | One sentence: why you would choose it. |
| `limit` | recommended | One sentence: what to watch out for. |

Sentences are complete, end with a period, and stay under about 170 characters.

## Limits at a glance

| Item | Limit | Why |
|---|---|---|
| Items | 2 to 16 | Rows are 26 px each and the canvas height grows with them. |
| Groups | 1 to 5 | They are checkboxes on one row. |
| Marks | up to 4 | Labels stagger under the chart. |
| Canvas height | `64 + 26 x items + 34 + 120 + 2 x 34 + 6` | The tool computes it and sets the iframe height. |
