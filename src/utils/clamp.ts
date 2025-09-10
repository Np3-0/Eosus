interface clampProps {
    val: number,
    min: number,
    max?: number
}

export default function clamp(p0: number, p1: number, { val, min, max = 999999 }: clampProps) {
    return Math.min(Math.max(val, min), max);
};
