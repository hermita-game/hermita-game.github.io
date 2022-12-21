import Lenis from '@studio-freight/lenis';

interface ScrollArgs {
    scroll: number;
    limit: number;
    velocity: number;
    direction: -1 | 1;
}
interface Transformer {
    attribute: string;
    transform: (args: ScrollArgs, attr: number) => string;
}

const transforms: {[key: string]: Transformer} = {
    skew: {
        attribute: 'skew',
        transform: ({ velocity }, attr) => `skew(${velocity * attr}deg)`
    },
    rotate: {
        attribute: 'rotate',
        transform: ({ scroll }, attr) => `rotate(${scroll * attr}deg)`
    },
}

export const scroll = {
    init() {
        const container = document.getElementById('scroll-container') as HTMLElement;
        const direction = container.classList.contains("horizontal") ? "horizontal" : "vertical";
        console.log(container, container.firstElementChild, direction);
        const lenis = new Lenis({
            wrapper: container,
            content: container.firstElementChild as HTMLElement,
            smooth: true,
            gestureDirection: 'both',
            direction,
        });

        for (const key in transforms) {
            const elements = document.querySelectorAll(`[data-scroll-${key}]`);
            if (elements.length > 0) {
                for (let i = 0; i < elements.length; i++) {
                    const el = elements[i] as HTMLElement;
                    const attr = parseFloat(el.getAttribute(`data-scroll-${key}`) as string);
                    if (attr) {
                        lenis.on('scroll', (e: ScrollArgs) => {
                            el.style.transform = transforms[key].transform(e, attr);
                        });
                    }
                }
            }
        }

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        
        requestAnimationFrame(raf);

        window.addEventListener('mount', this.init);
    }
}