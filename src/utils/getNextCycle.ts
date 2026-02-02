export function getNextCicle(currentCicle: number) {
    return currentCicle === 0 || currentCicle === 8 ? 1 : currentCicle + 1;
}