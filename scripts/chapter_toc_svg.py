#!/usr/bin/env python3
"""Generate the clickable exploded-building SVG for docs/chapters/index.md (original artwork, no external assets).

Usage: python scripts/chapter_toc_svg.py [path/to/index.md]
Rewrites the block between the toc-svg markers. Edit the chapter titles or geometry here, then rerun.
"""
import math

S = 26.0          # px per unit
OX, OY = 500.0, 430.0
C30, S30 = math.cos(math.radians(30)), 0.5

CH = {
    1: "Introduction and terms", 2: "Design and construction process", 3: "Forces, heat, and physics",
    4: "Moisture, air, and comfort", 5: "Properties of materials", 6: "Loads and load paths",
    7: "Wood and steel framing", 8: "Concrete and masonry", 9: "Site, soils, and groundwater",
    10: "Foundation systems", 11: "Control layers and insulation", 12: "Cladding, windows, air sealing",
    13: "Roof assemblies", 14: "HVAC, plumbing, fire protection", 15: "Electrical fundamentals",
    16: "Distribution and design team", 17: "Codes and permits", 18: "Fire and life safety",
    19: "Energy efficiency", 20: "Sustainable materials", 21: "Durability and failure",
}
SLUG = {
    1: "01-intro-terminology", 2: "02-design-construction-process", 3: "03-forces-heat-physics",
    4: "04-moisture-air-comfort", 5: "05-material-properties", 6: "06-structural-loads",
    7: "07-wood-steel-framing", 8: "08-concrete-masonry", 9: "09-site-soils", 10: "10-foundation-systems",
    11: "11-enclosure-insulation", 12: "12-cladding-windows-air-sealing", 13: "13-roof-assemblies",
    14: "14-hvac-plumbing-fire", 15: "15-electrical-fundamentals", 16: "16-electrical-distribution-design",
    17: "17-building-codes-permits", 18: "18-fire-life-safety", 19: "19-energy-efficiency",
    20: "20-sustainable-materials", 21: "21-durability-failure",
}


SHORT = {6: "Loads and load paths", 7: "Wood and steel framing", 8: "Concrete and masonry",
         9: "Site, soils, groundwater", 10: "Foundation systems", 11: "Insulation layers",
         12: "Cladding and windows", 13: "Roof assemblies", 14: "HVAC, plumbing, fire",
         15: "Electrical basics", 16: "Distribution, lighting"}
LABELS = {"left": [], "right": []}


def want_label(n, anchor, side):
    LABELS[side].append((n, anchor))


def P(x, y, z):
    return (OX + (x - y) * C30 * S, OY + (x + y) * S30 * S - z * S)


def poly(pts, cls, extra=""):
    return '<polygon class="%s" points="%s"%s/>' % (cls, " ".join("%.1f,%.1f" % p for p in pts), extra)


def box(x0, y0, z0, w, d, h, cls="m-struct", top_cls=None):
    """Isometric box: top, front-left (y=y0+d) and right (x=x0+w) faces."""
    top = [P(x0, y0, z0 + h), P(x0 + w, y0, z0 + h), P(x0 + w, y0 + d, z0 + h), P(x0, y0 + d, z0 + h)]
    left = [P(x0, y0 + d, z0), P(x0 + w, y0 + d, z0), P(x0 + w, y0 + d, z0 + h), P(x0, y0 + d, z0 + h)]
    right = [P(x0 + w, y0, z0), P(x0 + w, y0 + d, z0), P(x0 + w, y0 + d, z0 + h), P(x0 + w, y0, z0 + h)]
    return poly(left, cls + " f-left") + poly(right, cls + " f-right") + poly(top, (top_cls or cls) + " f-top")


def link(n, inner, label=None, title=None):
    t = title or ("Chapter %d: %s" % (n, CH[n]))
    return ('<a class="part" href="%s/" aria-label="%s"><title>%s</title>%s</a>' % (SLUG[n], t, t, inner))


