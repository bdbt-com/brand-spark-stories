I understand exactly: on the Page Visitors chart in Today view, the white visitor trend line should be visible just like the other graphs, and the signup dots should sit on that same line instead of replacing/hiding it.

Plan:
1. Keep the chart as a combined chart only for Today when signup dots exist.
2. Force the visitor `<Line dataKey="visitors">` to render as a real continuous line even when signup marker data is present.
3. Stop signup marker values from changing the visitor chart scale, so one course/signup dot cannot push the Y axis up and flatten/hide the visitor line.
4. Place email/course signup dots at the matching hour on the visitor line, while keeping the white visitor line visible through the chart.
5. Verify the Today view visually on `/admin-list`: legend shows Visitors + signup dots, and the chart shows both the white visitor trend line and the blue/gold signup dots together.