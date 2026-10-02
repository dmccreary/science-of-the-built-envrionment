"""MkDocs hook that injects and overrides Open Graph and Twitter Card metadata.

Provides Cairo-free social media previews by injecting og:title,
og:description, og:image, og:type, og:url, and twitter:* tags using each
page's frontmatter (falling back to site-wide configuration).
"""

import html as html_lib
import re


def _set_meta_tag(html: str, prop: str, content: str, is_property: bool = True) -> str:
    """Insert or replace a meta tag in the HTML head."""
    if not content:
        return html
    attr_name = "property" if is_property else "name"
    escaped_content = html_lib.escape(content, quote=True)
    new_tag = f'<meta {attr_name}="{prop}" content="{escaped_content}">'
    pattern = re.compile(
        rf'<meta\s+(?:property|name)="{re.escape(prop)}"\s+content="[^"]*"[^>]*>'
    )
    if pattern.search(html):
        return pattern.sub(new_tag, html, count=1)
    return html.replace("</head>", f"  {new_tag}\n</head>", 1)


def on_post_page(html, page, config, **kwargs):
    site_url = (config.get("site_url") or "").rstrip("/") + "/"
    meta = page.meta or {}

    # Title
    title = meta.get("title") or page.title or config.get("site_name") or ""
    # Ensure title is at least 40 chars for optimal social unfurls if index page
    if (page.url == "" or page.url == "index.html") and len(title) < 40 and config.get("site_name"):
        title = f"{title} | Intelligent Textbook"

    html = _set_meta_tag(html, "og:title", title, is_property=True)
    html = _set_meta_tag(html, "twitter:title", title, is_property=False)

    # Description
    description = meta.get("description") or config.get("site_description") or ""
    html = _set_meta_tag(html, "og:description", description, is_property=True)
    html = _set_meta_tag(html, "twitter:description", description, is_property=False)

    # Type & URL
    html = _set_meta_tag(html, "og:type", "website", is_property=True)
    page_url = site_url + (page.url or "").lstrip("/")
    html = _set_meta_tag(html, "og:url", page_url, is_property=True)
    html = _set_meta_tag(html, "twitter:card", "summary_large_image", is_property=False)

    # Image
    image = meta.get("image")
    if not image and (page.url == "" or page.url == "index.html"):
        image = "img/cover.png"

    if image:
        if image.startswith(("http://", "https://")):
            image_url = image
        else:
            image_url = site_url + image.lstrip("/")

        html = _set_meta_tag(html, "og:image", image_url, is_property=True)
        html = _set_meta_tag(html, "twitter:image", image_url, is_property=False)

    return html
