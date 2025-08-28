import { useState, useEffect } from "react";

export function useElementAspect(ref) {
  const [size, setSize] = useState({ width: 0, height: 0, aspectRatio: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const updateSize = () => {
      const { width, height } = ref.current.getBoundingClientRect();
      setSize({
        width,
        height,
        aspectRatio: height > 0 ? width / height : 0,
      });
    };

    updateSize(); // initial

    const observer = new ResizeObserver(() => updateSize());
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return size;
}