def tag(n, x, y, anchor="start"):
    """Numbered text label with the short chapter name."""
    w = 7 + 8.2 * len(CH[n]) * 0.0  # unused, labels are plain text
    return ('<text class="lbl" x="%.1f" y="%.1f" text-anchor="%s"><tspan class="num">%d</tspan> %s</text>'
            % (x, y, anchor, n, CH[n]))


def leader(p, q):
    return '<line class="lead" x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f"/>' % (p[0], p[1], q[0], q[1])


out = []
W, H = 1000, 700
out.append('<svg class="toc-svg" viewBox="0 0 %d %d" role="group" aria-label="Exploded building. Each part links to the chapter that covers it." xmlns="http://www.w3.org/2000/svg">' % (W, H))

# ----- exploded alignment guides -----
for (x, y) in [(0, 0), (6, 0), (6, 5), (0, 5)]:
    a, b = P(x, y, 0.9), P(x, y, 12.0)
    out.append('<line class="guide" x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f"/>' % (a[0], a[1], b[0], b[1]))

# ----- 9 site and soil -----
soil = box(-1.0, -1.0, 0.0, 8.0, 7.0, 0.9, "m-earth")
out.append('<g>' + link(9, soil) + '</g>')
sp = P(7.0, 3.0, 0.4)
want_label(9, sp, 'right')

# ----- 10 foundation (footing ring approximated by slab + footings) -----
fnd = box(0, 0, 2.1, 6, 5, 0.9, "m-conc")
for fx, fy in [(0.2, 0.2), (5.4, 0.2), (5.4, 4.4), (0.2, 4.4)]:
    fnd += box(fx, fy, 1.3, 0.5, 0.5, 0.8, "m-conc")
out.append(link(10, fnd))
fp = P(6.0, 2.5, 2.5)
want_label(10, fp, 'right')

# ----- 8 concrete and masonry: a small stack of blocks beside the foundation -----
blocks = ""
for k, (bx, by, bz) in enumerate([(-2.4, 3.2, 2.1), (-2.4, 4.2, 2.1), (-2.4, 3.7, 2.7)]):
    blocks += box(bx, by, bz, 0.9, 0.9, 0.6, "m-brick")
out.append(link(8, blocks))
bp = P(-2.4, 4.1, 2.3)
want_label(8, bp, 'left')

# ----- 7 structural frame: deck + four columns + a beam -----
frame = ""
cols = [(0.1, 0.1), (5.6, 0.1), (5.6, 4.6), (0.1, 4.6)]
for cx, cy in cols:
    frame += box(cx, cy, 4.7, 0.3, 0.3, 2.4, "m-steel")
frame += box(0, 0, 4.4, 6, 5, 0.3, "m-wood")
frame += box(0.1, 2.3, 7.0, 5.8, 0.3, 0.3, "m-steel")
out.append(link(7, frame))
wp = P(0.0, 5.0, 5.5)
want_label(7, wp, 'left')

# ----- 6 loads: arrows pointing down onto the structure -----
arrows = ""
for ax, ay in [(1.2, 1.2), (3.0, 2.5), (4.8, 3.8)]:
    top = P(ax, ay, 12.4)
    bot = P(ax, ay, 11.0)
    arrows += ('<line class="arrow" x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f"/>' % (top[0], top[1], bot[0], bot[1]))
    arrows += ('<polygon class="arrowhead" points="%.1f,%.1f %.1f,%.1f %.1f,%.1f"/>'
               % (bot[0] - 6, bot[1] - 8, bot[0] + 6, bot[1] - 8, bot[0], bot[1] + 3))
out.append(link(6, arrows))
lp = P(1.2, 1.2, 12.4)
want_label(6, P(4.8, 3.8, 12.2), 'right')

