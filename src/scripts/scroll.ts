import Lenis from '@studio-freight/lenis';

let lenis: Lenis;
export const scroll = {
    init() {
        const container = document.getElementById('scroll-container') as HTMLElement;
        const direction = container.classList.contains("horizontal") ? "horizontal" : "vertical";
        lenis = new Lenis({
            wrapper: container,
            content: container.firstElementChild as HTMLElement,
            smooth: true,
            gestureDirection: 'both',
            direction,
        });

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        
        requestAnimationFrame(raf);
    },
    on(callback: Function) {
        lenis.on('scroll', callback);
    },
}