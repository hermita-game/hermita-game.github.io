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
    scaleX: {
        attribute: 'scale-x',
        transform: ({ scroll, limit }, _) => `scaleX(${scroll / limit})`
    },
}

interface Call {
    setup: () => void;
    call: (args: ScrollArgs) => void;
    store?: any;
}
const calls: {[key: string]: Call} = {
    timeline: {
        store: {},
        setup: () => {
            const wrap = document.querySelector('[data-scroll-ctx-wrap]') as HTMLElement;
            if (!wrap) return;
            const display = document.querySelector('[data-scroll-ctx-display]') as HTMLElement;
            const children = wrap.children;

            children[0].classList.add('active');
            display.innerText = children[0].getAttribute('data-scroll-ctx-text') as string;

            calls.timeline.store = { display, children, currentIdx: 0 };
        },
        call: ({ scroll, limit }) => {
            const { display, children, currentIdx } = calls.timeline.store;
            const percentage = scroll / limit;
            const index = Math.max(Math.min(Math.floor(percentage * (children.length - 1) + 0.3), children.length - 1), 0);
            if (index === currentIdx) return;

            children[currentIdx].classList.remove('active');
            children[index].classList.add('active');
            calls.timeline.store.currentIdx = index;
            const text = children[index].getAttribute('data-scroll-ctx-text') as string;
            display.innerText = text;
        }
    }
}

export const scroll = {
    init() {
        const container = document.getElementById('scroll-container') as HTMLElement;
        const direction = container.classList.contains("horizontal") ? "horizontal" : "vertical";
        const lenis = new Lenis({
            wrapper: container,
            content: container.firstElementChild as HTMLElement,
            smooth: true,
            gestureDirection: 'both',
            direction
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

        for (const key in calls) {
            const call = calls[key];
            call.setup();
            lenis.on('scroll', (e: ScrollArgs) => {
                call.call(e);
            });
        }

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        
        requestAnimationFrame(raf);

        window.addEventListener('mount', this.init);
    }
}