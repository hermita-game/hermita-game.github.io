import Lenis from "@studio-freight/lenis";

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

const AddEffect = (str: string) => {
  if (!str) return;
  const splitted = str.split(" -> ");
  var el = document.querySelector(splitted[0]);
  if (!el) return;
  el.classList.add(splitted[1]);
};

const RemoveEffect = (str: string) => {
  if (!str) return;
  const splitted = str.split(" -> ");
  var el = document.querySelector(splitted[0]);
  if (!el) return;
  el.classList.remove(splitted[1]);
};

const transforms: { [key: string]: Transformer } = {
  skew: {
    attribute: "skew",
    transform: ({ velocity }, attr) => `skew(${velocity * attr}deg)`,
  },
  rotate: {
    attribute: "rotate",
    transform: ({ scroll }, attr) => `rotate(${scroll * attr}deg)`,
  },
  scaleX: {
    attribute: "scale-x",
    transform: ({ scroll, limit }, _) => `scaleX(${scroll / limit})`,
  },
};

interface Call {
  setup: () => void;
  call: (args: ScrollArgs) => void;
  store?: any;
}
const calls: { [key: string]: Call } = {
  timeline: {
    store: {},
    setup: () => {
      const wrap = document.querySelector(
        "[data-scroll-ctx-wrap]"
      ) as HTMLElement;
      if (!wrap) return;
      const display = document.querySelector(
        "[data-scroll-ctx-display]"
      ) as HTMLElement;
      const imageDisplay = document.querySelector(
        "[data-scroll-ctx-image-display]"
      ) as HTMLElement;
      const children = wrap.children;

      children[0].classList.add("active");
      display.innerText = children[0].getAttribute(
        "data-scroll-ctx-text"
      ) as string;

      const image = children[0].getAttribute("data-scroll-ctx-image") as string;
      imageDisplay.style.backgroundImage = image
      ? `url(${image})`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3C/svg%3E")`;

      calls.timeline.store = { display, imageDisplay, children, currentIdx: 0 };
    },
    call: ({ scroll, limit }) => {
      const { display, imageDisplay, children, currentIdx } =
        calls.timeline.store;
      if (!display || !imageDisplay || !children) return;
      const percentage = scroll / limit;
      const index = Math.max(
        Math.min(
          Math.floor(percentage * (children.length - 1) + 0.3),
          children.length - 1
        ),
        0
      );
      if (index === currentIdx) return;

      children[currentIdx].classList.remove("active");
      children[index].classList.add("active");
      calls.timeline.store.currentIdx = index;
      const text = children[index].getAttribute(
        "data-scroll-ctx-text"
      ) as string;
      display.innerText = text;
      const image = children[index].getAttribute(
        "data-scroll-ctx-image"
      ) as string;
      imageDisplay.style.backgroundImage = image
        ? `url(${image})`
        : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3C/svg%3E")`;
    },
  },
  parallax: {
    store: {},
    setup: () => {
      const elements = document.querySelectorAll("[data-scroll-parallax]");
      const toMove: { el: HTMLElement; speed: number, distance: number }[] = [];
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i] as HTMLElement;
        const attr = parseFloat(el.getAttribute("data-scroll-parallax") as string);
        const rect = el.getBoundingClientRect();
        if (attr) {
          toMove.push({
            el,
            speed: attr,
            distance: rect.y
          });
        }
      }
      const height = window.innerHeight/2;
      calls.parallax.store = { toMove, height };
    },
    call: ({ scroll }) => {
      const { toMove, height } = calls.parallax.store;
      if (!toMove) return;
      for (let i = 0; i < toMove.length; i++) {
        const { el, speed, distance } = toMove[i];
        el.style.transform = `translateY(${-(scroll - distance + height) * speed }px)`;
      }
    },
  },
  sections: {
    store: {
      sections: [],
      current: -1,
      previous: 0,
      offset: 0,
    },
    setup: () => {
      const elements = document.querySelectorAll("[data-scroll-section]");
      const sections: { start: number; effects: string[] }[] = [];
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i] as HTMLElement;
        const effects = (el.getAttribute("data-scroll-section") as string).split(";");
        const start = el.offsetTop;
        sections.push({ start, effects });
      }
      calls.sections.store.sections = sections;
      calls.sections.store.offset = window.innerHeight / 2;
    },
    call: ({ scroll }) => {
      const store = calls.sections.store;
      if (!store.sections) return;
      for (let i = 0; i < store.sections.length; i++) {
        const { start } = store.sections[i];
        if (scroll >= start - store.offset) {
          store.current = i;
        }
      }
      if (store.current !== store.previous) {
        store.sections[store.previous].effects.forEach(RemoveEffect);
        store.sections[store.current].effects.forEach(AddEffect);
        store.previous = store.current;
      }
    },
  },
};

let lenis: Lenis;
export const scroll = {
  init(callStr: string) {
    const container = document.getElementById(
      "scroll-container"
    ) as HTMLElement;
    const direction = container.classList.contains("horizontal")
      ? "horizontal"
      : "vertical";
    lenis = new Lenis({
      wrapper: container,
      content: container.firstElementChild as HTMLElement,
      smooth: true,
      gestureDirection: "both",
      direction,
    });

    for (const key in transforms) {
      const elements = document.querySelectorAll(`[data-scroll-${key}]`);
      if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++) {
          const el = elements[i] as HTMLElement;
          const attr = parseFloat(
            el.getAttribute(`data-scroll-${key}`) as string
          );
          if (attr) {
            lenis.on("scroll", (e: ScrollArgs) => {
              el.style.transform = transforms[key].transform(e, attr);
            });
          }
        }
      }
    }

    if (callStr)
      callStr.split(", ").forEach((key) => {
        const call = calls[key];
        if (!call) return;
        call.setup();
        lenis.on("scroll", (e: ScrollArgs) => {
          call.call(e);
        });
        call.call({ scroll: 0, limit: lenis.limit, velocity: 0, direction: 1 });
      });


    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  },
};