# ----- walls: back walls first, then systems, then translucent front walls -----
WZ, WH, T = 7.6, 2.5, 0.25
back = box(0, 0, WZ, 6, T, WH, "m-wall") + box(0, 0, WZ, T, 5, WH, "m-wall")
# window on the right-hand (x=6) face
def win(face_x, y0, y1, z0, z1):
    return poly([P(face_x, y0, z0), P(face_x, y1, z0), P(face_x, y1, z1), P(face_x, y0, z1)], "m-glass")

# ----- 14 / 15 / 16 building systems inside the walls -----
duct = box(0.6, 0.6, WZ + 1.6, 4.2, 0.6, 0.6, "m-hvac") + box(4.2, 0.6, WZ + 0.3, 0.6, 0.6, 1.3, "m-hvac")
pipe = box(0.45, 2.6, WZ + 0.2, 0.2, 0.2, 2.1, "m-plumb")
panel = box(0.3, 3.6, WZ + 0.7, 0.35, 0.9, 1.1, "m-elec")
conduit = box(0.6, 1.5, WZ + 2.2, 4.4, 0.15, 0.15, "m-elec") + box(2.6, 1.45, WZ + 1.7, 0.3, 0.3, 0.5, "m-light")

out.append(link(14, duct + pipe))
out.append(link(15, panel))
out.append(link(16, conduit))

front = box(0, 5 - T, WZ, 6, T, WH, "m-wall m-front") + box(6 - T, 0, WZ, T, 5, WH, "m-wall m-front")
glass = win(6.0, 1.0, 2.2, WZ + 0.8, WZ + 2.0) + win(6.0, 3.0, 4.2, WZ + 0.8, WZ + 2.0)
out.append(link(12, back + front + glass))
# repaint glass above the wall for visibility
out.append('<g pointer-events="none">' + glass + '</g>')

# labels for systems
p14 = P(0.6, 0.6, WZ + 2.2)
want_label(14, P(0.6, 0.9, WZ + 2.0), 'left')
p15 = P(0.3, 4.1, WZ + 1.2)
want_label(15, p15, 'left')
want_label(16, P(1.0, 1.5, WZ + 2.35), 'left')
p16 = P(5.0, 1.55, WZ + 2.3)
# 12 label on the right
p12 = P(6.0, 3.6, WZ + 1.4)
want_label(12, p12, 'right')

# ----- 11 insulation panel exploded outward from the right wall -----
ins_pts = [P(7.6, 0, WZ), P(7.6, 5, WZ), P(7.6, 5, WZ + WH), P(7.6, 0, WZ + WH)]
ins = poly(ins_pts, "m-ins")
ins += ''.join('<line class="hatch" x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f"/>' % (*P(7.6, y, WZ + 0.1), *P(7.6, y + 0.6, WZ + WH - 0.1)) for y in [0.4 + i * 0.75 for i in range(6)])
out.append(link(11, ins))
ip = P(7.6, 4.5, WZ + 2.2)
want_label(11, ip, 'right')

# ----- 13 roof -----
RZ = 10.5
z1 = RZ + 1.9
slope_front = [P(-0.5, 5.5, RZ), P(6.5, 5.5, RZ), P(6.5, 2.5, z1), P(-0.5, 2.5, z1)]
gable = [P(6.5, -0.5, RZ), P(6.5, 5.5, RZ), P(6.5, 2.5, z1)]
roof = poly(gable, "m-roof f-right") + poly(slope_front, "m-roof f-top")
out.append(link(13, roof))
rp = P(6.5, 1.0, RZ + 0.9)
want_label(13, rp, 'right')

# ----- callout labels in two columns, relaxed so they never overlap -----
LEFT_X, RIGHT_X, GAP = 262, 738, 27
for side in ("left", "right"):
    items = sorted(LABELS[side], key=lambda it: it[1][1])
    ys = [it[1][1] for it in items]
    for i in range(1, len(ys)):
        ys[i] = max(ys[i], ys[i - 1] + GAP)
    for (n, anchor), ly in zip(items, ys):
        colx = LEFT_X if side == "left" else RIGHT_X
        edge = colx + (8 if side == "left" else -8)
        out.append('<polyline class="lead" points="%.1f,%.1f %.1f,%.1f %.1f,%.1f"/>' % (anchor[0], anchor[1], edge + (30 if side == "left" else -30), ly, edge, ly))
        lbl = ('<text class="lbl" x="%d" y="%.1f" text-anchor="%s"><tspan class="num">%d</tspan> %s</text>'
               % (colx, ly + 5, "end" if side == "left" else "start", n, SHORT[n]))
        out.append(link(n, lbl))

