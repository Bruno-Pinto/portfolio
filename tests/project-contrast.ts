import type { Page } from "@playwright/test";

// Resolve browser-computed colors (including modern color syntax), alpha,
// gradient stops and the deck's brightness filter. Test the worst background.
export async function auditProjectContrast(page: Page, rootSelector = "#work") {
  return page.locator(rootSelector).evaluate((root) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d", { willReadFrequently: true })!;
    type Color = [number, number, number, number];
    function color(value: string): Color {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = value;
      context.fillRect(0, 0, 1, 1);
      const data = context.getImageData(0, 0, 1, 1).data;
      return [data[0], data[1], data[2], data[3] / 255];
    }
    function blend(foreground: Color, background: Color): Color {
      const alpha = foreground[3];
      return [
        foreground[0] * alpha + background[0] * (1 - alpha),
        foreground[1] * alpha + background[1] * (1 - alpha),
        foreground[2] * alpha + background[2] * (1 - alpha),
        1,
      ];
    }
    function stops(image: string) {
      return (
        image.match(/rgba?\([^)]*\)|color\([^)]*\)|#[a-f0-9]{3,8}\b/gi) ?? []
      ).map(color);
    }
    function luminance(rgb: Color, brightness: number) {
      const linear = rgb.slice(0, 3).map((value) => {
        const channel = Math.min(255, value * brightness) / 255;
        return channel <= 0.04045
          ? channel / 12.92
          : ((channel + 0.055) / 1.055) ** 2.4;
      });
      return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
    }
    function ratio(a: Color, b: Color, brightness: number) {
      const first = luminance(a, brightness),
        second = luminance(b, brightness);
      return (
        (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)
      );
    }
    const results: {
      text: string;
      selector: string;
      ratio: number;
      required: number;
      fontSize: number;
    }[] = [];
    for (const node of root.querySelectorAll<HTMLElement>("*")) {
      if (
        !node.matches(":focus-visible") &&
        !Array.from(node.childNodes).some(
          (child) =>
            child.nodeType === Node.TEXT_NODE && child.textContent?.trim(),
        )
      )
        continue;
      if (node.closest("[hidden], [disabled], [aria-hidden=true]")) continue;
      const rect = node.getBoundingClientRect(),
        style = getComputedStyle(node);
      if (
        !rect.width ||
        !rect.height ||
        style.visibility === "hidden" ||
        style.display === "none"
      )
        continue;
      let backgrounds: Color[] = [[9, 13, 16, 1]],
        brightness = 1,
        invisible = false;
      const ancestors: Element[] = [];
      for (
        let current: Element | null = node;
        current;
        current = current.parentElement
      )
        ancestors.unshift(current);
      for (const ancestor of ancestors) {
        const css = getComputedStyle(ancestor);
        if (Number(css.opacity) === 0) invisible = true;
        for (const match of css.filter.matchAll(/brightness\(([.\d]+)\)/g))
          brightness *= Number(match[1]);
        const base = color(css.backgroundColor);
        backgrounds = backgrounds.map((background) => blend(base, background));
        const gradient = stops(css.backgroundImage);
        if (gradient.length)
          backgrounds = backgrounds.flatMap((background) =>
            gradient.map((stop) => blend(stop, background)),
          );
      }
      if (invisible) continue;
      const foreground = color(style.color);
      const card = node.closest(".project-token[data-featured=true]");
      const foil = card
        ? stops(getComputedStyle(card, "::after").backgroundImage)
        : [];
      let minimum = Infinity;
      for (const background of backgrounds) {
        const text = blend(foreground, background);
        minimum = Math.min(minimum, ratio(text, background, brightness));
        for (const sheen of foil)
          minimum = Math.min(
            minimum,
            ratio(blend(sheen, text), blend(sheen, background), brightness),
          );
      }
      const fontSize = parseFloat(style.fontSize),
        weight = parseInt(style.fontWeight);
      const required =
        fontSize >= 24 || (fontSize >= 18.66 && weight >= 700) ? 3 : 4.5;
      if (node.matches(":focus-visible") && style.outlineStyle !== "none") {
        const outline = color(style.outlineColor);
        results.push({
          text: "[focus outline]",
          selector: node.className.toString(),
          ratio: Math.min(
            ...backgrounds.map((background) =>
              ratio(blend(outline, background), background, brightness),
            ),
          ),
          required: 3,
          fontSize: 0,
        });
      }
      results.push({
        text: node.textContent!.trim().slice(0, 65),
        selector: node.className.toString(),
        ratio: minimum,
        required,
        fontSize,
      });
    }
    return results;
  });
}
