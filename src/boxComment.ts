export default function boxComment(lines: string[], maxWidth: number = 80, boxChar: string = '*', padding: string = ' ') {
    const width = Math.min(maxWidth ?? 80 - ((boxChar.length + padding.length) * 2), Math.max(...lines.map(l => l.length)));
    const totalWidth = width + (padding.length + boxChar.length) * 2;

    const out: string[] = [];
    for (const line of lines) {
        let linePart = line;
        while (linePart.length > width) {
            let wrapPoint = width;
            while (wrapPoint > 0 && ![' ', '\t', '\u200B', '\u00AD'].includes(linePart[wrapPoint - 1])) {
                wrapPoint--;
            }
            if (wrapPoint>0) {
                out.push(`${linePart.substring(0, wrapPoint).padEnd(width - 1, ' ')} `);
                linePart = linePart.substring(wrapPoint);
            } else if (linePart[width - 1] !== ' ' && linePart[width - 2] === ' ') {
                out.push(`${linePart.substring(0, width - 1)} `);
                linePart = linePart.substring(width - 1);
            }
            else if (linePart[width - 1] !== ' ') {
                out.push(`${linePart.substring(0, width - 1)}‐`);
                linePart = linePart.substring(width - 1);
            } else {
                out.push(linePart.substring(0, width));
                linePart = linePart.substring(width);
            }
        }
        out.push(linePart.padEnd(width, ' '));
    }
    return `
/*${boxChar.repeat(Math.ceil(width / boxChar.length) + (padding.length * 2)).substring(0, totalWidth - 2)}
${out.map(line => `${boxChar}${padding}${line}${padding}${boxChar}`).join('\n')}
${boxChar.repeat(Math.ceil(width / boxChar.length) + padding.length * 2).substring(0, totalWidth - 2)}*/
`.trim();

}