# ----- chapters 1-5 above and 17-21 below, as rows of tabs -----
def wrap(text, width=21):
    words, lines, cur = text.split(), [], ""
    for w in words:
        if len(cur) + len(w) + (1 if cur else 0) > width:
            lines.append(cur); cur = w
        else:
            cur = (cur + " " + w).strip()
    lines.append(cur)
    return lines


def tab_row(nums, y, title):
    g = ['<text class="col-title" x="12" y="%d">%s</text>' % (y - 12, title)]
    for k, n in enumerate(nums):
        x = 12 + k * 198
        lines = wrap(CH[n])
        txt = "".join('<tspan x="%d" dy="%s">%s</tspan>' % (x + 44, "0" if i == 0 else "16", l) for i, l in enumerate(lines))
        ty = y + (24 if len(lines) == 1 else 19)
        inner = ('<rect class="tab" x="%d" y="%d" width="186" height="50" rx="9"/>'
                 '<text class="tab-num" x="%d" y="%d">%d</text>'
                 '<text class="tab-txt" x="%d" y="%d">%s</text>') % (x, y, x + 22, y + 32, n, x + 44, ty, txt)
        g.append(link(n, inner))
    return "\n".join(g)


out.append(tab_row([1, 2, 3, 4, 5], 44, "Science and materials: the ideas under every building"))
out.append(tab_row([17, 18, 19, 20, 21], 636, "Rules, performance, and a building's life"))
out.append('</svg>')
svg = "\n".join(out)

