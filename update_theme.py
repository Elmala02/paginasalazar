import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

new_root = """:root {
    /* Tema Claro (Por Defecto) */
    --bg-main: #FFFFFF;
    --bg-secondary: #F5F6F8;
    --text-primary: #2C2C2C;
    --text-secondary: #6B7280;
    --color-primary: #0B3A6E;
    --color-secondary: #1F5FA8;
    --accent-gold: #C9A227;
    --accent-gold-hover: #B8921F;
    --border-color: #E5E7EB;
    
    /* Para Navbars / Hero gradients */
    --bg-navbar: rgba(255, 255, 255, 0.85);
    --hero-overlay-1: rgba(255, 255, 255, 0.5);
    --hero-overlay-2: rgba(255, 255, 255, 0.8);
    --hero-overlay-3: rgba(255, 255, 255, 1);
    
    --btn-text: #FFFFFF;
    --quote-overlay: rgba(255, 255, 255, 0.9);
    
    --font-heading: 'Syne', sans-serif;
    --font-body: 'Inter', sans-serif;
    --transition: all 0.3s ease;
}

[data-theme="dark"] {
    /* Tema Oscuro */
    --bg-main: #0A192F;
    --bg-secondary: #112240;
    --text-primary: #E6EDF3;
    --text-secondary: #9CA3AF;
    --color-primary: #1F5FA8;
    --color-secondary: #0B3A6E;
    --accent-gold: #C9A227;
    --accent-gold-hover: #B8921F;
    --border-color: #233554;
    
    --bg-navbar: rgba(10, 25, 47, 0.85);
    --hero-overlay-1: rgba(10, 25, 47, 0.5);
    --hero-overlay-2: rgba(10, 25, 47, 0.8);
    --hero-overlay-3: rgba(10, 25, 47, 1);
    
    --btn-text: #0A192F;
    --quote-overlay: rgba(10, 25, 47, 0.9);
}"""

css = re.sub(r':root\s*\{[^}]+\}', new_root, css)

# Replace variables
css = css.replace('var(--bg-dark)', 'var(--bg-main)')
css = css.replace('var(--bg-card)', 'var(--bg-secondary)')

# Specific color replacements
css = css.replace('background-color: rgba(9, 9, 11, 0.85);', 'background-color: var(--bg-navbar);')
css = css.replace('rgba(9, 9, 11, 0.5)', 'var(--hero-overlay-1)')
css = css.replace('rgba(9, 9, 11, 0.8)', 'var(--hero-overlay-2)')
css = css.replace('rgba(9, 9, 11, 1)', 'var(--hero-overlay-3)')
css = css.replace('rgba(9, 9, 11, 0.9)', 'var(--quote-overlay)')

# Color to var replacements
css = css.replace('color: #fff;', 'color: var(--text-primary);')
css = css.replace('color: #ffffff;', 'color: var(--text-primary);')
css = css.replace('color: white;', 'color: var(--text-primary);')
css = css.replace('color: #000;', 'color: var(--btn-text);')
css = css.replace('color: #ddd;', 'color: var(--text-secondary);')

# Background replacements
css = css.replace('background-color: #121214;', 'background-color: var(--bg-secondary);')
css = css.replace('background-color: #000;', 'background-color: var(--bg-secondary);')
css = css.replace('background-color: #09090b;', 'background-color: var(--bg-main);')

# Border replacements
css = css.replace('border: 1px solid rgba(255, 255, 255, 0.05);', 'border: 1px solid var(--border-color);')
css = css.replace('border-bottom: 1px solid rgba(255, 255, 255, 0.05);', 'border-bottom: 1px solid var(--border-color);')
css = css.replace('border-top: 1px solid rgba(255, 255, 255, 0.05);', 'border-top: 1px solid var(--border-color);')
css = css.replace('border: 1px solid rgba(255, 255, 255, 0.1);', 'border: 1px solid var(--border-color);')
css = css.replace('border: 1px solid rgba(255, 255, 255, 0.2);', 'border: 1px solid var(--border-color);')
css = css.replace('border: 1px solid rgba(255, 255, 255, 0.3);', 'border: 1px solid var(--border-color);')
css = css.replace('border-color: rgba(255, 255, 255, 0.5);', 'border-color: var(--border-color);')

# Transparent button background on hover
css = css.replace('background-color: rgba(255, 255, 255, 0.1);', 'background-color: var(--bg-secondary);')

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS updated with design tokens")
