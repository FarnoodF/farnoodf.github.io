# Farnood Faraji — Personal portfolio

Static portfolio site deployed to [farnoodf.github.io](https://farnoodf.github.io) and [farnood.tech](https://farnood.tech) on every push to `main`.

## Deployment

Pushes to `main` run [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which publishes `index.html` and `assets/` to GitHub Pages. The site is served at:

- https://farnood.tech (custom domain)
- https://farnoodf.github.io (redirects to `farnood.tech`)

Custom domain is configured in the repo's GitHub Pages settings. Porkbun DNS records:

| Type  | Host | Answer |
|-------|------|--------|
| A     | `@`  | `185.199.108.153` |
| A     | `@`  | `185.199.109.153` |
| A     | `@`  | `185.199.110.153` |
| A     | `@`  | `185.199.111.153` |
| CNAME | `www` | `farnoodf.github.io` |

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