CSS = """<style>
.building-toc { margin: 1rem 0 1.5rem; }
.building-toc .toc-svg { width: 100%; height: auto; display: block; font-family: var(--md-text-font-family, Arial, sans-serif); }
.building-toc .toc-svg a { cursor: pointer; text-decoration: none; }
.building-toc .part polygon, .building-toc .part rect { stroke: var(--md-default-fg-color--light, #555); stroke-width: 1; transition: filter .15s, stroke-width .15s; }
.building-toc .part:hover polygon, .building-toc .part:focus polygon, .building-toc .part:hover rect, .building-toc .part:focus rect { stroke: var(--md-accent-fg-color, #e65100); stroke-width: 2.5; filter: brightness(1.12) saturate(1.2); }
.building-toc .part:focus { outline: none; }
.building-toc .part:focus-visible polygon, .building-toc .part:focus-visible rect { stroke-width: 3.5; }
.building-toc .m-earth { fill: #d9c9ac; } .building-toc .m-earth.f-top { fill: #e6d8bd; } .building-toc .m-earth.f-right { fill: #c3b08d; }
.building-toc .m-conc { fill: #c9c9c9; } .building-toc .m-conc.f-top { fill: #dedede; } .building-toc .m-conc.f-right { fill: #aaaaaa; }
.building-toc .m-brick { fill: #d9917a; } .building-toc .m-brick.f-top { fill: #e8aa94; } .building-toc .m-brick.f-right { fill: #bd7660; }
.building-toc .m-steel { fill: #9fb4c4; } .building-toc .m-steel.f-top { fill: #b9ccda; } .building-toc .m-steel.f-right { fill: #8399aa; }
.building-toc .m-wood { fill: #e0be85; } .building-toc .m-wood.f-top { fill: #efd3a3; } .building-toc .m-wood.f-right { fill: #c7a266; }
.building-toc .m-wall { fill: #f1ece4; fill-opacity: .95; } .building-toc .m-wall.f-right { fill: #d8d1c6; } .building-toc .m-front { fill-opacity: .55; pointer-events: none; }
.building-toc .m-glass { fill: #9ad0ea; fill-opacity: .8; stroke: #4a90b0; }
.building-toc .m-hvac { fill: #aab7c4; } .building-toc .m-hvac.f-top { fill: #c5d0da; } .building-toc .m-hvac.f-right { fill: #8e9cab; }
.building-toc .m-plumb { fill: #6aa6d6; } .building-toc .m-plumb.f-top { fill: #8cbfe6; } .building-toc .m-plumb.f-right { fill: #4f8cbc; }
.building-toc .m-elec { fill: #f2c14e; } .building-toc .m-elec.f-top { fill: #f8d680; } .building-toc .m-elec.f-right { fill: #d4a437; }
.building-toc .m-light { fill: #fff3a8; } .building-toc .m-light.f-top { fill: #fffbd0; } .building-toc .m-light.f-right { fill: #e6d97f; }
.building-toc .m-ins { fill: #f7c6d6; fill-opacity: .85; stroke-dasharray: 5 3; }
.building-toc .m-roof { fill: #b86b5a; } .building-toc .m-roof.f-top { fill: #cc8070; } .building-toc .m-roof.f-right { fill: #9c5446; }
.building-toc .hatch { stroke: #c0577c; stroke-width: 1; pointer-events: none; }
.building-toc .guide { stroke: var(--md-default-fg-color--lighter, #999); stroke-width: 1; stroke-dasharray: 4 5; }
.building-toc .lead { fill: none; stroke: var(--md-default-fg-color--light, #666); stroke-width: 1; }
.building-toc .arrow { stroke: #c62828; stroke-width: 4; stroke-linecap: round; }
.building-toc .arrowhead { fill: #c62828; stroke: none !important; }
.building-toc .lbl { font-size: 16px; fill: var(--md-default-fg-color, #222); pointer-events: auto; }
.building-toc .num { font-weight: 700; fill: var(--md-accent-fg-color, #e65100); }
.building-toc .col-title { font-size: 16px; font-weight: 700; fill: var(--md-default-fg-color, #222); }
.building-toc .tab { fill: var(--md-code-bg-color, #f5f5f5); }
.building-toc .tab-num { font-size: 18px; font-weight: 700; fill: var(--md-accent-fg-color, #e65100); text-anchor: middle; pointer-events: none; }
.building-toc .tab-txt { font-size: 14px; fill: var(--md-default-fg-color, #222); pointer-events: none; }
.building-toc .bracket { fill: none; stroke: var(--md-default-fg-color--lighter, #aaa); stroke-width: 2; stroke-dasharray: 2 6; stroke-linecap: round; }
.building-toc .hint { font-size: .8rem; color: var(--md-default-fg-color--light, #666); margin-top: .25rem; }
</style>"""

html = ('<div class="building-toc">\n' + CSS + '\n' + svg +
        '\n<p class="hint">Click any part of the exploded building, or a tab above or below it, to open that chapter. '
        'The full list is below.</p>\n</div>')
# ----- write the block into docs/chapters/index.md between markers (first run wraps the existing block) -----
import pathlib, sys
START, END = "<!-- toc-svg:start (generated by scripts/chapter_toc_svg.py; do not edit by hand) -->", "<!-- toc-svg:end -->"
target = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else pathlib.Path(__file__).resolve().parent.parent / "docs" / "chapters" / "index.md")
text = target.read_text(encoding="utf-8")
wrapped = START + "\n" + html + "\n" + END
if START in text:
    a, b = text.index(START), text.index(END) + len(END)
else:
    a = text.index('<div class="building-toc">')
    b = text.index("</div>", text.index('class="hint"')) + len("</div>")
target.write_text(text[:a] + wrapped + text[b:], encoding="utf-8")
print("wrote", target, "(", len(html), "bytes )")
