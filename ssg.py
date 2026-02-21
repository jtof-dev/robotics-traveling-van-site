import re
import sys
from pathlib import Path


def main():
    base_dir = Path("site")
    master_file = base_dir / "index.html"

    header_marker = "<!-- {{end of header}} -->"
    footer_marker = "<!-- {{start of footer}} -->"

    if not master_file.exists():
        print("Error: Master file not found.")
        sys.exit(1)

    master_html = master_file.read_text(encoding="utf-8")
    h_idx = master_html.find(header_marker)
    f_idx = master_html.find(footer_marker)

    if h_idx == -1 or f_idx == -1:
        print(f"Error: Markers missing in {master_file.name}.")
        sys.exit(1)

    master_header = master_html[: h_idx + len(header_marker)]
    master_footer = master_html[f_idx:]

    title_re = re.compile(r"<title[^>]*>(.*?)</title>", re.IGNORECASE | re.DOTALL)
    link_re = re.compile(r'(src|href)="(\./|(?!(http|https|/)))([^"]*)"', re.IGNORECASE)

    master_match = title_re.search(master_header)
    master_title = (
        master_match.group(1).strip() if master_match else "Robotics Traveling Van"
    )

    for page_path in base_dir.rglob("*.html"):
        if page_path.resolve() == master_file.resolve():
            continue

        page_html = page_path.read_text(encoding="utf-8")
        p_h_idx = page_html.find(header_marker)
        p_f_idx = page_html.find(footer_marker)

        if p_h_idx == -1 or p_f_idx == -1:
            print(f"warning: markers missing in {page_path}, skipping...")
            continue

        title_match = title_re.search(page_html)
        page_title = title_match.group(1).strip() if title_match else master_title
        page_content = page_html[p_h_idx + len(header_marker) : p_f_idx]

        depth = len(page_path.relative_to(base_dir).parts) - 1
        prefix = "../" * depth

        current_header = title_re.sub(f"<title>{page_title}</title>", master_header)
        current_footer = master_footer

        if depth > 0:

            def fix_path(match):
                attr = match.group(1)  # src or href
                orig_path = match.group(4)  # the actual path content
                clean_path = orig_path.removeprefix("./")
                return f'{attr}="{prefix}{clean_path}"'

            current_header = link_re.sub(fix_path, current_header)
            current_footer = link_re.sub(fix_path, current_footer)

        page_path.write_text(
            f"{current_header}{page_content}{current_footer}", encoding="utf-8"
        )
        print(f"updated: {page_path} (title: {page_title})")


if __name__ == "__main__":
    main()
