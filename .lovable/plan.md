

## Change Favicon to BDBT Logo

The browser tab currently shows the default Lovable favicon. You want it to show your BDBT logo instead.

### Changes

**1. Replace `public/favicon.ico`**
- Copy the BDBT logo (the black "BD BT" text logo from your second screenshot) to use as the favicon
- You already have `public/lovable-uploads/bdbt-logo-transparent.png` which appears to be your logo — we'll reference that as the favicon

**2. Update `index.html`**
- Add a `<link rel="icon">` tag pointing to your BDBT logo image (e.g., `/lovable-uploads/bdbt-logo-transparent.png`)
- This overrides the default `favicon.ico`

