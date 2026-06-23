"""Template tags for embedding the Twip component library in Django templates.

Usage::

    {% load twip %}
    <!doctype html>
    <html>
      <head>
        {# Loads styles.css and registers every component. #}
        {% twip_assets %}
      </head>
      <body>
        <twip-button>Hello</twip-button>
      </body>
    </html>

For tree-shaking, supply a comma-separated list of component names::

    {% twip_assets only="button,modal,input" %}

The tag emits ``<link rel="stylesheet">`` for the bundled Tailwind CSS plus
``<script type="module">`` tags for each requested component's registration
module.
"""

from __future__ import annotations

from django import template
from django.templatetags.static import static
from django.utils.safestring import mark_safe

register = template.Library()


_COMPONENTS = {
    "alert",
    "avatar",
    "badge",
    "button",
    "card",
    "dropdown",
    "input",
    "modal",
    "switch",
    "tabs",
    "tooltip",
}


@register.simple_tag
def twip_assets(only: str | None = None) -> str:
    """Render <link> and <script> tags for the requested components.

    :param only: Comma-separated list of component names. If omitted, the
        full ``define/all`` bundle is loaded.
    """
    css_href = static("twip/styles.css")
    parts: list[str] = [
        f'<link rel="stylesheet" href="{css_href}">',
    ]
    if only:
        names = [name.strip() for name in only.split(",") if name.strip()]
        unknown = sorted(set(names) - _COMPONENTS)
        if unknown:
            raise ValueError(
                f"Unknown twip components: {', '.join(unknown)}. "
                f"Available: {', '.join(sorted(_COMPONENTS))}."
            )
        for name in names:
            url = static(f"twip/define/{name}.js")
            parts.append(f'<script type="module" src="{url}"></script>')
    else:
        url = static("twip/define/all.js")
        parts.append(f'<script type="module" src="{url}"></script>')
    return mark_safe("\n".join(parts))
