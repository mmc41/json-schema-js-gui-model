import { GuiElement } from './gui-model';

/**
 * Calculate the max nesting level of a GuiElement.
 */
export function maxGuiElementDepth(element: GuiElement): number {
    if (element.kind === 'group') {
      let depths: number[] = element.elements.map(e => maxGuiElementDepth(e));
      return 1 + (depths.length === 0 ? 0 : Math.max.apply(null, depths));
    } else {
      return 1;
    }
}

