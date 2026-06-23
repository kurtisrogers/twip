# django-twip

Django integration for the [Twip](../../README.md) Tailwind web component library.

## Install

```bash
pip install django-twip
```

Add `twip` to your `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    # ...
    "twip",
]
```

## Use in a template

```django
{% load twip %}
<!doctype html>
<html>
  <head>
    {% twip_assets %}
  </head>
  <body>
    <twip-button>Hello</twip-button>
  </body>
</html>
```

To load only specific components (smaller payload):

```django
{% twip_assets only="button,modal,input" %}
```

## Updating the bundled JS

The JS/CSS shipped inside `twip/static/twip/` is built from the Node
package in this repo. Run from the repo root:

```bash
bun run build
bun run scripts/sync-django.ts
```

The sync script copies the contents of `dist/` into
`packages/django-twip/twip/static/twip/`.
