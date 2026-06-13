# Farnood Faraji — Personal portfolio

Static portfolio site deployed to [farnoodf.github.io](https://farnoodf.github.io) and [farnood.tech](https://farnood.tech) on every push to `main`.

## Deployment

Pushes to `main` update both sites:

1. **GitHub Pages** — [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) publishes `index.html` and `assets/` to https://farnoodf.github.io
2. **Vercel** — connect this repo in the Vercel dashboard so production deploys to https://farnood.tech on every `main` push

### One-time Vercel setup

1. Go to [vercel.com/new](https://vercel.com/new) and import `FarnoodF/farnoodf.github.io`.
2. Leave the framework preset as **Other** (static site, no build command).
3. Set the production branch to `main` and deploy.
4. In the project → **Settings → Domains**, add `farnood.tech` and `www.farnood.tech`.
5. Vercel will show the DNS records to add at Porkbun (below).

After this, every push to `main` triggers both GitHub Pages and Vercel automatically — no GitHub secrets required.

### Porkbun DNS (farnood.tech)

In Porkbun → **farnood.tech → DNS**, add:

| Type  | Host | Answer              |
|-------|------|---------------------|
| A     | @    | `76.76.21.21`       |
| CNAME | www  | `cname.vercel-dns.com` |

Vercel will verify the domain once DNS propagates (usually a few minutes).

---

# vCard - Personal portfolio (template)

![GitHub repo size](https://img.shields.io/github/repo-size/codewithsadee/vcard-personal-portfolio)
![GitHub stars](https://img.shields.io/github/stars/codewithsadee/vcard-personal-portfolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/codewithsadee/vcard-personal-portfolio?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/codewithsadee?style=social)](https://twitter.com/intent/follow?screen_name=codewithsadee)
[![YouTube Video Views](https://img.shields.io/youtube/views/SoxmIlgf2zM?style=social)](https://youtu.be/SoxmIlgf2zM)

vCard is a fully responsive personal portfolio website, responsive for all devices, built using HTML, CSS, and JavaScript.

## Demo

![vCard Desktop Demo](./website-demo-image/desktop.png "Desktop Demo")
![vCard Mobile Demo](./website-demo-image/mobile.png "Mobile Demo")

## Prerequisites

Before you begin, ensure you have met the following requirements:

* [Git](https://git-scm.com/downloads "Download Git") must be installed on your operating system.

## Installing vCard

To install **vCard**, follow these steps:

Linux and macOS:

```bash
sudo git clone https://github.com/codewithsadee/vcard-personal-portfolio.git
```

Windows:

```bash
git clone https://github.com/codewithsadee/vcard-personal-portfolio.git
```

## Contact

If you want to contact me you can reach me at [Twitter](https://www.twitter.com/codewithsadee).

## License

This project is **free to use** and does not contains any license.
