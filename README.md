## TOC

- [What is Peeker?](#what-is-peeker)
- [Quick Start](#quick-start)
- [Custom Theme](#custom-theme)
- [Screenshots](#screenshots)
- [TODO](#todo)

## What is Peeker?

**Peeker** is a **web component** that provides a preview window of your content.

**Peeker** is very useful in some static content site, for example your blog, because it just makes the preview part instead of entire site dynamic (_web component is an "island" automatically_), which is good for SEO.

Using **Peeker** as a web component, you:

- can add a previewer to your site out of the box

- don't pollute the thing not related to preview

- don't have to think about the framework stuff

All you have to do is:

1. prepare previewing data

2. import this script, and add the web component in your site

## Quick Start

First, add this importing code to the head section of html:

```html
<script type="module">
  import {
    defineAllComponents,
    useDefaultTheme,
  } from 'https://cdn.jsdelivr.net/npm/@rileycki3333/peeker@1.2.1/dist/index.min.js';

  defineAllComponents();
  useDefaultTheme(); // remove this when you want to use a custom theme
</script>
```

Then, prepare a preview data json, with the schema:

> **Caution**: "rawData" will be **unsafely** rendered to HTML, you should check them before using. _It is suggested to use a generator rather than writing the json file manually._

```json
{
  "title": "a test",
  "linkTo": "/test.json",
  "rawData": "<article><p>this is just a test</p></article>"
}
```

Finally, add

```html
<vvv-peeker></vvv-peeker>
```

to the body of html, and put

```html
<vvv-peekable data-url="$$PATH_OF_THE_JSON$$">Click me</vvv-peekable>
```

to the anywhere you want in the body, it will be rendered to `<a>` tag.

## Custom Theme

> If you want to use a custom theme, please don't call the function `useDefaultTheme` in the export.

Just add such a css snippet to body within a `<style>`:

```css
vvv-peeker {
  --peeker-background-color: #f6fbff;
  --peeker-border-color: #dcebf7;
  --peeker-close-button-background-color: #ddefff;
  --peeker-close-button-border-color: #dcebf7;
  --peeker-text-color: #2f2f2f;
}
```

## Screenshots

Before click the link:

![](./screenshots/0.png)

After click the link, the preview window pop up:

![](./screenshots/1.png)

## TODO

- ~~make the preview window next to the link~~

- ~~add animation~~

- ~~improve looking~~

- ~~add cache (by HTTP cache)~~

- ~~support external styling (theme?)~~
