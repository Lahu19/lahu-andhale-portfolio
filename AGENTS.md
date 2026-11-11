<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep shared portfolio UI colors mapped to semantic CSS tokens and use the Button component for controls, so navigation and actions remain consistent.
- Keep portfolio content frontend-only and clearly distinguish illustrative interfaces from professional engineering evidence, so demonstrations do not imply production claims.
- Define unique metadata in each content route; add absolute canonical URLs and a sitemap only once the real published domain is known, to avoid indexing preview URLs as the portfolio.
- Keep the work gallery in an index route rather than a parent content route, so case studies render independently instead of retaining the gallery.
